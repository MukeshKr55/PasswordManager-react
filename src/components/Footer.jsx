import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-col justify-center items-center  bg-purple-400 lg:px-10 px-4 md:h-16 h-14 bg-opacity-40">
      <div className="logo font-bold text-2xl flex justify-center items-center">
        <span className="text-orange-700">Pass</span>
        <lord-icon
          src="https://cdn.lordicon.com/stxfyhky.json"
          trigger="loop"
          state="loop-cycle"
          colors="primary:#b4b4b4,secondary:#1b1091"
          style={{ width: "2.5rem", height: "2.5rem" }}
        ></lord-icon>
        <span className="text-green-700">Man</span>
      </div>
      <div>Created by Mukesh❤</div>
    </div>
  );
};

export default Footer;
