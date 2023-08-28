import React from "react";
import swal from "sweetalert2";
import Service, { imgURL } from "../../utils/Services/UserService";

import {
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";

import {
  UserCircleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "@/utils/Redux/UserSlice";
import showToast from "../Cart/Toast";

const profileMenuItems = [
  {
    label: "Edit Profile",
    icon: UserCircleIcon,
    link: "/profile",
  },
  {
    label: "Update Password",
    icon: Cog6ToothIcon,
    link: "/profile/update-password",
  },
  {
    label: "Inbox",
    icon: InboxArrowDownIcon,
    link: "/",
  },
  {
    label: "Help",
    icon: LifebuoyIcon,
    link: "/",
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];

const ProfileMenuItem = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const token = user.token;
  const handleLogout = () => {
    swal
      .fire({
        text: "Are you sure you want to logout?",
        showCancelButton: true,
        cancelButtonColor: "#ffca28",
        confirmButtonColor: "#ef4444",
        confirmButtonText: "Log Out",
        position: "top",
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(clearUser());
          Service.logout(token);
          showToast("Logged out successfully", "success");
        }
      });
  };
  const pathname = usePathname();

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Typography className="mr-2 hidden lg:block">
            {user.firstName}
          </Typography>
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-amber-500 p-0.5"
            src={`${imgURL}/${user.image}`}
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, link }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return isLastItem ? (
            <MenuItem
              key={label}
              onClick={handleLogout}
              className={`flex items-center gap-2 rounded ${
                pathname === link ? "bg-[#eceff1] text-orange-500" : ""
              } ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          ) : (
            <Link key={label} href={link}>
              <MenuItem
                onClick={closeMenu}
                className={`flex items-center gap-2 rounded ${
                  pathname === link ? "bg-[#eceff1] text-orange-500" : ""
                }`}
              >
                {React.createElement(icon, {
                  className: "h-4 w-4",
                  strokeWidth: 2,
                })}
                <Typography as="span" variant="small" className="font-normal">
                  {label}
                </Typography>
              </MenuItem>
            </Link>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default ProfileMenuItem;
