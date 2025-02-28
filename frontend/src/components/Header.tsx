import { useState } from "react";
import { logo } from "../assets/images";
import { useAuth } from "../context/AuthContext";
import AuthForm from "./AuthForm";

const Header = () => {
  const { isLoggedIn, logout, user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const handleModalClose = () => {
    setShowAuthModal(false);
  };

  return (
    <header className="flex justify-between items-center p-8 md:px-16">
      <img src={logo} alt="URL Shortener" className=" h-7 " />
      <div className="flex gap-3">
        {isLoggedIn ? (
          <div className="relative flex justify-center items-center gap-4 group">
            <span className="text-darkViolet text-lg font-medium capitalize ">
              {user?.name}
            </span>

            <button
              onClick={logout}
              className="  bg-cyan text-white px-4 py-1.5 capitalize rounded-3xl"
            >
              logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowAuthModal(true)}
            className=" bg-cyan text-white px-4 py-1.5 capitalize rounded-3xl"
          >
            login
          </button>
        )}
      </div>

      {showAuthModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-veryDarkBlue/50  z-50">
          <AuthForm onModalClose={handleModalClose} />
        </div>
      )}
    </header>
  );
};

export default Header;
