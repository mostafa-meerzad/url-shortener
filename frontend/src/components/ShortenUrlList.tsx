import React from "react";
import ShortenUrlItem from "./ShortenUrlItem";
import { Url } from "../types";
import axios from "axios";
import toast from "react-hot-toast";

interface ShortenUrlListProps {
  urls: Url[];
  setUrls: React.Dispatch<React.SetStateAction<Url[]>>;
  authenticated: boolean;
}
const ShortenUrlList: React.FC<ShortenUrlListProps> = ({
  urls,
  setUrls,
  authenticated,
}) => {
  const handleDelete = async (id: string) => {
    // find the URL we want to remove  for (restoring on error)
    const urlToDelete = urls.find((url) => url._id === id);
    if (!urlToDelete) return;

    // optimistically remove from state
    setUrls((prevUrls) => prevUrls.filter((url) => url._id !== id));

    // if the user is logged in, call the backend
    if (authenticated) {
      try {
        await axios.delete(`http://localhost:3000/api/urls/${id}`);
        toast.success("URL deleted successfully!");
      } catch (error) {
        console.log("something went wrong, ", error);
        toast.error("cant delete the url!");

        // restore the deleted URL if the request fails
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
