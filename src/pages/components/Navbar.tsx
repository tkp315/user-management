import { Link, useLocation } from "react-router-dom";
import Login from "../login/Login";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const tabs = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Users",
    url: "/user-list",
  },
];

import { ReactNode } from "react";

const Navbar = ({ children }: { children: ReactNode }) => {
  const path = useLocation();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  return (
    <div>
      <div className="flex flex-row items-center justify-between px-2 py-2 bg-gradient-to-r from-white via-gray-100 to-gray-200 shadow-lg ">
        <div className="text-2xl font-semibold tracking-wide ml-4">LOGO</div>

        <div className="flex flex-row gap-10 justify-center">
          {tabs.map((tab, idx) => (
            <Link to={tab.url}>
              <div
                key={idx}
                className={`font-semibold text-lg hover:text-blue-600 transition-all ${
                  path.pathname === tab.url ? `underline text-blue-700` : ``
                }`}
              >
                {tab.title}{" "}
              </div>
            </Link>
          ))}
        </div>

        {!isLoggedIn ? (
          <Login />
        ) : (
          <div className="flex w-10 h-10 border rounded-full"></div>
        )}
      </div>
      {children}
    </div>
  );
};

export default Navbar;
