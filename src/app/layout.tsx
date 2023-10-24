import Providers from "../components/providers";
import "./globals.css";
import tabs from "./tabs";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <div className="flex flex-col">
          <Providers tabs={tabs}>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
