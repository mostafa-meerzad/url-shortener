import React from "react";
import { Url } from "../types";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoCopyOutline } from "react-icons/io5";

interface ActionButtonProps {
  label: string;
  onClick: () => void;
  icon: React.ReactNode;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  onClick,
  icon,
}) => (
  <button
    onClick={onClick}
    className="flex justify-end items-center text-gray-200 transition group"
  >
    <span className="group-hover:w-auto group-hover:opacity-100 opacity-0 w-0 overflow-hidden transition-all select-none">
      {label}
    </span>
    {icon}
  </button>
);

interface ShortenUrlItemProps extends Url {
  onCopy: (shortUrl: string) => void;
  onDelete: (id: string) => void;
}

const ShortenUrlItem: React.FC<ShortenUrlItemProps> = ({
  _id,
  originalUrl,
  shortUrl,
  onCopy,
  onDelete,
}) => {
  return (
    <li className="flex justify-between p-6 rounded-xl bg-[url(bg-shorten-desktop.svg)] bg-no-repeat bg-cover bg-right bg-darkViolet">
      <div className="flex flex-col gap-3">
        <p className="text-gray-300">{originalUrl}</p>
        <p className="text-cyan font-medium text-lg">{shortUrl}</p>
      </div>

      <div className="flex flex-col gap-3">
        <ActionButton
          label="copy"
          onClick={() => onCopy(shortUrl)}
          icon={<IoCopyOutline color="cyan" size={"22px"} />}
        />
        <ActionButton
          label="delete"
          onClick={() => onDelete(_id)}
          icon={<RiDeleteBinLine color="tomato" size={"22px"} />}
        />
      </div>
    </li>
  );
};

export default ShortenUrlItem;
