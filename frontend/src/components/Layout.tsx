import { useState } from "react";
import Header from "./Header";
import Hero from "./Hero";
import ShortenForm from "./ShortenForm";
import ShortenUrlList from "./ShortenUrlList";
import { Url } from "../types";
import { Toaster } from "react-hot-toast";

const Main = () => {
  const [urls, setUrls] = useState<Url[]>([]);

  const addUrl = (newUrl: Url) => {
    setUrls((prevUrls) => [newUrl, ...prevUrls]);
  };
  return (
    <div className="max-w-6xl mx-auto pb-20">
      <Toaster position="top-right"/>
      <Header />
      <main>
        <Hero />
        <ShortenForm addUrl={addUrl} />
        <ShortenUrlList urls={urls} />
      </main>
    </div>
  );
};

export default Main;
