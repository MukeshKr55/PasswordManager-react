import React from "react";

const Navbar = () => {
  return (
    <>
      <nav className="w-full bg-purple-400  flex justify-between items-center lg:px-10 px-4 md:h-16 h-14 bg-opacity-40 ">
        <a
          href="/"
          className="logo font-bold text-2xl flex justify-center items-center"
        >
          <span className="text-orange-700">Pass</span>
          <lord-icon
            src="https://cdn.lordicon.com/stxfyhky.json"
            trigger="loop"
            state="loop-cycle"
            colors="primary:#b4b4b4,secondary:#1b1091"
            style={{ width: "2.5rem", height: "2.5rem" }}
          ></lord-icon>
          <span className="text-green-700">Man</span>
        </a>

        <ul>
          <li className="flex gap-4">
            <a
              href="https://github.com/MukeshKr55/PasswordManager-react"
              className="flex justify-center items-center gap-2 border md:px-3 md:py-1 px-2 py-0.5 bg-purple-100 hover:bg-gray-200 border-purple-400 rounded-full"
            >
              <div>
                <img
                  className="w-8"
                  src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                  alt=""
                />
              </div>
              <div>
                <img
                  className="w-16"
                  src="https://github.githubassets.com/assets/GitHub-Logo-ee398b662d42.png"
                  alt=""
                />
              </div>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
