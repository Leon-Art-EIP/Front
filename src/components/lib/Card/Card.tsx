import React from "react";

export interface CardProps {
  title: string;
  children: React.ReactNode;
}

/* c8 ignore start */

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className="max-w-md mx-auto bg-vackground rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          {/* Ici vous pouvez mettre une image si vous en avez une. 
                    Par exemple: <img className="h-48 w-full object-cover md:w-48" src={yourImage} alt="Man looking at item at a store"/> */}
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{title}</div>
          <div className="mt-2 text-secondary">{children}</div>
        </div>
      </div>
    </div>
  );
};

/* c8 ignore start */

export default Card;
