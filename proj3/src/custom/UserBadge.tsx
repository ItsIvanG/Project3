import React from "react";
import { UserCircle } from "lucide-react"; // Placeholder icon

const UserBadge = ({ name = "Guest", pic = "Pic" }) => {
  return (
    <div className="flex items-center space-x-5 rounded-lg  w-fit">
      <UserCircle className="w-10 h-10 " /> {/* Icon */}
      <span className="font-medium px-2 ">{name}</span> {/* Name */}
    </div>
  );
};

export default UserBadge;
