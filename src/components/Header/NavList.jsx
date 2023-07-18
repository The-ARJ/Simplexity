import {
  ShoppingBagIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
// nav list component
const navListItems = [
  {
    label: "Home",
    icon: HomeIcon,
  },
  {
    label: "Shop",
    icon: ShoppingBagIcon,
  },
];
import React from "react";
import NavListMenu from "./NavListMenu";
import { MenuItem, Typography } from "@material-tailwind/react";

const NavList = () => {
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {navListItems.map(({ label, icon, link }, key) => (
        <Typography
          key={label}
          as="a"
          href={link}
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          <MenuItem className="flex items-center gap-2 lg:rounded-full">
            {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
            {label}
          </MenuItem>
        </Typography>
      ))}
      <NavListMenu />
    </ul>
  );
};

export default NavList;
