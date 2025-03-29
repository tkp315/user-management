import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

import Login from "../login/Login";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

function Home() {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  return (
    <Navbar>
      <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 flex justify-center items-center min-h-screen mx-2 ">
        <div className="flex flex-col gap-2 ">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome to User Management App
          </h1>
          {!isLoggedIn ? (
            <Login />
          ) : (
            <Link to="/user-list">
              <Button variant="outline" className="cursor-pointer">
                Go To Dashboard
              </Button>
            </Link>
          )}
        </div>
      </div>
    </Navbar>
  );
}

export default Home;
