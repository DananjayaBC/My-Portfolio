"use client";

import React from "react";

/**
 * Animated, performance-friendly smoke background using blurred radial gradients.
 * Pure CSS animations, respects reduced motion, and does not intercept pointer events.
 */
export default function SmokeBackground(): JSX.Element {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 smoke-container"
    >
      {/* Layered drifting blobs to emulate soft smoke/fog */}
      <div
        className="smoke-layer smoke--purple animate-smoke-a"
        style={{ width: "70vmax", height: "70vmax", top: "-10%", left: "-15%" }}
      />
      <div
        className="smoke-layer smoke--blue animate-smoke-b"
        style={{
          width: "65vmax",
          height: "65vmax",
          bottom: "-15%",
          right: "-10%",
        }}
      />
      <div
        className="smoke-layer smoke--pink animate-smoke-c"
        style={{ width: "55vmax", height: "55vmax", top: "20%", right: "15%" }}
      />
      <div
        className="smoke-layer smoke--white animate-smoke-d"
        style={{
          width: "60vmax",
          height: "60vmax",
          bottom: "10%",
          left: "25%",
        }}
      />
    </div>
  );
}
