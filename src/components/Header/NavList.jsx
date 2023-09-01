import { ShoppingBagIcon, HomeIcon } from "@heroicons/react/24/outline";
import React from "react";
import NavListMenu from "./NavListMenu";
import { MenuItem, Typography } from "@/components/MaterialComponents/Material-Tailwind";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navListItems = [
  {
    label: "Home",
    icon: HomeIcon,
    link: "/",
  },
  {
    label: "Shop",
    icon: ShoppingBagIcon,
    link: "/shop",
  },
];

const NavList = () => {
  const pathname = usePathname();

  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {navListItems.map(({ label, icon: Icon, link }, key) => (
        <Link key={label} href={link}>
          <Typography
            as="a"
            variant="small"
            color="blue-gray"
            className="font-normal "
          >
            <MenuItem
              className={`flex items-center gap-2 lg:rounded-full ${
                pathname === link ? "bg-[#eceff1] text-orange-500" : ""
              }`}
            >
              {React.createElement(Icon, { className: "h-[18px] w-[18px]" })}
              {label}
            </MenuItem>
          </Typography>
        </Link>
      ))}
      <NavListMenu />
    </ul>
  );
};

export default NavList;
