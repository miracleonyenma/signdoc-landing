"use client";

import { ChevronDown } from "lucide-react";

const ScrollDownBtn = () => {
  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <button onClick={handleScrollDown} className="btn btn--alt scroll-down-btn">
      <ChevronDown className="icon" />
    </button>
  );
};

export default ScrollDownBtn;
