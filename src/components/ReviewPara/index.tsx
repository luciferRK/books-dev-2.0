import React, { useMemo } from "react";
import { Show, ShowIfElse } from "uixtra/components";
import { classNames, ifElse } from "uixtra/utils";
import "./ReviewPara.scss";
import { QUOTE_PREFIX } from "../../utils/constants";

interface ReviewParaProps {
  index: number;
  item: any;
}

const ReviewPara: React.FC<ReviewParaProps> = (props) => {
  const { index, item } = props;

  const isQuote = useMemo(() => item.startsWith(QUOTE_PREFIX), [item]);

  const modifedStarting = useMemo(() => {
    const firstCharLength = 1;
    return (
      <>
        <span className="review-first-char">
          {item.substring(0, firstCharLength)}
        </span>
        {item.substring(firstCharLength)}
      </>
    );
  }, [item]);

  return (
    <div
      className={classNames("review-paragraph", {
        quote: isQuote,
      })}
    >
      <Show if={isQuote}>
        <span className="quote-apostrophe">“</span>
      </Show>
      <ShowIfElse if={index === 0}>
        {modifedStarting}
        {ifElse(isQuote, item.substring(QUOTE_PREFIX.length), item)}
      </ShowIfElse>
    </div>
  );
};

export default ReviewPara;
