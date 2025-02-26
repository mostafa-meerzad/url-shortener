import React from "react";
import { useForm } from "react-hook-form";
import { Url, UrlFormData } from "../types";
import axios from "axios";
import classNames from "classnames";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

interface ShortenFormProps {
  addUrl: (newUrl: Url) => void;
}

const ShortenForm: React.FC<ShortenFormProps> = ({ addUrl }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UrlFormData>();
  const { isLoggedIn, token } = useAuth();

  const onSubmit = async (data: UrlFormData) => {
    const url = isLoggedIn
      ? "http://localhost:3000/api/urls/shorten"
      : "http://localhost:3000/api/urls/shorten/guest";

    try {
      const headers =
        isLoggedIn && token ? { authorization: `Bearer ${token}` } : {};
      const response = await axios.post<Url>(url, data, { headers });

      addUrl(response.data);
      toast.success("URL shortened successfully!");
      reset();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.error || "Failed to shorten URL.");
      } else {
        toast.error("Unexpected error occurred.");
      }
    }
  };

  return (
    <div className="w-full px-6 md:px-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col p-7 gap-5 bg-[url(bg-shorten-mobile.svg)] bg-no-repeat bg-[100%_0%] bg-darkViolet rounded-2xl"
      >
        <input
          type="text"
          {...register("originalUrl", {
            required: "Please add a link",
            pattern: {
              value: /^(https?:\/\/)\w{3}/,
              message: "Enter a valid URL starting with http/https",
            },
          })}
          placeholder="Shorten a link here..."
          className={classNames(
            "p-3 bg-white text-darkViolet rounded-md font-medium tracking-wide focus:outline-cyan",
            {
              "border-2 border-red-400 focus:outline-red-400 placeholder:text-red-300":
                errors.originalUrl,
            }
          )}
        />
        {errors.originalUrl && (
          <p className="text-red-400 text-sm italic">
            {errors.originalUrl.message}
          </p>
        )}

        <button
          type="submit"
          className="p-3 bg-cyan text-white rounded-md font-semibold capitalize tracking-wide"
        >
          Shorten it!
        </button>
      </form>
    </div>
  );
};

export default ShortenForm;
