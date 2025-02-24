import { illustrationWorking } from "../assets/images";

const Hero = () => {
  return (
    <section className="flex flex-col justify-between items-center gap-6 my-10 ">
      <div className="overflow-hidden">
        <img
          src={illustrationWorking}
          alt=""
          className="h-[22rem] w-full object-contain left-20 relative md:h-auto md:w-auto md:left-auto"
        />
      </div>
      <div className="flex flex-col gap-4 justify-center items-center px-8 md:px-10">
        <h1 className="text-5xl text-center font-semibold leading-14">
          More than just shorter links
        </h1>
        <p className="text-center text-gray-400 font-medium px-5">
          Quickly shorten your links for easier sharing and better organization.
        </p>
      </div>
    </section>
  );
};

export default Hero;
