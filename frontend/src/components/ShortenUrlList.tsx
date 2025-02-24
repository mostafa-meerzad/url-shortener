import React from "react";
import ShortenUrlItem from "./ShortenUrlItem";
import { Url } from "../types";

interface Props {
  urls: Url[];
  onCopy: (shortUrl: string) => void;
  onDelete: (shortUrl: string) => void;
}
const ShortenUrlList: React.FC<Props> = ({ urls, onCopy, onDelete }) => {
  return (
    <ul className="flex flex-col gap-5 px-6 py-8 md:px-10">
      {urls.map((url) => (
        <ShortenUrlItem {...url} onCopy={onCopy} onDelete={onDelete} />
      ))}
    </ul>
  );
};

export default ShortenUrlList;
