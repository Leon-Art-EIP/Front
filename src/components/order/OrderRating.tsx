import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import { useState } from "react";

export interface OrderRatingProps {
  rating: number;
  setRating: (rating: number) => void;
}

export function OrderRating(props: OrderRatingProps): JSX.Element {
  const [hoverRating, setHoverRating] = useState<number>(0);

  function onRating(index: number) {
    props.setRating(index);
  }

  function onHover(index: number) {
    setHoverRating(index);
  }

  function onHoverLeave() {
    setHoverRating(0);
  }

  return (
    <div className="flex flex-col p-10 gap-4 w-full items-center">
      <span className="text-2xl font-semibold text-center">Evaluer la transaction</span>
      <span className="text-md">Afin de finaliser la transaction, veuillez noter le vendeur.</span>
      <div className="flex flex-row justify-center" onMouseLeave={onHoverLeave}>
        {Array.from({ length: 5 }, (_, index) => {
          const starIndex = index + 1;
          return (
            <button
              key={starIndex}
              onClick={() => onRating(starIndex)}
              onMouseEnter={() => onHover(starIndex)}
              className="focus:outline-none"
            >
              {starIndex <= (hoverRating || props.rating) ? (
                <StarRateRoundedIcon className="text-7xl" />
              ) : (
                <StarBorderRoundedIcon className="text-7xl" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
