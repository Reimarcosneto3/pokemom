import { useEffect, useState, useRef } from "react";
import "./index.css";
import movim from "./scripts/index.js";
import { Map } from "./scenes/nuvema_town/Map";
import { Player } from "./components/Player";

function App() {
  const cameraRef = useRef(null);

  const [mapDimensions, setMapDimensions] = useState({
    widthPx: 0,
    heightPx: 0,
  });

  const [characterPosition, setCharacterPosition] = useState({
    x: 14,
    y: 15,
  });
    const [cameraSize, setCameraSize] = useState({
    width: 0,
    height:0,
  });
  useEffect(() => {
    if (cameraRef.current){
      setCameraSize({
        width: cameraRef.current.clientWidth,
        height:cameraRef.current.clientHeight,
      })
    }
  }, []);

  // Use a state or ref to track viewport if it needs to update on resize

  const TILE_SIZE = 16;
  const SCALE = 3;

  // Calculate visual positions outside of useEffect so they are available to JSX
  const visualX = Math.max(Math.min(-(characterPosition.x * TILE_SIZE +TILE_SIZE / 2 -cameraSize.width / (2 * SCALE)),0),-(mapDimensions.widthPx - cameraSize.width / SCALE));

  const visualY = Math.max(Math.min(-(characterPosition.y * TILE_SIZE +TILE_SIZE / 2 -cameraSize.height / (2 * SCALE)),0),
  -(mapDimensions.heightPx - cameraSize.height / SCALE));

  useEffect(() => {movim(setCharacterPosition);}, []);

  return (
    <div className="GameCamera" ref={cameraRef}>
      <div
        className="World"
        style={{
          width: `${mapDimensions.widthPx}px`,
          height: `${mapDimensions.heightPx}px`,
          // Ensure you use the variables calculated above
          transform: `scale(${SCALE}) translate3d(${visualX}px, ${visualY}px, 0)`,
          transformOrigin: "top left",
        }}
      >
        <Player
          posX={characterPosition.x}
          posY={characterPosition.y}
          tileSize={TILE_SIZE}
        />
        <Map tileSize={TILE_SIZE} onMapLoaded={setMapDimensions} />
      </div>
    </div>
  );
}

export default App;
