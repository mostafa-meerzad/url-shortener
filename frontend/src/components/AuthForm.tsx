import axios from "axios";
import classNames from "classnames";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { IoIosClose } from "react-icons/io";

const baseUrl = import.meta.env.VITE_API_URL
interface AuthData {
  name?: string; // Optional for login
  email: string;
  password: string;
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, ...props }) => (
  <div className="w-full">
    <input
      className={classNames("w-full h-min bg-white rounded-md p-2", {
        "outline-red-400 border-red-400 border-2": error,
      })}
      placeholder={label}
      {...props}
    />
    {error && <p className="text-red-400 mt-1 -mb-2">{error}</p>}
  </div>
);

interface AuthFormProps {
  onModalClose: () => void;
}
const AuthForm: React.FC<AuthFormProps> = ({ onModalClose }) => {
  const { login } = useAuth();
  const [isRegister, setIsRegister] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthData>();

  const onSubmit = async (data: AuthData) => {
    try {
      const url = isRegister
        ? `${baseUrl}/auth/register`
        : `${baseUrl}/auth/login`;

      const response = await axios.post(url, data);

      if (response.status >= 200 && response.status < 300) {
        toast.success(
          isRegister ? "Logged in successfully!" : "Registered successfully!"
        );
        const { user, token } = response.data;
        login({ name: user.name, email: user.email }, token);
        reset();
        onModalClose();
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.error || "Something went wrong!");
      } else {
        toast.error("Unexpected error occurred!");
      }
    }
  };

  return (
    <div className="w-[25rem] h-[28rem] flex flex-col items-center justify-center gap-4 rounded-2xl bg-[url(/bg-shorten-desktop.svg)] bg-cover bg-[50%_100%] bg-no-repeat bg-darkViolet relative">
      <button
        onClick={onModalClose}
        className=" text-white absolute top-4 right-4 "
      >
        <IoIosClose size={"40px"} />
      </button>

      <h2 className="text-white text-2xl capitalize mb-4">
        {isRegister ? "Register" : "Login"}
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center gap-4 w-2/3"
      >
        {isRegister && (
          <Input
            type="text"
            label="Name..."
            {...register("name", {
              required: isRegister ? "Name is required!" : false,
            })}
            error={errors.name?.message}
          />
        )}

        <Input
          type="email"
          label="Email..."
          {...register("email", { required: "Email is required!" })}
          error={errors.email?.message}
        />

        <Input
          type="password"
          label="Password..."
          {...register("password", { required: "Password is required!" })}
          error={errors.password?.message}
        />

        <button
          type="submit"
          className="w-full h-min bg-cyan text-white rounded-md p-2 mt-4"
        >
          {isRegister ? "Sign Up" : "Login"}
        </button>
      </form>

      <p
        className="text-white cursor-pointer mt-4"
        onClick={() => setIsRegister((prev) => !prev)}
      >
        {isRegister
          ? "Already have an account? Login"
          : "Don't have an account? Register"}
      </p>
    </div>
  );
};

export default AuthForm;
