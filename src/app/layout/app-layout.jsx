import { Header } from "@/components/common";
import { Outlet } from "react-router";
import { UserContextProvider } from "../providers";

export const AppLayout = () => {
  return (
    <main className="container mx-auto px-4">
      <Header />
      <div className="py-5 sm:py-10">
        <Outlet />
      </div>
    </main>
  );
};
