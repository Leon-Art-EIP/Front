"use client";

export default function PaymentSuccessWrapper(): JSX.Element {
  const handleClick = () => {
    window.open("myapp://payment-success", "_blank");
  };

  return (
    <div className="bg-slate-50 py-4 px-6 flex flex-col items-center w-[90%] m-auto shadow-md rounded-2xl">
      <span className="text-black mb-4">Le paiement est réussi !</span>
      <button onClick={handleClick} className="bg-primary text-white py-2 px-6 text-lg cursor-pointer rounded-lg">
        Retourner à l&apos;application
      </button>
    </div>
  );
}
