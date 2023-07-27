import React, { useContext, useState } from "react";
import { UserContext } from "../../utils/Context/UserContext";
import swal from "sweetalert2";
import { toast } from "react-toastify";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Tooltip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  Bars4Icon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Sidebar() {
  const [isMinimized, setMinimized] = useState(true);

  const handleMinimize = () => {
    setMinimized(!isMinimized);
  };
  const { user, logout, loading } = useContext(UserContext);
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
          logout();
          // Add your navigation logic here
          toast.success("Logged out successfully", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      });
  };
  return (
    <Card
      className={`overflow-hidden fixed top-20 left-0 h-[calc(100vh-2rem)] z-50 p-4 shadow-xl shadow-blue-gray-900/10 transition-all duration-300 ${
        isMinimized ? "w-20" : " max-w-[20rem]"
      }`}
    >
      <div
        className={` cursor-pointer ${
          isMinimized ? " p-4" : "flex items-end justify-between p-4"
        }`}
        onClick={handleMinimize}
      >
        {!isMinimized && (
          <Typography variant="h5" color="blue-gray" className="px-4">
            Dashboard
          </Typography>
        )}
        <Bars4Icon className="h-6" />
      </div>
      <List>
        <Link href="/dashboard">
          <ListItem className="flex items-center">
            <Tooltip content="Dashboard">
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
            </Tooltip>
            {!isMinimized && "Dashboard"}
          </ListItem>
        </Link>
        <Link href="/e-commerce">
          <ListItem className="flex items-center">
            <Tooltip content="E-Commerce">
              <ListItemPrefix>
                <ShoppingBagIcon className="h-5 w-5" />
              </ListItemPrefix>
            </Tooltip>

            {!isMinimized && "E-Commerce"}
          </ListItem>
        </Link>
        <Link href="/users">
          <ListItem className="flex items-center">
            <Tooltip content="Users">
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5" />
              </ListItemPrefix>
            </Tooltip>
            {!isMinimized && (
              <>
                Users
                <ListItemSuffix>
                  <Chip
                    value="2.1k"
                    size="sm"
                    variant="ghost"
                    color="blue-gray"
                    className="rounded-full"
                  />
                </ListItemSuffix>
              </>
            )}
          </ListItem>
        </Link>

        <Link href="/profile">
          <ListItem className="flex items-center">
            <Tooltip content="E-Commerce">
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
            </Tooltip>

            {!isMinimized && "Profile"}
          </ListItem>
        </Link>

        <ListItem className="flex items-center">
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          {!isMinimized && "Settings"}
        </ListItem>
        <ListItem
          onClick={handleLogout}
          className="flex items-center text-red-200 hover:textred"
        >
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          {!isMinimized && "Sign Out"}
        </ListItem>
      </List>
    </Card>
  );
}
