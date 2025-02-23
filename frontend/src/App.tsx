import Main from "./components/layout/Main";
import Navbar from "./components/layout/Navbar";

const App = () => {
  return (
    <>
      <header className="max-w-6xl mx-auto p-6 md:p-10">
        <Navbar />
      </header>
      <main className="max-w-6xl mx-auto px-6 md:px-10">
        <Main />
      </main>
    </>
  );
};

export default App;
