import Query from "./pages/query";
import Search from "./pages/Search";

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
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Reverify from "./pages/Reverify";
import AuthProvider from "./context/AuthContext";
import MyOrders from "./component/client/MyOrders";
import VendorHome from "./component/Vendor/Home";
import PrivateRoute from "./pages/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AdminHome from "./component/admin/Home";
import AdminSignUp from "./pages/adminsignup";
import AdminLogin from "./pages/adminlogin";
import Reply from "./component/Vendor/Reply/Reply";
import VerifyEmail from "./pages/VerifyEmail";
import Voucher from "./component/Vendor/Voucher/Voucher";
import Invoice from "./component/Vendor/Invoice/Invoice";
import Policy from "./pages/policy";
import Term from "./pages/term";

function App() {
  return (
    <div className="App">
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
            <Route path={ROUTES.ADMINLOGIN} component={() => <AdminLogin />} />
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
            <Route
              exact={true}
              path={ROUTES.REPLY_CLIENT}
              component={() => <Reply />}
            />
            <Route
              exact={true}
              path={ROUTES.REPLY_VENDER}
              component={() => <Reply />}
            />
            <Route
              exact={true}
              path={ROUTES.VOUCHER}
              component={() => <Voucher />}
            />
            <Route
              exact={true}
              path={ROUTES.INVOICE_VENDER}
              component={() => <Invoice />}
            />
            <Route
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
    </div>
  );
}

export default App;
