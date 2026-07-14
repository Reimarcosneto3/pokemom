import { useEffect, useState, useRef } from "react";

import { Map } from "./scenes/nuvema_town/Map";
import { Player } from "./components/Player";

import movim from "./scripts/movimento.js";
import "./index.css";

function App() {
  const cameraRef = useRef(null);

  const TILE_SIZE = 16;
  const SCALE = 3;
  const FPS = 120;

  const [mapDimensions, setMapDimensions] = useState({
    widthPx: 0,
    heightPx: 0,
  });
  const [cameraSize, setCameraSize] = useState({
    width: 0,
    height: 0,
  });
  const [playerPosition, setPlayerPosition] = useState({
    x: 14,
    y: 18,
    direction: "down",
    moving: false,
  });

  useEffect(() => {
    if (cameraRef.current) {
      setCameraSize({
        width: cameraRef.current.clientWidth,
        height: cameraRef.current.clientHeight,
      });
    }

    const clearMovim = movim(setPlayerPosition, FPS);

    return () => {
      clearMovim();
    };
  }, []);

  const visualX = Math.max(
    Math.min(
      -(
        playerPosition.x * TILE_SIZE +
        TILE_SIZE / 2 -
        cameraSize.width / (2 * SCALE)
      ),
      0,
    ),
    -(mapDimensions.widthPx - cameraSize.width / SCALE),
  );

  const visualY = Math.max(
    Math.min(
      -(
        playerPosition.y * TILE_SIZE +
        TILE_SIZE / 2 -
        cameraSize.height / (2 * SCALE)
      ),
      0,
    ),
    -(mapDimensions.heightPx - cameraSize.height / SCALE),
  );

  return (
    <div className="GameCamera" ref={cameraRef}>
      <div
        className="World"
        style={{
          width: `${mapDimensions.widthPx}px`,
          height: `${mapDimensions.heightPx}px`,
          transform: `scale(${SCALE}) translate3d(${visualX}px, ${visualY}px, 0)`,
          transformOrigin: "top left",
        }}
      >
        <Player
          playerPosition={playerPosition}
          tileSize={TILE_SIZE}
          fps={FPS}
        />
        <Map tileSize={TILE_SIZE} onMapLoaded={setMapDimensions} />
      </div>
    </div>
  );
}

export default App;
