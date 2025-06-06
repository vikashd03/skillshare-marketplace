"use client";

import { API_URL } from "@/utils/config";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "../context";

enum AUTH_FIELD {
  EMAIL = "email",
  PASSWORD = "password",
}

const initialFields = {
  [AUTH_FIELD.EMAIL]: "",
  [AUTH_FIELD.PASSWORD]: "",
};

const LoginPage = () => {
  const [userDetails, setUserDetails] = useState<{
    [key in AUTH_FIELD]: string;
  }>(initialFields);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { handleSession } = useAppContext();

  const handleFieldChange = (field: AUTH_FIELD, value: string) => {
    setUserDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogin = () => {
    setLoading(true);
    axios
      .post(`${API_URL}/user/login`, userDetails)
      .then(() => {
        handleSession(btoa(`${userDetails.email}:${userDetails.password}`));
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex items-center justify-center">
      <div className="mt-[150px] w-[470px] h-[500px] border-zinc-400 border-2 rounded-3xl flex flex-col items-center overflow-clip">
        <div className="mt-[50px] text-4xl">Login</div>
        <form className="flex flex-col items-center gap-[25px] mt-[30px]">
          <div className="flex flex-col">
            <label className="text-lg font-medium ml-1">Email</label>
            <input
              value={userDetails[AUTH_FIELD.EMAIL]}
              className="w-[300px] h-[40px] border-black border px-[8px] py-[15px] rounded-md"
              placeholder="Enter Email..."
              type="text"
              onChange={(e) =>
                handleFieldChange(AUTH_FIELD.EMAIL, e.target.value)
              }
              disabled={loading}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-medium ml-1">Password</label>
            <input
              value={userDetails[AUTH_FIELD.PASSWORD]}
              className="w-[300px] h-[40px] border-black border px-[8px] py-[15px] rounded-md"
              placeholder="Enter Password..."
              type="password"
              onChange={(e) =>
                handleFieldChange(AUTH_FIELD.PASSWORD, e.target.value)
              }
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className={`mt-[30px] w-[200px] h-[35px] bg-blue-500 border-black border rounded-lg cursor-pointer text-white text-[16px] hover:bg-blue-400 hover:text-black ${
              loading && "!bg-zinc-300"
            }`}
            onClick={handleLogin}
            disabled={loading}
          >
            Login
          </button>
          <div>
            New User?{" "}
            <button
              type="button"
              className="underline cursor-pointer text-blue-600"
              onClick={() => router.push("/register")}
              disabled={loading}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
