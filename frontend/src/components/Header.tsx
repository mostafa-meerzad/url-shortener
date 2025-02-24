import { logo } from "../assets/images";
import NavLink, { LinkItem } from "./NavLink";

const Header = () => {
  const links: LinkItem[] = [
    { label: "login", href: "/" },
    { label: "sign up", href: "/", variant: "primary" },
  ];

  return (
    <header className="p-6 md:p-10">
      <nav className="flex justify-between items-center ">
        <img src={logo} alt="URL Shortener" className=" h-7 " />
        <ul className="flex gap-3">
          {links.map((link) => (
            <NavLink {...link} key={link.label} />
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
