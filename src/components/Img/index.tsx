import React from "react";
import { classNames } from "uixtra/utils";
import "./Img.scss";

export type ImgStatus = "deferred" | "loading" | "loaded" | "error";

interface ImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Notified whenever the load status changes. */
  onStatusChange?: (status: ImgStatus) => void;
  /** `width / height`. Derives the width from a fixed height so the skeleton is sized before load. */
  ratio?: number;
}

/**
 * Image that tracks its own load state, exposed as a class
 * (`img-deferred | img-loading | img-loaded | img-error`) for the skeleton.
 * Eager images start `loading`; lazy images start `deferred` and become
 * `loading` once they near the viewport.
 */
const Img: React.FC<ImgProps> = ({
  className,
  onStatusChange,
  onLoad,
  onError,
  loading = "eager",
  ratio = 0.65,
  style,
  src,
  ...imgProps
}) => {
  const ref = React.useRef<HTMLImageElement>(null);
  const [status, setStatus] = React.useState<ImgStatus>(
    loading === "lazy" ? "deferred" : "loading",
  );

  const update = React.useCallback(
    (next: ImgStatus) => {
      setStatus(next);
      onStatusChange?.(next);
    },
    [onStatusChange],
  );

  // Keyed on `src` so changing it on a mounted <Img> resets the load state.
  React.useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }

    // Cached image may finish before `onLoad` attaches.
    if (el.complete && el.naturalWidth > 0) {
      update("loaded");
      return;
    }

    // Reset for this src so the skeleton shows while it downloads.
    update(loading === "lazy" ? "deferred" : "loading");

    // Lazy: flip `deferred` -> `loading` when it nears the viewport.
    if (loading === "lazy" && typeof IntersectionObserver !== "undefined") {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            setStatus((current) =>
              current === "deferred" ? "loading" : current,
            );
            observer.disconnect();
          }
        },
        { rootMargin: "200px" },
      );

      observer.observe(el);
      return () => observer.disconnect();
    }
  }, [src, loading, update]);

  return (
    <img
      {...imgProps}
      ref={ref}
      src={src}
      className={classNames("img", className, `img-${status}`)}
      loading={loading}
      style={ratio != null ? { aspectRatio: ratio, ...style } : style}
      onLoad={(event) => {
        update("loaded");
        onLoad?.(event);
      }}
      onError={(event) => {
        update("error");
        onError?.(event);
      }}
    />
  );
};

export default Img;
