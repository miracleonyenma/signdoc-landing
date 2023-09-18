"use client";
import React from "react";
import { FileDashed } from "@phosphor-icons/react";

const TemplateCard = () => {
  return (
    <div>
      {/* Each Individual template card */}
      <div className="template-card">
        <div className="template-card__icon">
          <FileDashed size={192} weight="thin"/>
        </div>
        <div className="template-card__title">Contract Agreement Template</div>
      </div>
    </div>
  );
};

export default TemplateCard;
