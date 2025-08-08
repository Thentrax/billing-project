"use client";

import { AuthContext } from "@/context/AuthContext/context";
import { AccountCircleOutlined } from "@mui/icons-material";
import { useContext } from "react";
import MobileMenu from "../MobileMenu";

export default function Header() {
  const { user } = useContext(AuthContext)

  return (
    <div className="w-full bg-primary text-white p-4 sm:px-16 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <MobileMenu />
      </div>

      <div className="flex gap-2 items-center">
        <div className="hidden sm:block text-white">
          {user?.username}
        </div>
        <div className="text-secondary">
          <AccountCircleOutlined />
        </div>
      </div>
    </div>
  );
}