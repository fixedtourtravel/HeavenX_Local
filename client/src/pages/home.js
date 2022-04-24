import React from "react";
import HomeNotLogin from "./HomeNotLogin";
import VendorHome from "../component/Vendor/Home";
import AdminHome from "../component/admin/Home";
import { useAuth } from "../context/AuthContext";
import Query from "./query";
function Home() {
  const auth = useAuth();
  return (
    <div>
      {!auth.user && <HomeNotLogin />}
      {auth.user && auth.user.role === "client" && <Query />}
      {auth.user && auth.user.role === "supplier" && <VendorHome />}
      {auth.user && auth.user.role === "admin" && <AdminHome />}
    </div>
  );
}

export default Home;
