"use client";

import { useState, useEffect, useRef } from "react";
import "./menu.css"; // Keep this if you're using global CSS

type ProfileProps = {
  setOpenProfile: (open: boolean) => void;
};

export default function Profile({ setOpenProfile }: ProfileProps) {
  const [picUrl, setPicUrl] = useState("");
  const itemsHolderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const profilePic = localStorage.getItem("picURL"); // ✅ Fixed typo: getItem
    if (profilePic) setPicUrl(profilePic);
  }, []);

  const closeProfile = (e: PointerEvent) => {
    if (itemsHolderRef.current && !itemsHolderRef.current.contains(e.target as Node)) {
      setOpenProfile(false);
      console.log("profile closed x");
    }
  };

  useEffect(() => {
    document.addEventListener("pointerdown", closeProfile);
    return () => document.removeEventListener("pointerdown", closeProfile);
  }, [setOpenProfile]);

  return (
    <div className="profileContainer">
      <div ref={itemsHolderRef} className="profileItemsContainer">
        <div className="itemsHolder">
          <div className="profilePic">
            <img src={picUrl} className="profileImg" alt="Profile" />
          </div>
          <div className="profileItem">Markets</div>
          <div className="profileItem">About us</div>
          <div className="profileItem">Banking</div>
        </div>
      </div>
    </div>
  );
}
