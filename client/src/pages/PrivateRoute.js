import React from "react";
import { Redirect, Route } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ component: Component, ...rest }) {
  const auth = useAuth();

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to / page
    <Route
      {...rest}
      render={(props) =>
        auth.user == null ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
}
