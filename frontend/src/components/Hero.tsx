import { illustrationWorking } from "../assets/images";

const Hero = () => {
  return (
    <section className="flex flex-col justify-between items-center gap-6 my-10 lg:pl-16 lg:flex-row-reverse lg:items-start lg:content-start lg:gap-0">
      <div className="overflow-hidden lg:h-[30rem] lg:min-w-7/12  relative">
        <img
          src={illustrationWorking}
          alt=""
          className="h-[22rem] w-full object-contain  relative lg:w-full lg:h-full lg:object-right-top lg:left-20 lg:absolute"
        />
      </div>
      <div className="flex flex-col gap-4 justify-center items-center px-8 lg:px-0 lg:mt-12 ">
        <h1 className="text-5xl text-center font-semibold leading-14 lg:text-start lg:text-6xl lg:leading-20">
          More than just shorter links
        </h1>
        <p className="text-center text-gray-400 font-medium px-5 lg:text-start lg:px-0">
          Quickly shorten your links for easier sharing and better organization.
        </p>
      </div>
    </section>
  );
};

export default Hero;
