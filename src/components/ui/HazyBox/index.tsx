import React from "react";
import "./HazyBox.scss";
import { classNames } from "uixtra/utils";

interface HazyBoxProps {
  title: React.ReactNode;
  content: React.ReactNode;
  className?: string;
}

const HazyBox: React.FC<HazyBoxProps> = (props) => {
  const { title, content, className } = props;

  return (
    <div className={classNames("hazy-box", className)}>
      <div className="title">{title}</div>
      <div className="content">{content}</div>
    </div>
  )
}

export default React.memo(HazyBox);
