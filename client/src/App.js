import React, { Suspense, lazy } from "react";
// import Query from "./pages/query";
// import Search from "./pages/Search";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import * as ROUTES from "./constants/routes";
import Home from "./pages/Home";
//import Login from "./pages/login";
// import SignUp from "./pages/signup";
// import Reverify from "./pages/Reverify";
// import AuthProvider from "./context/AuthContext";
// import MyOrders from "./component/client/MyOrders";
// import VendorHome from "./component/Vendor/Home";
// import PrivateRoute from "./pages/PrivateRoute";
// import ForgotPassword from "./pages/ForgotPassword";
// import ResetPassword from "./pages/ResetPassword";
// import AdminHome from "./component/admin/Home";
// import AdminSignUp from "./pages/adminsignup";
// import AdminLogin from "./pages/adminlogin";
// import Reply from "./component/Vendor/Reply/Reply";
// import VerifyEmail from "./pages/VerifyEmail";
// import Voucher from "./component/Vendor/Voucher/Voucher";
// import Invoice from "./component/Vendor/Invoice/Invoice";
// import Policy from "./pages/policy";
// import Term from "./pages/term";

const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/signup"));
const Reverify = lazy(() => import("./pages/Reverify"));
const AuthProvider = lazy(() => import("./context/AuthContext"));
const MyOrders = lazy(() => import("./component/client/MyOrders"));
const VendorHome = lazy(() => import("./component/Vendor/Home"));
const PrivateRoute = lazy(() => import("./pages/PrivateRoute"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const AdminHome = lazy(() => import("./component/admin/Home"));
const AdminSignUp = lazy(() => import("./pages/adminsignup"));
const AdminLogin = lazy(() => import("./pages/adminlogin"));
const Reply = lazy(() => import("./component/Vendor/Reply/Reply"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail"));
const Voucher = lazy(() => import("./component/Vendor/Voucher/Voucher"));
const Invoice = lazy(() => import("./component/Vendor/Invoice/Invoice"));
const Policy = lazy(() => import("./pages/policy"));
const Term = lazy(() => import("./pages/term")); 
const Query = lazy(() => import("./pages/query"));
const Search = lazy(() => import("./pages/Search"));

function App() { 
  return (
    <div className="App">
      <Suspense fallback={<div>Loading</div>}> 
        <Router>
          <AuthProvider>
            <Switch>
              <Route
                exact={true}
                path={ROUTES.FORGOTPASSWORD}
                component={ForgotPassword}
              />
              <Route path={ROUTES.LOGIN} component={() => <Login />} />
              <Route path={ROUTES.SIGNUP} component={() => <SignUp />} />
              <Route path={ROUTES.REVERIFY} component={() => <Reverify />} />
              <Route
                path={ROUTES.ADMINSIGNUP}
                component={() => <AdminSignUp />}
              />
              <Route
                path={ROUTES.ADMINLOGIN}
                component={() => <AdminLogin />}
              />
              <PrivateRoute
                path={ROUTES.MYORDERS}
                component={() => <MyOrders />}
              ></PrivateRoute>
              <PrivateRoute
                path={ROUTES.QUERYModify}
                component={() => <Query />}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path={ROUTES.QUERY}
                component={() => <Query />}
              ></PrivateRoute>
              <PrivateRoute
                path={ROUTES.SEARCH}
                component={() => <Search />}
              ></PrivateRoute>
              <PrivateRoute
                path={ROUTES.VENDORHOME}
                component={() => <VendorHome />}
              ></PrivateRoute>
              <Route
                exact={true}
                path={ROUTES.RESETPASSWORD}
                component={ResetPassword}
              />
              <Route
                exact={true}
                path={ROUTES.EMAILVERIFY}
                component={() => <VerifyEmail />}
              />
              <PrivateRoute
                path={ROUTES.ADMINHOME}
                component={() => <AdminHome />}
              />
              <PrivateRoute
                exact={true}
                path={ROUTES.REPLY_CLIENT}
                component={() => <Reply />}
              />
              <PrivateRoute
                exact={true}
                path={ROUTES.REPLY_VENDER}
                component={() => <Reply />}
              />
              <PrivateRoute
                exact={true}
                path={ROUTES.VOUCHER}
                component={() => <Voucher />}
              />
              <PrivateRoute
                exact={true}
                path={ROUTES.INVOICE_VENDER}
                component={() => <Invoice />}
              />
              <PrivateRoute
                exact={true}
                path={ROUTES.INVOICE_CLIENT}
                component={() => <Invoice />}
              />
              <Route
                exact={true}
                path={ROUTES.PRIVACY_POLICY}
                component={() => <Policy />}
              />
              <Route
                exact={true}
                path={ROUTES.TERM_CONDITION}
                component={() => <Term />}
              />
              <Route exact path={ROUTES.HOME} component={() => <Home />} />
              <Redirect to="/" />
            </Switch>
          </AuthProvider>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
