
import React, { useEffect, useRef } from "react";

interface ReceiptCameraFrameProps {
  isCameraReady: boolean;
  error: string | null;
  videoRef: React.RefObject<HTMLVideoElement>;
  isDarkMode: boolean;
}

const EDGE = 20; // margin from each side
const RADIUS = 17; // match border radius of container

/**
 * This frame ensures the yellow lines hug the exact rounded edges of the visible video,
 * respecting both margin (EDGE) and border-radius (RADIUS), with perfect alignment.
 */
const ReceiptCameraFrame: React.FC<ReceiptCameraFrameProps> = ({
  isCameraReady,
  error,
  videoRef,
  isDarkMode,
}) => {
  // Hardcoded sizes MUST exactly match the ones in page for visual consistency:
  const FRAME_WIDTH = 340;
  const FRAME_HEIGHT = 400;

  // The inner frame (video & overlay) is EDGE*2 smaller in both dimensions from the main container
  const innerWidth = FRAME_WIDTH - EDGE * 2;
  const innerHeight = FRAME_HEIGHT - EDGE * 2;

  return (
    <div
      className="absolute left-[20px] top-[20px] w-[calc(100%-40px)] h-[calc(100%-40px)] rounded-[17px] bg-black flex items-center justify-center overflow-hidden z-0"
      style={{
        width: innerWidth,
        height: innerHeight,
        borderRadius: RADIUS,
      }}
    >
      {/* Video actual camera */}
      <video
        ref={videoRef}
        className="w-full h-full object-contain rounded-[17px] transition-opacity duration-200 bg-[#181818] min-h-0"
        autoPlay
        playsInline
        muted
        aria-label="Camera preview"
        style={{
          opacity: isCameraReady ? 1 : 0,
          borderRadius: RADIUS,
        }}
      />
      {/* Overlays */}
      {!isCameraReady && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white font-medium text-center z-30 text-base rounded-[17px]">
          Loading camera...
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white font-medium text-center z-30 px-4 rounded-[17px]">
          {error}
        </div>
      )}
      {/* Overlay Instruction */}
      {isCameraReady && !error && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 px-3 py-[6px] rounded-full text-[15px] text-white font-medium z-20 pointer-events-none select-none shadow-sm">
          Position receipt in frame
        </div>
      )}
      {/* SVG rounded corner boundaries, aligned INSIDE */}
      <svg
        width={innerWidth}
        height={innerHeight}
        viewBox={`0 0 ${innerWidth} ${innerHeight}`}
        className="absolute pointer-events-none select-none z-10"
        style={{
          top: 0, left: 0, position: "absolute",
        }}
      >
        {/* All corners: Draw short corner arcs hugging the inner rounded rectangle. */}
        {/* Top Left */}
        <path
          d={`M${RADIUS},8 Q8,8 8,${RADIUS}`} // horizontal then vertical arc
          stroke="#F7A900"
          strokeWidth="5"
          fill="none"
        />
        {/* Top Right */}
        <path
          d={`M${innerWidth - RADIUS},8 Q${innerWidth - 8},8 ${innerWidth - 8},${RADIUS}`}
          stroke="#F7A900"
          strokeWidth="5"
          fill="none"
        />
        {/* Bottom Left */}
        <path
          d={`M8,${innerHeight - RADIUS} Q8,${innerHeight - 8} ${RADIUS},${innerHeight - 8}`}
          stroke="#F7A900"
          strokeWidth="5"
          fill="none"
        />
        {/* Bottom Right */}
        <path
          d={`M${innerWidth - 8},${innerHeight - RADIUS} Q${innerWidth - 8},${innerHeight - 8} ${innerWidth - RADIUS},${innerHeight - 8}`}
          stroke="#F7A900"
          strokeWidth="5"
          fill="none"
        />
      </svg>
    </div>
  );
};

export default ReceiptCameraFrame;
