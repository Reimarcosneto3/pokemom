import { CharacterRenderer } from "./CharacterRenderer";
import "./styles.css";

export const Player = ({ playerPosition, tileSize, fps }) => {
  const { x, y, direction, moving } = playerPosition;

  const visualX = x * tileSize;
  const visualY = y * tileSize;
  const offsetY = tileSize;

  let activeAnimationNumber = 1;

  if (direction === "down") {
    activeAnimationNumber = moving ? 2 : 1;
  } else if (direction === "up") {
    activeAnimationNumber = moving ? 8 : 7;
  } else if (direction === "right") {
    activeAnimationNumber = moving ? 6 : 5;
  } else if (direction === "left") {
    activeAnimationNumber = moving ? 4 : 3;
  }

  return (
    <div
      className="PlayerContainer"
      style={{
        transform: `translate3d(${visualX}px, ${visualY - offsetY}px, 0)`,
        zIndex: 25,
      }}
    >
      <CharacterRenderer
        fps={fps}
        spriteSheetUrl={"\/assets\/static\/hilbert_spritesheet.png"}
        spriteSheetWidth={64}
        spriteSheetHeight={256}
        characterWidth={tileSize}
        activeAnimationNumber={activeAnimationNumber}
        animationsData={{
          1: {
            direction: "ping-pong",
            frameCount: 3,
            startsWith: 1,
            type: "idle",
          },
          2: {
            direction: "ping-pong",
            frameCount: 4,
            startsWith: 2,
            type: "walk",
          },
          3: {
            direction: "ping-pong",
            frameCount: 3,
            startsWith: 1,
            type: "idle",
          },
          4: {
            direction: "ping-pong",
            frameCount: 4,
            startsWith: 2,
            type: "walk",
          },
          5: {
            direction: "ping-pong",
            startsWith: 1,
            frameCount: 3,
            type: "idle",
          },
          6: {
            direction: "ping-pong",
            frameCount: 4,
            startsWith: 2,
            type: "walk",
          },
          7: {
            direction: "ping-pong",
            frameCount: 2,
            startsWith: 1,
            type: "idle",
          },
          8: {
            direction: "ping-pong",
            frameCount: 4,
            startsWith: 2,
            type: "walk",
          },
        }}
      />
    </div>
  );
};
