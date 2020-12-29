import React, { useEffect, useState } from "react";

import { isAuthorized } from "../UserFunctions/UserFunctions";

const Home = ({ history }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
        const res = await isAuthorized();
        if (res.is_auth === false) history.push("/login");
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
        history.push("/login")
      }
    };
    fetch();
  }, [history]);

  if (isLoading) return <div style={{ paddingTop: "5rem" }}>Loading...</div>;

  if (error) return <div style={{ paddingTop: "5rem" }}>Error</div>;

  return <h1 style={{ paddingTop: "5rem" }}>Hello World</h1>;
};

export default Home;
