import { useEffect } from "react";

/**
 *
 *
 */
export const useEventListenerScrolled = (
  elem: HTMLDivElement | null,
  callback: () => void
) => {
  useEffect(() => {
    elem?.addEventListener?.("scrollend", callback);

    return () => {
      elem?.removeEventListener?.("scrollend", callback);
    };
  }, [callback, elem]);
};
