"use client";

import { API_URL } from "@/utils/config";
import { ROLE, USER_TYPE } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useAppContext } from "../context";

enum AUTH_FIELD {
  // Common
  EMAIL = "email",
  PASSWORD = "password",
  NAME = "name",
  PHONE = "ph_no",
  ADDRESS = "address",

  // Company-specific
  COMPANY_NAME = "company_name",
  TAX_NUMBER = "tax_no",
  REP_NAME = "rep_name",

  // Role/Type
  ROLE = "role", // user or provider
  USER_TYPE = "user_type", // 'individual' or 'company'
}

const providerFieldsConfig: Record<
  USER_TYPE,
  Partial<Record<AUTH_FIELD, string>>
> = {
  [USER_TYPE.INDIVIDUAL]: {
    [AUTH_FIELD.NAME]: "",
    [AUTH_FIELD.EMAIL]: "",
    [AUTH_FIELD.PASSWORD]: "",
    [AUTH_FIELD.PHONE]: "",
    [AUTH_FIELD.ADDRESS]: "",
  },
  [USER_TYPE.COMPANY]: {
    [AUTH_FIELD.COMPANY_NAME]: "",
    [AUTH_FIELD.EMAIL]: "",
    [AUTH_FIELD.PASSWORD]: "",
    [AUTH_FIELD.PHONE]: "",
    [AUTH_FIELD.ADDRESS]: "",
    [AUTH_FIELD.TAX_NUMBER]: "",
    [AUTH_FIELD.REP_NAME]: "",
  },
};

const userFieldsConfig: Partial<Record<AUTH_FIELD, string>> = {
  [AUTH_FIELD.NAME]: "",
  [AUTH_FIELD.EMAIL]: "",
  [AUTH_FIELD.PASSWORD]: "",
  [AUTH_FIELD.PHONE]: "",
  [AUTH_FIELD.ADDRESS]: "",
};

const fieldLabelMap: Partial<Record<AUTH_FIELD, string>> = {
  [AUTH_FIELD.EMAIL]: "Email Address",
  [AUTH_FIELD.PASSWORD]: "Password",
  [AUTH_FIELD.NAME]: "Full Name",
  [AUTH_FIELD.PHONE]: "Phone Number",
  [AUTH_FIELD.ADDRESS]: "Address",
  [AUTH_FIELD.COMPANY_NAME]: "Company Name",
  [AUTH_FIELD.TAX_NUMBER]: "Business Tax Number",
  [AUTH_FIELD.REP_NAME]: "Representative Name",
};

const page = () => {
  const [role, setAuthType] = useState<ROLE>(ROLE.USER);
  const [userType, setProviderType] = useState<USER_TYPE>(USER_TYPE.INDIVIDUAL);
  const [userDetails, setUserDetails] =
    useState<Partial<Record<AUTH_FIELD, string>>>(userFieldsConfig);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { handleSession } = useAppContext();

  const handleAuthTypeChange = (value: ROLE) => {
    setAuthType(value);
    if (value === ROLE.USER) {
      setProviderType(USER_TYPE.INDIVIDUAL);
      setUserDetails(userFieldsConfig);
    } else if (value === ROLE.PROVIDER) {
      setUserDetails(providerFieldsConfig[userType]);
    }
  };

  const handleProviderTypeChange = (value: USER_TYPE) => {
    setProviderType(value);
    setUserDetails(providerFieldsConfig[value]);
  };

  const handleFieldChange = (field: AUTH_FIELD, value: string) => {
    setUserDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleLRegister = () => {
    setLoading(true);
    axios
      .post(`${API_URL}/user/register`, {
        ...userDetails,
        [AUTH_FIELD.ROLE]: role,
        [AUTH_FIELD.USER_TYPE]: userType,
      })
      .then(() => {
        handleSession(btoa(`${userDetails.email}:${userDetails.password}`));
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex items-center justify-center">
      <div className="mt-[60px] w-[70%] py-[40px] border-zinc-400 border-2 rounded-3xl flex flex-col items-center overflow-clip">
        <div className="text-4xl">Register</div>
        <div className="w-[80%] flex flex-row items-center h-[100px] justify-around mt-[40px]">
          <div
            className={`h-[90%] w-[40%] border-gray-500 border-[1px] rounded-lg flex items-center justify-center cursor-pointer ${
              role === ROLE.USER ? "!border-blue-500 !border-2 bg-blue-100" : ""
            }`}
            onClick={() => handleAuthTypeChange(ROLE.USER)}
          >
            🧑 I'm looking for a service
          </div>
          <div
            className={`h-[90%] w-[40%] border-gray-500 border-[1px] rounded-lg flex items-center justify-center cursor-pointer ${
              role === ROLE.PROVIDER
                ? "!border-blue-500 !border-2 bg-blue-100"
                : ""
            }`}
            onClick={() => handleAuthTypeChange(ROLE.PROVIDER)}
          >
            🧑‍🔧 I'm offering a skill
          </div>
        </div>
        {role === ROLE.PROVIDER && (
          <div className="w-full h-[30px] flex flex-row items-center justify-around px-[20%] mt-[15px]">
            <div className="flex flex-row gap-2 items-center">
              <input
                id="user-login"
                type="radio"
                checked={userType == USER_TYPE.INDIVIDUAL}
                onChange={() => handleProviderTypeChange(USER_TYPE.INDIVIDUAL)}
                disabled={loading}
              />
              <label
                htmlFor="user-login"
                className={`text-lg cursor-pointer ${
                  userType == USER_TYPE.INDIVIDUAL
                    ? "underline underline-offset-4"
                    : ""
                }`}
              >
                Individual
              </label>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <input
                id="provider-login"
                type="radio"
                checked={userType == USER_TYPE.COMPANY}
                onChange={() => handleProviderTypeChange(USER_TYPE.COMPANY)}
                disabled={loading}
              />
              <label
                htmlFor="provider-login"
                className={`text-lg cursor-pointer ${
                  userType == USER_TYPE.COMPANY
                    ? "underline underline-offset-4"
                    : ""
                }`}
              >
                Company
              </label>
            </div>
          </div>
        )}
        <div className="flex flex-row flex-wrap w-[80%] items-center justify-center gap-[25px] mt-[20px]">
          {Object.keys(userDetails).map((field) => (
            <div className="flex flex-col" key={field}>
              <label className="text-lg font-medium ml-1">
                {fieldLabelMap[field as AUTH_FIELD]}
              </label>
              <input
                value={userDetails[field as AUTH_FIELD]}
                className="w-[300px] h-[40px] border-black border px-[8px] py-[15px] rounded-md"
                placeholder={`Enter ${fieldLabelMap[field as AUTH_FIELD]}...`}
                type={field === AUTH_FIELD.PASSWORD ? "password" : "text"}
                onChange={(e) =>
                  handleFieldChange(field as AUTH_FIELD, e.target.value)
                }
                disabled={loading}
              />
            </div>
          ))}
        </div>
        <button
          className={`mt-[30px] w-[200px] h-[35px] bg-blue-500 border-black border rounded-lg cursor-pointer text-white text-[16px] hover:bg-blue-400 hover:text-black ${
            loading && "!bg-zinc-300"
          }`}
          onClick={handleLRegister}
          disabled={loading}
        >
          Register
        </button>
        <div className="mt-[10px]">
          Existing User?{" "}
          <button
            className="underline cursor-pointer text-blue-600"
            onClick={() => router.push("/login")}
            disabled={loading}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
