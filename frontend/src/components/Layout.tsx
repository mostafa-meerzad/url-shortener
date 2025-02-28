import Header from "./Header";
import Hero from "./Hero";
import ShortenForm from "./ShortenForm";
import ShortenUrlList from "./ShortenUrlList";
import { Toaster } from "react-hot-toast";

const Main = () => {
  return (
    <div className="max-w-7xl mx-auto pb-20 overflow-x-hidden">
      <Toaster position="top-right" />
      <Header />
      <main>
        <Hero />
        <ShortenForm />
        <ShortenUrlList />
      </main>
    </div>
  );
};

export default Main;
