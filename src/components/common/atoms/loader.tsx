import React from "react";

export const Loader = () => {
  return (
    <div className=" flex items-center justify-center fixed inset-0 bg-background z-[10000000000000]">
      <div className="relative size-20">
        <span className="absolute end-0 top-0 size-20 p-1 bg-gray-400 rounded-full animate-ping"></span>
        <span className="absolute end-0 top-0 size-20 p-1 bg-gray-400 rounded-full"></span>
      </div>
    </div>
  );
};
