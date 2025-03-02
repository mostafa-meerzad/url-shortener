import { useForm } from "react-hook-form";
import { Url, UrlFormData } from "../types";
import axios from "axios";
import classNames from "classnames";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useState } from "react";

const baseUrl = import.meta.env.VITE_API_URL
const ShortenForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UrlFormData>();
  const { isLoggedIn, token, setUrls } = useAuth();

  const [isCustomAlias, setIsCustomAlias] = useState<boolean>(false);

  const onSubmit = async (data: UrlFormData) => {
    if (!isCustomAlias) {
      delete data.customAlias;
    }
    const url = isLoggedIn
      ? `${baseUrl}/api/urls/shorten`
      : `${baseUrl}/api/urls/shorten/guest`;

    try {
      const headers =
        isLoggedIn && token ? { authorization: `Bearer ${token}` } : {};
      const response = await axios.post<Url>(url, data, { headers });

      setUrls((prevUrls) => [response.data, ...prevUrls]);
      toast.success("URL shortened successfully!");
      reset();
      setIsCustomAlias(false);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error)
        toast.error(error.response.data.error || "Failed to shorten URL.");
      } else {
        toast.error("Unexpected error occurred.");
      }
    }
  };

  return (
    <div className="w-full px-8 md:px-16 ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row md:justify-end p-8 gap-6 bg-[url(assets/images/bg-shorten-mobile.svg)] md:bg-[url(assets/images/bg-shorten-desktop.svg)] bg-no-repeat bg-[100%_0%] md:bg-center md:bg-cover bg-darkViolet rounded-2xl md:px-14 md:py-12"
      >
        <div className="flex flex-col flex-1/2 relative">
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
              "p-3 bg-white text-darkViolet rounded-md font-medium tracking-wide focus:outline-cyan ",
              {
                "border-2 border-red-400 focus:outline-red-400 placeholder:text-red-300":
                  errors.originalUrl,
              }
            )}
          />
          {errors.originalUrl && (
            <p className="text-red-400 text-sm italic absolute -bottom-6">
              {errors.originalUrl.message}
            </p>
          )}
        </div>

        {isCustomAlias && (
          <div className="flex flex-col relative ">
            <input
              type="text"
              {...register("customAlias", {
                pattern: {
                  value: /\w{3}/,
                  message: "Enter a valid string",
                },
              })}
              placeholder="Custom alias"
              className={classNames(
                "p-3 bg-white text-darkViolet rounded-md font-medium tracking-wide focus:outline-cyan w-full",
                {
                  "border-2 border-red-400 focus:outline-red-400 placeholder:text-red-300":
                    errors.customAlias,
                }
              )}
            />
            {errors.customAlias && (
              <p className="text-red-400 text-sm italic absolute -bottom-6">
                {errors.customAlias.message}
              </p>
            )}
          </div>
        )}
        <div className="flex gap-2">
          <button
            type="submit"
            className="p-3 bg-cyan text-white rounded-md font-semibold capitalize tracking-wide w-full"
          >
            Shorten it!
          </button>
          <button
            onClick={() => setIsCustomAlias(!isCustomAlias)}
            type="button"
            className="p-3 ring-offset-slate-300 bg-contain border text-white rounded-md font-semibold capitalize tracking-wide"
          >
            custom
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShortenForm;
