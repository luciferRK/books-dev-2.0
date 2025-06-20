import React from "react";
import { ifElse } from "uixtra/utils";

interface LoadingProps extends React.PropsWithChildren {
  isIt?: boolean;
}

const Loading: React.FC<LoadingProps> = (props) => {
  const { isIt = true, children } = props;
  return ifElse(
    isIt,
    <div className="loading">
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
      <p>Loading...</p>
    </div>,
    () => children,
  );
};

export default Loading;
