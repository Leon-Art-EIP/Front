/* c8 ignore start */
export interface RatingProps {
  closeRating: () => void;
}

export function Rating(props: RatingProps): JSX.Element {
  // function onRating(index: number) {
  //   props.messageService.handleRating(props.conversationService.convSelected?.id, index);
  // }

  return (
    <div className="flex flex-col p-6 gap-4 h-fit bg-background rounded-2xl w-full relative">
      {/* <button className="absolute top-4 right-4" onClick={props.closeRating}>
        <CloseIcon className="fill-[#8F8F8F]" />
      </button>
      <span className="text-2xl font-semibold text-center">Evaluer la transaction</span>
      <span className="text-md">
        Êtes-vous satisfait de votre achat ?<br />
        Faites-le savoir !
      </span>
      <div className="flex flex-row justify-center">
        <button onClick={() => onRating(1)}>
          <StarRoundedIcon
            className={`${
              props.messageService.orderInfos?.orderRating && props.messageService.orderInfos?.orderRating >= 1
                ? "fill-[#ffd600]"
                : "fill-[#D9D9D9]"
            } w-12 h-12`}
          />
        </button>
        <button onClick={() => onRating(2)}>
          <StarRoundedIcon
            className={`${
              props.messageService.orderInfos?.orderRating && props.messageService.orderInfos?.orderRating >= 2
                ? "fill-[#ffd600]"
                : "fill-[#D9D9D9]"
            } w-12 h-12`}
          />
        </button>
        <button onClick={() => onRating(3)}>
          <StarRoundedIcon
            className={`${
              props.messageService.orderInfos?.orderRating && props.messageService.orderInfos?.orderRating >= 3
                ? "fill-[#ffd600]"
                : "fill-[#D9D9D9]"
            } w-12 h-12`}
          />
        </button>
        <button onClick={() => onRating(4)}>
          <StarRoundedIcon
            className={`${
              props.messageService.orderInfos?.orderRating && props.messageService.orderInfos?.orderRating >= 4
                ? "fill-[#ffd600]"
                : "fill-[#D9D9D9]"
            } w-12 h-12`}
          />
        </button>
        <button onClick={() => onRating(5)}>
          <StarRoundedIcon
            className={`${
              props.messageService.orderInfos?.orderRating && props.messageService.orderInfos?.orderRating >= 5
                ? "fill-[#ffd600]"
                : "fill-[#D9D9D9]"
            } w-12 h-12`}
          />
        </button>
      </div> */}
    </div>
  );
}
/* c8 ignore stop */
