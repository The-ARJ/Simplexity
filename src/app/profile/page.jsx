"use client";
import React, { useState } from "react";
import {
  Input,
  Button,
  Typography,
  Breadcrumbs,
} from "@/components/MaterialComponents/Material-Tailwind";
import { LockClosedIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import UserService, { imgURL } from "../../utils/Services/UserService";
import Link from "next/link";
import ProtectedRoute from "@/utils/Context/ProtectedRoute";
import { useSelector } from "react-redux";
import showToast from "@/components/Cart/Toast";
import { useDispatch } from "react-redux";
import { updateUser } from "@/utils/Redux/UserSlice";

const UpdateProfileForm = () => {
  const { user } = useSelector((state) => state.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userImage, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const dispatch = useDispatch();
  function handleImageChange(event) {
    try {
      const selectedFile = event.target.files[0];
      setPreviewImage(URL.createObjectURL(selectedFile));
      setImage(selectedFile);
    } catch (error) {
      console.error("Error while handling image change: ", error);
    }
  }

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("phoneNumber", phoneNumber);
    if (userImage) {
      formData.append("userImage", userImage);
    }
    const token = user.token;

    UserService.updateUser(user.id, formData, token)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          dispatch(updateUser(res.data.data));
          showToast("Profile Updated Successfully", "success");
        } else {
          alert("err");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="py-8 px-4 mx-auto max-w-screen-2xl mt-20 ">
      <Breadcrumbs fullWidth>
        <Link href="/" className="opacity-60">
          Home
        </Link>
        <Link href="/profile" className="">
          Profile
        </Link>
      </Breadcrumbs>

      <form
        onSubmit={handleSave}
        className="mx-auto max-w-screen-sm   flex flex-col gap-4"
      >
        <Typography variant="h5" className="  ">
          Profile
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to update your profile.
        </Typography>
        <div>
          <Typography
            variant="small"
            color="blue-gray"
            className="my-4 font-medium"
          >
            First Name
          </Typography>
          <Input
            onChange={(e) => setFirstName(e.target.value)}
            size="lg"
            label="First Name"
          />
          <Typography
            variant="small"
            color="blue-gray"
            className="my-4 font-medium"
          >
            Last Name
          </Typography>
          <Input
            onChange={(e) => setLastName(e.target.value)}
            size="lg"
            label="Last Name"
          />
          <Typography
            variant="small"
            color="blue-gray"
            className="my-4 font-medium"
          >
            Phone Number
          </Typography>
          <Input
            onChange={(e) => setPhoneNumber(e.target.value)}
            size="lg"
            label="Phone Number"
          />
          <Typography
            variant="small"
            color="blue-gray"
            className="my-4 font-medium"
          >
            Image
          </Typography>
          <div className="mt-2 flex items-center gap-x-3">
            {previewImage ? (
              <img
                src={previewImage}
                alt="User"
                className="h-14 w-14 rounded-full"
              />
            ) : (
              <>
                {user && user.image ? (
                  <>
                    <img
                      className="h-14 w-14 rounded-full object-cover"
                      src={`${imgURL}/${user.image}`}
                      alt="User"
                    />
                  </>
                ) : (
                  <>
                    {" "}
                    <UserCircleIcon
                      className="h-12 w-12 text-gray-300 dark:text-gray-400"
                      aria-hidden="true"
                    />
                  </>
                )}
              </>
            )}

            <label
              htmlFor="fileInput"
              className="rounded-md bg-white dark:bg-gray-700 px-2.5 py-1.5 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
            >
              Upload
              <input
                id="fileInput"
                type="file"
                className="sr-only"
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>

        <Button type="submit" className="mt-6" color="amber" fullWidth>
          Update Profile
        </Button>
        <Typography
          variant="small"
          color="gray"
          className="mt-2 flex items-center justify-center gap-2 font-normal opacity-60"
        >
          <LockClosedIcon className="-mt-0.5 h-4 w-4" />
          User Information is secure and encrypted
        </Typography>
      </form>
    </div>
  );
};

export default ProtectedRoute(UpdateProfileForm);
