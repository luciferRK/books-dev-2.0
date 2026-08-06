import { useLocation, useRoutes } from "react-router-dom";
import Book from "../pages/Book";
import Home from "../pages/Home";
import React from "react";
import { usePageState, useGlobalActions } from "../store/global/useGlobal";

const Routes = () => {
  const pageState = usePageState();
  const { setPageState } = useGlobalActions();
  const location = useLocation();
  const [delayedLocation, setDelayedLocation] = React.useState(location);

  React.useEffect(() => {
    if (location !== delayedLocation) {
      setPageState("exit");
    }
  }, [location, delayedLocation, setPageState]);

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
      className={`pageWrapper ${pageState}`}
      onAnimationEnd={(e) => {
        if (pageState === "exit") {
          // Advance as soon as the exit animations finish (original behaviour).
          setDelayedLocation(location);
          setPageState("enter");
        } else if (pageState === "enter" && e.target === e.currentTarget) {
          // End the enter phase only on the wrapper's own timer animation, not
          // on a child animation bubbling up early, which would cut the reveal
          // animations short and make them snap.
          setPageState("idle");
        }
      }}
    >
      {element}
    </div>
  );
};

export default Routes;
