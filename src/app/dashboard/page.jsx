"use client";
import Auth from "@/components/Auth/Auth";
import DashboardLayout from "@/components/DashboardComponents/DashboardLayout";
import { TransactionsTable } from "@/components/DashboardComponents/RecentTransaction";
import Sidebar from "@/components/DashboardComponents/Sidebar";
import ComplexNavbar from "@/components/Header/Header";
import React from "react";

const dashboard = () => {
  return (
    <DashboardLayout>
      {/* <ComplexNavbar />
      <Sidebar /> */}
      <TransactionsTable />
    </DashboardLayout>
  );
};

export default dashboard;
