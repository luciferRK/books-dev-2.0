import type React from "react";
import { getProperty, ifElse } from "uixtra/utils";

interface RepeatProps extends React.HTMLAttributes<any> {
  name: string;
  for: Array<any>;
  element: React.FC<any>;
  Key?: (item: any, index: number) => any;
  passItem?: boolean;
  passIndex?: boolean;
}

const Repeat: React.FC<RepeatProps> = (props) => {
  const {
    name,
    for: list,
    element: Element,
    Key = (item, index) => `${name}-${getProperty(item, ["id"], "")}-${index}`,
    passIndex = false,
    passItem = false,
    ...restProps
  } = props;

  return list.map((item, index) => (
    <Element
      item={ifElse(passItem, item, undefined)}
      index={ifElse(passIndex, index, undefined)}
      key={Key(item, index)}
      {...restProps}
    />
  ));
};

export default Repeat;
