import { useEffect, useState } from "react";
import "./styles.css";

export const CharacterRenderer = ({
  fps,
  spriteSheetUrl,
  spriteSheetWidth,
  spriteSheetHeight,
  characterWidth,
  activeAnimationNumber,
  animationsData,
}) => {
  const [ticksCounter, setTicksCounter] = useState(0);

  const animationsNumber = Object.keys(animationsData).length;
  const framesNumber = spriteSheetWidth / characterWidth;
  const characterHeight = spriteSheetHeight / animationsNumber;

  const currentAnim = animationsData[activeAnimationNumber];
  const initialFrame = currentAnim.startsWith;

  const actualFramesCount = currentAnim.frameCount;
  let activeFrame = initialFrame;

  const totalTicks = Math.max(1, Math.floor((fps * fps) / 10));

  if (currentAnim.type === "idle") {
    const blinkDurationTicks = Math.max(3, Math.floor(totalTicks * 0.05));
    const blinkStartTick = totalTicks - blinkDurationTicks;

    if (currentAnim.direction === "linear") {
      if (ticksCounter < blinkStartTick) {
        activeFrame = initialFrame;
      } else {
        const blinkTicksElapsed = ticksCounter - blinkStartTick;

        const frameOffset = Math.floor(
          (blinkTicksElapsed / blinkDurationTicks) * actualFramesCount,
        );
        activeFrame =
          ((initialFrame - 1 + frameOffset) % actualFramesCount) + 1;
      }
    }

    if (currentAnim.direction === "ping-pong") {
      if (ticksCounter < blinkStartTick) {
        activeFrame = initialFrame;
      } else {
        const blinkTicksElapsed = ticksCounter - blinkStartTick;
        const totalLoopSteps = 2 * actualFramesCount - 2;

        const frameOffset = Math.floor(
          (blinkTicksElapsed / blinkDurationTicks) * totalLoopSteps,
        );
        const actualProgress = frameOffset % totalLoopSteps;

        activeFrame =
          actualFramesCount -
          1 -
          Math.abs(actualFramesCount - 1 - actualProgress) +
          1;
      }
    }
  }

  if (currentAnim.type === "walk") {
    if (currentAnim.direction === "linear") {
      const frameOffset = Math.floor(
        (ticksCounter / totalTicks) * 15 * actualFramesCount,
      );
      activeFrame = ((initialFrame - 1 + frameOffset) % actualFramesCount) + 1;
    }

    if (currentAnim.direction === "ping-pong") {
      const totalLoopSteps = 2 * actualFramesCount - 2;
      const frameOffset = Math.floor(
        (ticksCounter / totalTicks) * 15 * totalLoopSteps,
      );
      const actualProgress = frameOffset % totalLoopSteps;

      activeFrame =
        actualFramesCount -
        1 -
        Math.abs(actualFramesCount - 1 - actualProgress) +
        1;
    }
  }

  const posX = (activeFrame - 1) * characterWidth;
  const posY = (activeAnimationNumber - 1) * characterHeight;

  useEffect(() => {
    const intervalDelay = 1000 / fps;

    setTicksCounter(0);

    const interval = setInterval(() => {
      setTicksCounter((prevTicks) => (prevTicks + 1) % totalTicks);
    }, intervalDelay);

    return () => clearInterval(interval);
  }, [activeAnimationNumber, fps, totalTicks]);

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${spriteSheetUrl})`,
          imageRendering: "pixelated",
          backgroundPosition: `-${posX}px -${posY}px`,
          backgroundRepeat: "no-repeat",
          width: `${characterWidth}px`,
          height: `${characterHeight}px`,
        }}
      ></div>
    </>
  );
};
