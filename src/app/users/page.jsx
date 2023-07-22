"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardComponents/DashboardLayout";
import Users from "@/components/DashboardComponents/Users";
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
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";

const TABS = [
  {
    label: "All",
    value: "all",
    card: <Users />,
  },
  {
    label: "Users",
    value: "users",
    card: <Users />,

  },
  {
    label: "Members",
    value: "members",
    card: "Members content goes here",
  },
];

export default function UserTable() {
  const [selectedTab, setSelectedTab] = useState("all");

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
              {card}
            </div>
          ))}
        </CardHeader>
      </Card>
    </DashboardLayout>
  );
}
