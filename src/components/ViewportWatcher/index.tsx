import React from "react";
import { getProperty } from "uixtra/utils";
import { useGlobalActions } from "../../store/global/useGlobal";

const ViewportWatcher: React.FC = () => {
  const { setMobileView } = useGlobalActions();

  React.useEffect(() => {
    if (!getProperty(window, ["matchMedia"], false)) {
      return;
    }

    const mediaQuery = window.matchMedia("(max-width:450px)");
    const onChange = (e: MediaQueryListEvent) => setMobileView(e.matches);

    setMobileView(mediaQuery.matches);

    mediaQuery.addEventListener("change", onChange);

    return () => mediaQuery.removeEventListener("change", onChange);
  }, [setMobileView]);

  return <></>;
};

export default ViewportWatcher;
