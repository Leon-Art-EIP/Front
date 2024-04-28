import { CircularProgress } from "@mui/material";

export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center h-screen w-screen text-tertiary">
      <div className="text-center">
        <h1 className="text-xl font-bold mb-4">Chargement</h1>
        <CircularProgress size={50} thickness={4} color="primary" />
      </div>
    </div>
  );
}
