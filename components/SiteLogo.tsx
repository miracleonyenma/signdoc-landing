"use client";

import Image from "next/image";
import { useState } from "react";

const SiteLogo = ({
  className,
  isActive,
}: {
  className?: string;
  isActive?: boolean;
}) => {
  const [active, setActive] = useState(isActive || false);

  return (
    <figure
      onClick={() => setActive(!active)}
      className={`site-logo ${active ? "site-logo--active" : ""} ${className}`}
    >
      <Image src="/signdoc-logo.png" alt="logo" width={48} height={48} />
      <div className="separator "></div>
      <figcaption className="site-logo__text ">
        <span>Signdoc</span>
      </figcaption>
    </figure>
  );
};

export default SiteLogo;
