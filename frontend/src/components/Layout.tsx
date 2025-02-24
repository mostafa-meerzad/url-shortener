import Header from "./Header";
import Hero from "./Hero";
import ShortenForm from "./ShortenForm";
import ShortenUrlList from "./ShortenUrlList";

const Main = () => {
  return (
    <div className="max-w-6xl mx-auto">
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
