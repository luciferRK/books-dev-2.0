import { useLocation, useRoutes } from "react-router-dom";
import Book from "../pages/Book";
import Home from "../pages/Home";
import React from "react";
import useGlobalAction from "../context/actions/GlobalAction";

const Routes = () => {
  const { state, setPageState } = useGlobalAction();
  const location = useLocation();
  const [delayedLocation, setDelayedLocation] = React.useState(location);

  React.useEffect(() => {
    if (location !== delayedLocation) {
      setPageState("exit");
    }
  }, [location]);

  console.log("sample");

  const element = useRoutes(
    [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/:bookName",
        element: <Book />,
      },
    ],
    delayedLocation,
  );

  return (
    <div
      className={`pageWrapper ${state.pageState}`}
      onAnimationEnd={() => {
        if (state.pageState === "exit") {
          setDelayedLocation(location);
          setPageState("enter");
        }
      }}
    >
      {element}
    </div>
  );
};

export default Routes;
