import React from "react";
import { useForm } from "react-hook-form";
import { Url, UrlFormData } from "../types";
import classNames from "classnames";

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

  const onSubmit = async (data: UrlFormData) => {
    
  };

  return (
    <div className="w-full px-6 md:px-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col p-7 gap-5 bg-[url(bg-shorten-mobile.svg)] bg-no-repeat bg-[100%_0%] bg-darkViolet rounded-2xl "
      >
        <input
          type="text"
          {...register("originalUrl", {
            required: "please add a link",
            pattern: {
              value: /^(https?:\/\/)\w{5}/,
              message: "Enter a valid URL starting with http/https",
            },
          })}
          placeholder={"Shorten a link here..."}
          className={classNames({
            "p-3 bg-white text-darkViolet rounded-md font-medium capitalize tracking-wide focus:outline-cyan":
              true,
            "border-2 border-red-400 focus:outline-red-400 placeholder:text-red-300":
              errors.originalUrl,
          })}
        />
        {errors.originalUrl && (
          <p className="relative -top-1 text-red-400 leading-0 text-sm italic">
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
