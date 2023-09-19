import React from "react";
import {
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@/components/MaterialComponents/Material-Tailwind";

import {
  Square3Stack3DIcon,
  TagIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

// Categories for outdoor wear
const outdoorWearCategories = [
  {
    title: "Jackets",
    description: "Explore our collection of outdoor jackets for all seasons.",
  },
  {
    title: "Hiking Gear",
    description: "Find the best gear for your hiking adventures.",
  },
  {
    title: "Camping Essentials",
    description: "Everything you need for a great camping experience.",
  },
  {
    title: "Footwear",
    description: "Browse through our wide range of outdoor footwear.",
  },
];

const NavListMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const triggers = {
    onMouseEnter: () => setIsMenuOpen(true),
    onMouseLeave: () => setIsMenuOpen(false),
  };

  const renderItems = outdoorWearCategories.map(({ title, description }) => (
    <a href="#" key={title}>
      <MenuItem>
        <Typography variant="h6" color="blue-gray" className="mb-1">
          {title}
        </Typography>
        <Typography variant="small" color="gray" className="font-normal">
          {description}
        </Typography>
      </MenuItem>
    </a>
  ));

  return (
    <React.Fragment>
      <Menu open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler>
          <Typography as="a" href="#" variant="small" className="font-normal">
            <MenuItem
              {...triggers}
              className="hidden items-center gap-2 text-blue-gray-900 lg:flex lg:rounded-full"
            >
              <TagIcon className="h-[18px] w-[18px]" /> Category{" "}
              <ChevronDownIcon
                strokeWidth={2}
                className={`h-3 w-3 transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </MenuItem>
          </Typography>
        </MenuHandler>
        <MenuList
          {...triggers}
          // className="hidden w-[36rem] grid-cols-7 gap-3 overflow-visible lg:grid"
        >
          <ul className="col-span-4 flex w-full flex-col gap-1">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <MenuItem className="flex items-center gap-2 text-blue-gray-900 lg:hidden">
        <Square3Stack3DIcon className="h-[18px] w-[18px]" /> Categories{" "}
      </MenuItem>
      <ul className="ml-6 w-full flex-col gap-1 hidden">{renderItems}</ul>
    </React.Fragment>
  );
};

export default NavListMenu;
