import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute({ exact, path, component }) {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuthStatus() {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/status`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // console.log("response:" + response)
        if (response.status >= 400) {
          throw new Error("not authorized");
        } else {
          // const { jwt } = await response.json() returns an empty response???
          const jwt = localStorage.getItem("token");
          localStorage.setItem("token", jwt);
          setAuth(true);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
    checkAuthStatus();
  }, []);

  if (!loading && !auth) {
    return <Redirect to="/login" />;
  } else {
    return (
      !loading && (
        <>
          <Route exact={exact} path={path} component={component} />
        </>
      )
    );
  }
}