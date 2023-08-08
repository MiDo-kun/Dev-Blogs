import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Profile";

export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}