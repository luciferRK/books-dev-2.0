import React from "react";
import { classNames } from "uixtra/utils";
import "./Img.scss";

export type ImgStatus =
  | "empty"
  | "deferred"
  | "loading"
  | "loaded"
  | "error";

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
    !src ? "empty" : loading === "lazy" ? "deferred" : "loading",
  );
  // Only fade in on a real download; a cached image is already visible, so
  // replaying the fade would make it blink (a "blip").
  const [reveal, setReveal] = React.useState(false);
  // Set true once the load is resolved synchronously (empty/cached) so the
  // later `onLoad` event (which also fires for cached images) skips the fade.
  const settledRef = React.useRef(false);

  const update = React.useCallback(
    (next: ImgStatus) => {
      setStatus(next);
      onStatusChange?.(next);
    },
    [onStatusChange],
  );

  // Keyed on `src` so changing it on a mounted <Img> resets the load state.
  // Runs before paint (and before the cached `load` event) so cached images are
  // marked settled before `onLoad` can trigger the fade.
  React.useLayoutEffect(() => {
    settledRef.current = false;
    const el = ref.current;
    if (!el) {
      return;
    }

    // No source: render nothing, no skeleton.
    if (!src) {
      settledRef.current = true;
      setReveal(false);
      update("empty");
      return;
    }

    // Cached image is already decoded: show it with no fade -> no blip.
    if (el.complete && el.naturalWidth > 0) {
      settledRef.current = true;
      setReveal(false);
      update("loaded");
      return;
    }

    // Reset for this src so the skeleton shows while it downloads.
    setReveal(false);
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
      src={src || undefined}
      className={classNames("img", className, `img-${status}`, {
        "img-reveal": reveal,
      })}
      loading={loading}
      style={ratio != null ? { aspectRatio: ratio, ...style } : style}
      onLoad={(event) => {
        // Skip the fade for images already resolved as cached in the effect.
        if (!settledRef.current) {
          setReveal(true);
          update("loaded");
        }
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
