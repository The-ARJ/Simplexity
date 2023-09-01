"use client";
import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@/components/MaterialComponents/Material-Tailwind";
import { PlusCircleIcon, QueueListIcon } from "@heroicons/react/24/solid";
import AddProductForm from "@/components/DashboardComponents/Products/AddProduct";
import DashboardLayout from "@/components/DashboardComponents/DashboardLayout";
import { ProductTable } from "@/components/DashboardComponents/Products/ProductTable";

const ProductTabs = () => {
  const data = [
    {
      label: "Add Product",
      value: "html",
      icon: PlusCircleIcon,
      desc: <AddProductForm />,
    },
    {
      label: "See Products",
      value: "react",
      icon: QueueListIcon,
      desc: <ProductTable />,
    },
  ];

  return (
    <DashboardLayout>
      <Tabs value="html" className=" sm:px-4 lg:px-6 mt-2">
        <TabsHeader className=" py-2 px-2 sm:py-2 sm:px-2 lg:py-2 lg:px-2">
          {data.map(({ label, value, icon }) => (
            <Tab
              key={value}
              value={value}
              className=" text-xs sm:text-sm md:text-base"
              activeClassName=" rounded-xl"
            >
              <div className="flex items-center gap-2 py-2">
                {React.createElement(icon, { className: "w-5 h-5" })}
                <div className="hidden lg:block">{label}</div>
              </div>
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody
          animate={{
            initial: { y: 250 },
            mount: { y: 0 },
            unmount: { y: 250 },
          }}
        >
          {data.map(({ value, desc }) => (
            <TabPanel
              key={value}
              value={value}
              className="text-xs sm:text-sm md:text-base "
            >
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </DashboardLayout>
  );
};
export default ProductTabs;
