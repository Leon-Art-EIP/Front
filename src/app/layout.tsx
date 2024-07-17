import Session from "../components/session";
import "./globals.css";
import tabs from "./tabs";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <div className="flex flex-col h-screen select-none bg-background">
          <Session tabs={tabs}>{children}</Session>
        </div>
      </body>
    </html>
  );
}
