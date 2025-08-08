"use client";

import { useState } from "react";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import Link from "next/link";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  const routes = [
    { label: "Início", path: "/"},
    { label: "Transferências", path: "/transferencias"},
    { label: "Investimentos", path: "/investimentos"},
    { label: "Outros serviços", path: "/servicos"},
  ];

  return (
    <div>
      <button
        className="sm:hidden p-2 text-secondary"
        onClick={() => setOpen(true)}
      >
        <MenuIcon fontSize="large" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          <div className="bg-foreground w-64 shadow-lg p-6 relative text-text-dark">
            
            <button
              className="absolute top-4 right-4 text-green-600"
              onClick={() => setOpen(false)}
            >
              <CloseIcon />
            </button>

            <nav className="mt-10 flex flex-col gap-4">
              {routes.map(({ label, path, }) => (
                <Link
                  key={path}
                  href={path}
                  className="flex items-center justify-center gap-2 p-2 rounded-lg hover:bg-gray-100 border-b-text-dark/20 border-b"
                >
                  <div className="text-text-dark font-bold text-lg text-center">
                    {label}
                  </div>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}