import React, { useContext } from "react";
import { UserContext } from "../../utils/Context/UserContext";
import swal from "sweetalert2";
import { toast } from "react-toastify";
import {
  Navbar,
  MobileNav,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Bars2Icon } from "@heroicons/react/24/outline";
import Auth from "../Auth/Auth";
import Link from "next/link";
import ProfileMenuItem from "./ProfileMenuItem";
import NavList from "./NavList";
import Cart from "../Cart/Cart";
import SearchBar from "./SearchBar";
import MessagePrompt from "./MessagePrompt";

export default function ComplexNavbar() {
  const { user, loading } = useContext(UserContext);
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <>
      <Navbar className=" top-0 fixed z-50 mx-auto max-w-screen-3xl lg:rounded-full lg:pl-6 py-2 px-4 lg:px-8 lg:py-4">
        <div className="relative mx-auto flex items-center text-blue-gray-900">
          <Link href="/">
            <div className=" mr-4 ml-2 ">
              <Typography className="cursor-pointer  text-base  font-semibold md:text-xl uppercase text-gray-700  tracking-wider">
                Simplexity
              </Typography>
              <Typography className="cursor-pointer text-[10px] md:text-xs uppercase text-amber-700 ">
              Simplify, Shop, Smile
              </Typography>
            </div>
          </Link>
          {!user || user.role !== "admin" ? (
            <div className="absolute top-2/4 left-1/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
              <NavList />
            </div>
          ) : (
            <Typography variant="h4" color="blue-gray"></Typography>
          )}

          <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 md:block">
            <SearchBar />
          </div>
          <div className="absolute top-20 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 md:block">
            <MessagePrompt />
          </div>
          {user && user.role === "user" && (
            <div className="absolute top-2/4 right-24 lg:right-40 -translate-x-2/4 -translate-y-2/4">
              <Cart />
            </div>
          )}
          <IconButton
            size="sm"
            color="blue-gray"
            variant="text"
            onClick={toggleIsNavOpen}
            className="ml-auto mr-2 lg:hidden"
          >
            <Bars2Icon className="h-6 w-6" />
          </IconButton>
          {user ? <ProfileMenuItem /> : <Auth />}
        </div>
        <MobileNav open={isNavOpen} className="overflow-scroll">
          <NavList />
        </MobileNav>
      </Navbar>
    </>
  );
}
