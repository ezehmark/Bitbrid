"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation"; // Next.js router
import "./menu.css"; // Keep as-is if this is a global CSS

type MenuProps = {
  day: boolean;
  toggleDay: () => void;
  setOpenMenu: (open: boolean) => void;
};

export default function Menu({ day, toggleDay, setOpenMenu }: MenuProps) {
  const router = useRouter();
  const itemsHolderRef = useRef<HTMLDivElement>(null);

  const closeMenu = (e: PointerEvent) => {
    if (itemsHolderRef.current && !itemsHolderRef.current.contains(e.target as Node)) {
      setOpenMenu(false);
      console.log("menu closed x");
    }
  };

  useEffect(() => {
    document.addEventListener("pointerdown", closeMenu);
    return () => document.removeEventListener("pointerdown", closeMenu);
  }, [setOpenMenu]);

  const menuItems = [
    { name: "Markets" },
    { name: "Trading" },
    { name: "Fintech" },
    { name: "Settings", url: "Settings" },
    { name: "About us", url: "cschats" },
  ];

  return (
    <div className="menuContainer">
      <div
        ref={itemsHolderRef}
        className="menuItemsContainer"
        style={{ backgroundColor: !day ? "#213547" : "#f3f0e9" }}
      >
        <div className="itemsHolder" style={{ color: day ? "#213547" : "#ccc" }}>
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="menuItem"
              style={{ marginTop: index === 3 ? 100 : undefined }}
              onClick={() => {
                setOpenMenu(false);
                if (item.url) router.push(`/${item.url}`);
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
