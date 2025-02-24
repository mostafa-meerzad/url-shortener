import classNames from "classnames";
import React from "react";

export type LinkItem = {
  label: string;
  href: string;
  variant?: "default" | "primary";
};

const NavLink: React.FC<LinkItem> = ({ href, label, variant = "default" }) => {
  return (
    <li
      className={classNames(
        "py-2 px-4 rounded-4xl capitalize text-gray-600 font-medium hover:opacity-65",
        {
          "bg-cyan text-white": variant === "primary",
        }
      )}
    >
      <a href={href}>{label}</a>
    </li>
  );
};

export default NavLink;
