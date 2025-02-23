const Input = () => {
  return (
    <form className="flex flex-col gap-5 p-6 rounded-xl w-full bg-[url(/bg-shorten-mobile.svg)] md:bg-[url(/bg-shorten-desktop.svg)] bg-no-repeat bg-[100%_0%] bg-darkViolet ">
      <input
        type="text"
        placeholder="Your URL here"
        className="w-full p-3 bg-white rounded-lg font-medium capitalize text-lg "
      />
      <input
        type="button"
        value="shorten it!"
        className="w-full p-3 bg-cyan rounded-lg font-medium capitalize text-white text-lg"
      />
    </form>
  );
};

export default Input;
