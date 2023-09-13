import Image from "next/image";
import SiteNav from "./SiteNav";

const SiteHeader = () => {
  return (
    <header className="site-header">
      <div className="wrapper">
        <figure className="site-logo">
          <Image src="/signdoc.png" alt="logo" width={48} height={48} />
        </figure>

        <SiteNav />
      </div>
    </header>
  );
};

export default SiteHeader;
