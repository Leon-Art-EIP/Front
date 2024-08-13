"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import TextLogo from "../text-logo/TextLogo";
import { LinkedIn, Instagram } from "@mui/icons-material";

export default function Footer(): JSX.Element {
  const router = useRouter();

  function onEveryArticles() {
    router.push("/articles");
  }

  function onGeneralTermsOfSale() {
    router.push("/terms-of-sale");
  }

  return (
    <div className="flex flex-col w-full h-full justify-center items-center flex-shrink-0">
      <span className="bg-secondary w-4/5 h-1 rounded"></span>
      <div className="flex flex-row w-full justify-center items-center gap-10 py-5">
        <Link href="/" className="hover:underline text-sm">
          Conditions Générales de Vente
        </Link>
        <Link href="/" className="hover:underline text-sm">
          Tous les articles
        </Link>
        <Link href="https://www.instagram.com/leon_art_eip/">
          <Instagram />
        </Link>
        <Link href="https://www.linkedin.com/in/leon-art-293758262/">
          <LinkedIn />
        </Link>
        <span className="font-bold text-2xl cursor-default select-none">
          <TextLogo />
        </span>
      </div>
    </div>
  );
}
