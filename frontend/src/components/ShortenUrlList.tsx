import React from "react";
import ShortenUrlItem from "./ShortenUrlItem";
import { Url } from "../types";

interface ShortenUrlListProps {
  urls: Url[];
  onDelete: (shortUrl: string) => void;
}
const ShortenUrlList: React.FC<ShortenUrlListProps> = ({
  urls,
  onDelete,
}) => {
  return (
    <ul className="flex flex-col gap-5 px-6 py-8 md:px-10">
      {urls.map((url) => (
        <ShortenUrlItem
          {...url}
          onDelete={onDelete}
          key={url._id || url.originalUrl}
        />
      ))}
    </ul>
  );
};

export default ShortenUrlList;
