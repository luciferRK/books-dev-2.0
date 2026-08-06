import { COLORS } from "../../utils/constants";
import type { IconProps } from "./types";

const FullStar: React.FC<IconProps> = ({
  className,
  color = COLORS.secondary,
  ...restProps
}) => {
  return (
    <svg
      className={className}
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="344.000000pt"
      height="344.000000pt"
      viewBox="0 0 344.000000 344.000000"
      preserveAspectRatio="xMidYMid meet"
      {...restProps}
    >
      <g
        transform="translate(0.000000,344.000000) scale(0.100000,-0.100000)"
        // fill="#ffffff15"
        fill={color}
        stroke="none"
      >
        <path
          // fill="#ffffff15"
          fill={color}
          d="M1661 3203 c-15 -13 -70 -162 -190 -518 l-169 -500 -488 -6 c-269 -3
-508 -7 -532 -8 -34 -1 -50 -8 -73 -30 -38 -38 -39 -80 -1 -120 15 -16 207
-163 427 -326 220 -163 401 -300 403 -305 2 -5 -67 -235 -153 -510 -143 -459
-156 -504 -144 -531 26 -64 89 -76 154 -32 22 15 217 152 433 305 l392 278
408 -288 c224 -159 418 -296 432 -305 50 -35 116 -15 139 41 11 27 -1 74 -144
531 -86 276 -155 506 -153 510 2 5 183 142 403 306 220 163 412 310 428 326
37 40 36 82 -2 120 -25 24 -38 29 -83 30 -29 1 -268 5 -532 8 l-478 6 -169
500 c-120 354 -175 505 -190 518 -12 9 -38 17 -59 17 -21 0 -47 -8 -59 -17z"
        />
      </g>
    </svg>
  );
};

export default FullStar;
