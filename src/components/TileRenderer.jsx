import { memo, useEffect, useMemo, useState } from "react";

export const StaticTile = memo(
  ({ posX, posY, spriteSheetUrl, transformStyle, column, row }) => {
    return (
      <div
        style={{
          backgroundImage: `url(${spriteSheetUrl})`,
          imageRendering: "pixelated",
          backgroundPosition: `-${posX}px -${posY}px`,
          transformOrigin: "center",
          transform: transformStyle,
          backgroundRepeat: "no-repeat",
          gridColumnStart: column,
          gridRowStart: row,
          willChange: "transform",
        }}
      />
    );
  },
);

export const AnimatedTile = memo(
  ({
    animationFrames,
    spriteSheetUrl,
    spriteSheetColumns,
    transformStyle,
    column,
    row,
    layerZIndex,
    globalTick,
    tickIntervalMs = 100,
  }) => {
    const { frameRanges, totalCycleTicks } = useMemo(() => {
      let accumulatedTicks = 0;
      const ranges = animationFrames.map((frame) => {
        const frameDuration = frame.duration || 100;
        const ticksForThisFrame = Math.max(
          1,
          Math.round(frameDuration / tickIntervalMs),
        );
        const startTick = accumulatedTicks;
        accumulatedTicks += ticksForThisFrame;
        return { ...frame, startTick, ticksForThisFrame };
      });
      return { frameRanges: ranges, totalCycleTicks: accumulatedTicks };
    }, [animationFrames, tickIntervalMs]);

    const totalLoopSteps = Math.max(1, 2 * totalCycleTicks - 2);
    const currentLoopProgress = globalTick % totalLoopSteps;
    const pingPongTick =
      totalCycleTicks - 1 - Math.abs(totalCycleTicks - 1 - currentLoopProgress);

    const currentFrame =
      frameRanges.find(
        (f) =>
          pingPongTick >= f.startTick &&
          pingPongTick < f.startTick + f.ticksForThisFrame,
      ) || animationFrames[0];

    const currentTileId = currentFrame.tileid;
    const posX = (currentTileId % spriteSheetColumns) * 16;
    const posY = Math.floor(currentTileId / spriteSheetColumns) * 16;

    return (
      <div
        style={{
          backgroundImage: `url(${spriteSheetUrl})`,
          imageRendering: "pixelated",
          backgroundPosition: `-${posX}px -${posY}px`,
          transformOrigin: "center",
          transform: transformStyle,
          backgroundRepeat: "no-repeat",
          gridColumnStart: column,
          gridRowStart: row,
          zIndex: layerZIndex,
        }}
      />
    );
  },
);
