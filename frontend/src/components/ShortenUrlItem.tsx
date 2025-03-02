import React, { JSX } from "react";
import { Url } from "../types";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoCopyOutline } from "react-icons/io5";
import useCopyToClipBoard from "../hooks/useCopyToClipboard";

interface ActionButtonProps {
  label: string;
  onClick: () => void;
  icon: JSX.Element;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  onClick,
  icon,
}) => (
  <button
    onClick={onClick}
    className="flex justify-end gap-1 items-center text-gray-200 transition group"
    aria-label={label}
  >
    <span className="group-hover:w-auto group-hover:opacity-100 opacity-0 w-0 overflow-hidden transition-all select-none">
      {label}
    </span>
    {icon}
  </button>
);

interface ShortenUrlItemProps extends Url {
  onDelete: (id: string) => void;
}

const ShortenUrlItem: React.FC<ShortenUrlItemProps> = ({
  _id,
  originalUrl,
  shortUrl,
  onDelete,
}) => {
  const { copy, isCopied } = useCopyToClipBoard();

  return (
    <li
      className={`flex justify-between p-6 rounded-xl bg-[url(assets/images/bg-shorten-desktop.svg)] bg-no-repeat bg-cover bg-right bg-darkViolet ${
        isCopied ? " shadow-lg shadow-cyan" : ""
      }`}
    >
      <div className="flex flex-col gap-3 max-w-2/3 overflow-hidden break-words">
        <p className="text-gray-300">{originalUrl}</p>
        <p className="text-cyan font-medium text-lg">{shortUrl}</p>
      </div>

      <div className="flex flex-col gap-3">
        <ActionButton
          label="copy"
          onClick={() => copy(originalUrl)}
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
