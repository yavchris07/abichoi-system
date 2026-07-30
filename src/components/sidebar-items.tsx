"use client";
import { useEffect, useState } from "react";
import {
  ArrowLeftRight,
  BadgeDollarSign,
  BanknoteArrowDown,
  ChartNoAxesCombined,
  EyeDashed,
  LayoutDashboard,
  MonitorCloud,
  ReceiptText,
  SettingsIcon,
  ShieldPlus,
  User as UserIcon,
  UserKey,
} from "lucide-react";
import { Link, useLocation } from "react-router";
import { ADMIN, COO, DG, FINANCE, type User } from "../utils/types";
import { getCurrentUser } from "../utils/get-current-user";

const SidebarItems = () => {
  const location = useLocation();

  // Combine user data and mounting state into one cohesive state object
  const [hydrationProfile, setHydrationProfile] = useState<{
    isMounted: boolean;
    user: User | null;
  }>({
    isMounted: false,
    user: null,
  });

  useEffect(() => {
    const newProfile = {
      isMounted: true,
      user: getCurrentUser(),
    };

    // Defer update to avoid synchronous setState inside the effect.
    Promise.resolve().then(() => {
      setHydrationProfile((prev) => {
        if (
          prev?.isMounted === newProfile.isMounted &&
          prev?.user === newProfile.user
        ) {
          return prev;
        }
        return newProfile;
      });
    });
  }, []);

  //   New visitor
  {
    /* <ScanSearch /> */
  }

  const itemsAdmin = [
    {
      path: "/dashboard",
      name: "Tableau de bord",
      icon: <LayoutDashboard size={17} />,
    },
    { path: "/users", name: "Utilisateurs", icon: <UserIcon size={17} /> },
    { path: "/roles", name: "Roles", icon: <UserKey size={17} /> },
    { path: "/sessions", name: "Sessions", icon: <ShieldPlus size={17} /> },
    { path: "/logs", name: "Monitoring", icon: <MonitorCloud size={17} /> },
    { path: "/settings", name: "Parametres", icon: <SettingsIcon size={17} /> },
  ];

  const itemsdG = [
    {
      path: "/dashboard",
      name: "Tableau de bord",
      icon: <LayoutDashboard size={17} />,
    },
    { path: "/visitors", name: "Visites", icon: <EyeDashed size={17} /> },
    {
      path: "/settings",
      name: "Parametre",
      icon: <SettingsIcon size={17} />,
    },
  ];

  const itemsFinance = [
    {
      path: "/dashboard",
      name: "Tableau de bord",
      icon: <LayoutDashboard size={17} />,
    },
    { path: "/sales", name: "Ventes", icon: <BadgeDollarSign size={17} /> },
    {
      path: "/expenses",
      name: "Depense",
      icon: <ChartNoAxesCombined size={17} />,
    },
    {
      path: "/cash-movements",
      name: "Journal de caisse",
      icon: <ArrowLeftRight size={17} />,
    },
    {
      path: "/deposits",
      name: "Approvisionnement",
      icon: <BanknoteArrowDown size={17} />,
    },
    { path: "/reports", name: "Rapports", icon: <ReceiptText size={17} /> },
  ];

  {
    /* <BanknoteArrowDown />
<ArrowLeftRight />
<ChartNoAxesCombined /> */
  }
  const itemsCoo = [
    {
      path: "/dashboard",
      name: "Tableau de bord",
      icon: <LayoutDashboard size={17} />,
    },
    { path: "/visitors", name: "Visites", icon: <EyeDashed size={17} /> },
    {
      path: "/settings",
      name: "Parametre",
      icon: <SettingsIcon size={17} />,
    },
  ];

  const itemsAssistance = [
    {
      path: "/dashboard",
      name: "Tableau de bord",
      icon: <LayoutDashboard size={17} />,
    },
    { path: "/visitors", name: "Visites", icon: <EyeDashed size={17} /> },
    {
      path: "/settings",
      name: "Parametre",
      icon: <SettingsIcon size={17} />,
    },
  ];

  // Destructure for seamless integration with your existing layout logic
  const { isMounted, user } = hydrationProfile;

  // Render a clean placeholder matching the height on the server string
  if (!isMounted) {
    return <div className="animate-pulse bg-transparent h-20 w-full" />;
  }

  const items =
    user?.role === ADMIN
      ? itemsAdmin
      : user?.role === FINANCE
        ? itemsFinance
        : user?.role === COO
          ? itemsCoo
          : user?.role === DG
            ? itemsdG
            : itemsAssistance;

  return (
    <div className="space-y-1">
      {items.map((item) => {
        const isActive = location.pathname === item.path;

        return (
          <Link
            to={item.path}
            key={item.path}
            className={`flex items-center gap-2 p-2 rounded transition ${
              isActive
                ? "bg-amber-500 text-gray-900 font-medium"
                : "text-black hover:bg-gray-100"
            }`}
          >
            <div className="shrink-0">{item.icon}</div>
            <span>{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default SidebarItems;
