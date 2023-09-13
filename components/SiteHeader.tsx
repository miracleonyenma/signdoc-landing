import Image from "next/image";
import SiteNav from "./SiteNav";
import SiteLogo from "./SiteLogo";

const SiteHeader = () => {
  return (
    <header className="site-header">
      <div className="wrapper">
        <SiteLogo />
        <SiteNav />
      </div>
    </header>
  );
};

export default SiteHeader;
