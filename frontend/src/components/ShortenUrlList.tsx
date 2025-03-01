import ShortenUrlItem from "./ShortenUrlItem";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const baseUrl = import.meta.env.VITE_API_URL;

const ShortenUrlList = () => {
  const { urls, setUrls, isLoggedIn, token } = useAuth();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleDelete = async (id: string) => {
    const urlToDelete = urls.find((url) => url._id === id);
    if (!urlToDelete) return;

    setUrls((prevUrls) => prevUrls.filter((url) => url._id !== id));

    if (isLoggedIn) {
      try {
        await axios.delete(`${baseUrl}/urls/${id}`, {
          headers: { authorization: `Bearer ${token}` },
        });
        toast.success("URL deleted successfully!");
      } catch (error) {
        console.log("something went wrong, ", error);
        toast.error("cant delete the url!");

        setUrls((prevUrls) => [urlToDelete, ...prevUrls]);
      }
    } else {
      toast.success("URL deleted successfully!");
    }
  };

  const filteredUrls = urls.filter(
    (url) =>
      url.originalUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (url.shortUrl &&
        url.shortUrl.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const urlsToShow = searchTerm ? filteredUrls : urls;

  return (
    <ul className="grid grid-cols-1 lg:grid-cols-2 gap-5 px-8 py-8 md:px-16">
      <div className="col-span-1 lg:col-span-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.trim())}
          placeholder="Search URLs..."
          className="p-3 mb-4 bg-white text-darkViolet rounded-md w-full focus:outline-cyan border border-gray-400"
        />
      </div>
      {urlsToShow.map((url) => (
        <ShortenUrlItem
          {...url}
          onDelete={handleDelete}
          key={url._id || url.originalUrl}
        />
      ))}
    </ul>
  );
};

export default ShortenUrlList;
