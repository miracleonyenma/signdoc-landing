import Link from "next/link";
import SiteLogo from "./SiteLogo";

const SiteFooter = () => {
  const links = [
    {
      name: "Home",
      path: "/",
      external: false,
    },
    {
      name: "Documntation",
      path: "/docs",
      external: false,
    },
    {
      name: "Features",
      path: "/features",
      external: false,
    },
    {
      name: "Hackathon",
      path: "https://signdoc-landing.vercel.app/",
      external: true,
    },
  ];
  return (
    <footer className="site-footer site-section ">
      <div className="wrapper ">
        <header className="site-footer__header">
          <SiteLogo className="site-logo--light" isActive />
        </header>
        <nav className="site-footer__nav">
          <ul className="site-footer__links ">
            {links.map((link) => (
              <li key={link.name} className="site-footer__links-item">
                <Link
                  href={link.path}
                  {...(link.external && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                  passHref
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="wrapper text-center text-slate-400">
        <hr className="my-8 border-slate-700" />
        <p>&copy; {new Date().getFullYear()} Signdoc. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default SiteFooter;
