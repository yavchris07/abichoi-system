import LogPage from "../pages/admin/log";
import RolePage from "../pages/admin/role";
import SessionPage from "../pages/admin/session";
import UserPage from "../pages/admin/user";
import DashboardPage from "../pages/dashboard";
import CashMovementPage from "../pages/finance/cash-movement";
// import CashRegisterPage from "../pages/finance/cash-register";
import DepositPage from "../pages/finance/deposit";
import ExpensePage from "../pages/finance/expense";
import ReportPage from "../pages/finance/reports";
import SalePage from "../pages/finance/sale";
import LoginPage from "../pages/login-page";
import SettingPage from "../pages/setting";
import type { Router } from "./types";

export const routers: Router[] = [
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/logs",
    element: <LogPage />,
  },
  {
    path: "/sessions",
    element: <SessionPage />,
  },
  {
    path: "/users",
    element: <UserPage />,
  },
  {
    path: "/roles",
    element: <RolePage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/sales",
    element: <SalePage />,
  },
  {
    path: "/expenses",
    element: <ExpensePage />,
  },
  {
    path: "/cash-movements",
    element: <CashMovementPage />,
  },
  {
    path: "/deposits",
    element: <DepositPage />,
  },
  {
    path: "/settings",
    element: <SettingPage />,
  },
  {
    path: "/reports",
    element: <ReportPage />
  },
];
