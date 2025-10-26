import React from "react";
import { getProperty } from "uixtra/utils";
import useGlobalAction from "../../context/actions/GlobalAction";

const ViewportWatcher: React.FC = () => {
  const { setMobileView } = useGlobalAction();

  React.useEffect(() => {
    if (!getProperty(window, ["matchMedia"], false)) {
      return;
    }

    const mediaQuery = window.matchMedia("(max-width:450px)");
    const onChange = (e: MediaQueryListEvent) => setMobileView(e.matches);

    setMobileView(mediaQuery.matches);

    try {
      mediaQuery.addEventListener("change", onChange);

      return () => mediaQuery.removeEventListener("change", onChange);
    } catch {
      // fallback for legacy API
      mediaQuery.addListener(onChange);

      return () => {
        mediaQuery.removeListener(onChange);
      };
    }
  }, [setMobileView]);

  return <></>;
};

export default ViewportWatcher;
