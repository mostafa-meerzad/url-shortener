import ShortenUrlItem from "./ShortenUrlItem";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const ShortenUrlList = () => {
  const { urls, setUrls, isLoggedIn, token } = useAuth();

  const handleDelete = async (id: string) => {
    const urlToDelete = urls.find((url) => url._id === id);
    if (!urlToDelete) return;

    setUrls((prevUrls) => prevUrls.filter((url) => url._id !== id));

    if (isLoggedIn) {
      try {
        await axios.delete(`http://localhost:3000/api/urls/${id}`, {
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

  return (
    <ul className="flex flex-col gap-5 px-6 py-8 md:px-10">
      {urls.map((url) => (
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
