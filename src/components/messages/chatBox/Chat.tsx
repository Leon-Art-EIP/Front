export interface ChatProps {
  content: string;
  sender: 0 | 1; 
  dateTime: string;
}

export function Chat(props: ChatProps): JSX.Element {
  return (
    <div className={`flex flex-col ${props.sender ? "items-start" : "items-end" } justify-center px-6`}>
      <div className={`rounded-2xl p-4 max-w-xl ${props.sender ? "bg-[#E11C0A] text-white" : "bg-[#F3F3F3] text-black" }`}>
        {props.content}
      </div>
      {props.dateTime && <span className="text-md px-2 py-1 text-[#858585]">{props.dateTime}</span>}
    </div>
  );
}
