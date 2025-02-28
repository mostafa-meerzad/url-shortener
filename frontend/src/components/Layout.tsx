import Header from "./Header";
import Hero from "./Hero";
import ShortenForm from "./ShortenForm";
import ShortenUrlList from "./ShortenUrlList";
import { Toaster } from "react-hot-toast";

const Main = () => {
  return (
    <div className="max-w-6xl mx-auto pb-20">
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
