import React from "react";
import Logo from "/assets/images/name_logo_white.png";
import "./Header.scss";
import useHomeAction from "../../context/actions/HomeAction";
import { and, classNames } from "uixtra/utils";
import useGlobalAction from "../../context/actions/GlobalAction";

const Header: React.FC = () => {
  const { MenuOptions } = useHomeAction();
  const { state } = useGlobalAction();
  const { isMobileView } = state;
  const menuBackground = React.useRef<HTMLDivElement>(null);

  const [showPhoneMenu, setShowPhoneMenu] = React.useState(false);

  return (
    <div
      className={classNames("main-header", {
        "is-open": and(isMobileView, showPhoneMenu),
      })}
    >
      <div className="logo-container">
        <img src={Logo} className="logo" />
      </div>
      <div className="options"></div>
      <div className="phone-expanded-options">
        <button
          type="button"
          title="menu"
          className="icon"
          onClick={() => {
            const menuBackgroundDiv = menuBackground.current as HTMLDivElement;
            if (!showPhoneMenu) {
              if (menuBackgroundDiv.classList.contains("minimize")) {
                menuBackgroundDiv.classList.replace("minimize", "fullscreen");
              } else {
                menuBackgroundDiv.classList.add("fullscreen");
              }
            } else {
              menuBackgroundDiv.classList.replace("fullscreen", "minimize");
            }
            setShowPhoneMenu((prev) => !prev);
          }}
        >
          <div ref={menuBackground} className={"menu-background"} />
          <div className="bar bar-1" />
          <div className="bar bar-2" />
          <div className="bar bar-3" />
        </button>
        <div className="options">
          {MenuOptions.map((option) => (
            <button
              key={option.key}
              type="button"
              className={classNames("option", { selected: option.isSelected })}
              onClick={option.onClick}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;

// 📱 Mobile Layout Concept
// 1️⃣ Header (Fixed at Top)

// Minimal header bar pinned at the top with:

// ← back arrow (left)

// Book title (center)

// Small logo “KR” (right)

// Background: same teal tone as the desktop left panel.

// Height: ~60px

// Subtle shadow for separation from scroll content.

// 2️⃣ Book Overview Section (Collapsible Intro)

// Appears first before the review.

// Compact, scrollable horizontally or vertically:

// Book cover (centered)

// Title: Golden Son

// Author: Pierce Brown

// Genres (inline chips: Sci-Fi / Dystopia / Action)

// Last read: “4 months ago”

// Buy links (Amazon, etc.)

// After scrolling a bit, this section collapses or fades out, keeping focus on the review.

// 3️⃣ Main Review Section (Scrollable Body)

// This is the core scrollable area (like the middle column in desktop).

// Structure:

// Star rating row at top (centered)

// Review body text:

// Large stylized first letter “S”

// Paragraphs in readable width with dark background

// Highlight quotes (e.g., “Shit escalates.”) in orange italic

// Smooth padding and comfortable line height for phone reading.

// 4️⃣ “Similar Books” (End Section)

// At the bottom, after the main review:

// Title: Review of other similar books

// Horizontally scrollable card list (carousel style):

// Book cover

// Author

// Title (accent color)

// This gives a clean finish, instead of crowding the main scroll.

// 5️⃣ Color & Spacing Adjustments

// Backgrounds:

// Use dark charcoal (#1a1a1a) for main scroll area.

// Keep teal (#009b9b-ish) accents from left panel for small highlight bars or section dividers.

// Orange accent (#cc4b26) for titles and callouts.

// Typography:

// Use 16–18px body font.

// Maintain generous vertical spacing between sections for a “breathing” mobile feel.

// 🧭 Scroll Behavior

// Header fixed.

// Review scrolls vertically under it.

// Optional “Back to Top” floating button fades in near the bottom.
