"use client";

import { useEffect } from "react";

/** Only track cursor on devices with fine pointer (desktop). Touch devices need zero overlay interference. */
export default function CustomCursor() {
  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const hoverCapable = window.matchMedia("(hover: hover)").matches;
    if (!finePointer || !hoverCapable) return;

    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    cursor.setAttribute("aria-hidden", "true");
    document.body.appendChild(cursor);

    const onMove = (event: MouseEvent) => {
      cursor.style.transform = `translate(${event.clientX - 8}px, ${event.clientY - 8}px)`;
    };

    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cursor.remove();
    };
  }, []);

  return null;
}
