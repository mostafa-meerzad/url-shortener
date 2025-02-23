import classNames from "classnames";
import { logo } from "../../assets/images";

const Navbar = () => {
  const links = [
    { label: "login", href: "/" },
    { label: "sign up", href: "/" },
  ];

  return (
    <nav className="flex justify-between items-center ">
      <img src={logo} alt="URL Shortener" className=" h-7 " />

      <ul className="flex gap-3">
        {links.map(({ label, href }) => (
          <li
            className={classNames({
              " py-2 px-4 rounded-4xl capitalize text-gray-600 font-medium hover:opacity-65 ":
                true,
              "bg-cyan text-white": label === "sign up",
            })}
          >
            <a href={href}>{label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
