"use client";
import DashboardLayout from "@/components/DashboardComponents/DashboardLayout";
import { TransactionsTable } from "@/components/DashboardComponents/RecentTransaction";
import ProtectedRoute from "@/utils/Context/ProtectedRoute";
import React from "react";

const dashboard = () => {
  return (
    <DashboardLayout>
      <TransactionsTable />
    </DashboardLayout>
  );
};

export default ProtectedRoute(dashboard);
