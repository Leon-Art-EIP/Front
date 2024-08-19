import React from "react";

export interface BadgeProps {
  text: string;
  color?: "danger" | "success" | "info";
}

/* c8 ignore start */

const Badge: React.FC<BadgeProps> = ({ text, color }) => {
  let badgeColor: string = "bg-secondary text-primary";

  if (color === "danger") badgeColor = "bg-primary text-white";
  else if (color === "success") badgeColor = "bg-gray-200 text-purple-800";
  else if (color === "info") badgeColor = "bg-purple-800 text-white";

  return <span className={`inline-block py-3 px-5 rounded-full text-sm font-semibold ${badgeColor}`}>{text}</span>;
};

/* c8 ignore stop */

export default Badge;
