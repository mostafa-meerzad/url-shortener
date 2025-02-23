import { illustrationWorking } from "../../assets/images";
import Input from "../ui/Input";

const Main = () => {
  return (
    <div className="flex flex-col justify-between items-center gap-8 my-10">
      <div>
        <img src={illustrationWorking} alt="" />
      </div>
      <div className="flex flex-col gap-4 justify-center items-center">
        <h1 className="text-5xl text-center font-semibold leading-14">
          More than just shorter links
        </h1>
        <p className="text-center text-gray-400 font-medium px-5">
          Quickly shorten your links for easier sharing and better organization.
        </p>
      </div>

      <Input />
    </div>
  );
};

export default Main;
