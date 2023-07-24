"use client";
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardComponents/DashboardLayout";
import Users from "@/components/DashboardComponents/Users";
import UserService from "../../utils/Services/UserService";
import swal from "sweetalert2";
import { toast } from "react-toastify";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
} from "@material-tailwind/react";

const TABS = [
  {
    label: "All",
    value: "all",
    card: "....",
  },
  {
    label: "Users",
    value: "users",
    card: "....",
  },
  {
    label: "Members",
    value: "members",
    card: <Users />,
  },
];

export default function UserTable() {
  const [selectedTab, setSelectedTab] = useState("all");
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // New state variable for search

  const pageSize = 4;

  const getUsers = () => {
    const limit = pageSize;
    const offset = (currentPage - 1) * pageSize;
    UserService.getAllUsers(limit, offset)
      .then((res) => {
        const allUsers = res.data.data;
        const filteredUsers = allUsers.filter((user) =>
          user.firstName.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setUsers(filteredUsers);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUsers();
  }, [currentPage, searchQuery]); // Update the dependency array

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(users.length / pageSize)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(users.length / pageSize);

  // Get the users for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentUsers = users.slice(startIndex, endIndex);

  const deleteUser = (id, getUsers) => {
    const token = localStorage.getItem("token");
    console.log(id);
    swal
      .fire({
        text: "Are you sure you want to Delete?",
        showCancelButton: true,
        cancelButtonColor: "#7e22ce",
        confirmButtonColor: "#ef4444",
        confirmButtonText: "Delete",
        position: "top",
      })
      .then((result) => {
        if (result.isConfirmed) {
          UserService.deleteUserById(id, token)
            .then(() => {
              toast.success("User Deleted Successfully", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              getUsers();
            })
            .catch((err) => {
              console.error(err);
            });
        }
      });
  };
  return (
    <DashboardLayout>
      <Card className="h-full w-full  mb-20">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Users
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all members
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button variant="outlined" color="blue-gray" size="sm">
                view all
              </Button>
              <Button
                className="flex items-center gap-3"
                color="amber"
                size="sm"
              >
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Tabs value={selectedTab} className="w-full md:w-max">
              <TabsHeader>
                {TABS.map(({ label, value }) => (
                  <Tab
                    key={value}
                    value={value}
                    onClick={() => setSelectedTab(value)}
                  >
                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>
            <div className="w-full md:w-72">
              <Input
                onChange={(e) => setSearchQuery(e.target.value)} // Handle search input change
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>
          {TABS.map(({ value, card }) => (
            <div
              key={value}
              value={value}
              className={`text-xs sm:text-sm md:text-base ${
                selectedTab === value ? "block" : "hidden"
              }`}
            >
              {value === "members" && <Users userData={currentUsers} />}
              {/* {card} */}
            </div>
          ))}
        </CardHeader>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page {currentPage} of {totalPages}
          </Typography>
          <div className="flex gap-2">
            <Button
              variant="outlined"
              color="blue-gray"
              size="sm"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              color="blue-gray"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </DashboardLayout>
  );
}
