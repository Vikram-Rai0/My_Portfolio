"use client";

import { useEffect, useRef } from "react";

/** Scrollable wrapper that starts scrolled to the right (latest weeks first). */
export default function ScrollToEnd({ children, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (node) node.scrollLeft = node.scrollWidth;
  }, []);

  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
}
