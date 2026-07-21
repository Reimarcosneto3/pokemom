import { useEffect, useMemo, useState } from "react";
import { AnimatedTile, StaticTile } from "./TileRenderer";
import "./styles.css";

export const MapRenderer = ({ mapData, tileSize }) => {
  const [mapTick, setMapTick] = useState(0);
  const TICK_INTERVAL_MS = 100;

  const colunasDoMapa = mapData.width;
  const linhasDoMapa = mapData.height;
  const tamanhoDoBloco = tileSize;

  useEffect(() => {
    const interval = setInterval(() => {
      setMapTick((prev) => prev + 1);
    }, TICK_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  const animacoesMapeadas = useMemo(() => {
    const mapa = {};

    mapData.tilesets.forEach((tileset) => {
      if (tileset.tiles) {
        tileset.tiles.forEach((tileInfo) => {
          if (tileInfo.animation) {
            const idGlobal = tileInfo.id + tileset.firstgid;
            mapa[idGlobal] = tileInfo.animation;
          }
        });
      }
    });
    return mapa;
  }, [mapData]);

  const obterDadosTileset = useMemo(() => {
    return (realData) => {
      let spriteSheetColumns;
      let spriteSheetUrl;
      let firstgid = 1;

      for (let i = mapData.tilesets.length - 1; i >= 0; i--) {
        const options = mapData.tilesets[i];
        if (realData >= options.firstgid) {
          spriteSheetColumns = options.columns;
          spriteSheetUrl = options.image;
          firstgid = options.firstgid;
          break;
        }
      }
      return { spriteSheetColumns, spriteSheetUrl, firstgid };
    };
  }, [mapData]);

  return (
    <>
      {mapData.layers.map((layerE, layerI) => {
        const layerZIndex = (layerI + 1) * 10;

        return (
          <div
            key={layerI}
            className="MapLayer"
            style={{
              width: `${colunasDoMapa * tamanhoDoBloco}px`,
              height: `${linhasDoMapa * tamanhoDoBloco}px`,
              gridTemplateColumns: `repeat(${colunasDoMapa}, ${tamanhoDoBloco}px)`,
              gridTemplateRows: `repeat(${linhasDoMapa}, ${tamanhoDoBloco}px)`,
              zIndex: layerZIndex,
            }}
          >
            {layerE.data.map((data, index) => {
              const column = (index % colunasDoMapa) + 1;
              const row = Math.floor(index / colunasDoMapa) + 1;
              const realData = data & 0xffff;

              if (data == 0) {
                return (
                  <div
                    key={index}
                    style={{
                      backgroundColor: "transparent",
                      gridColumnStart: column,
                      gridRowStart: row,
                    }}
                  ></div>
                );
              }

              const { spriteSheetColumns, spriteSheetUrl, firstgid } =
                obterDadosTileset(realData);

              let transformStyle = "";
              const flipHorizontal = (data & 0x80000000) !== 0;
              const flipVertical = (data & 0x40000000) !== 0;
              const flipDiagonal = (data & 0x20000000) !== 0;

              if (flipHorizontal) transformStyle += "scaleX(-1) ";
              if (flipVertical) transformStyle += "scaleY(-1) ";
              if (flipDiagonal) transformStyle += "rotate(-90deg) scaleX(-1) ";

              const animacao = animacoesMapeadas[realData];

              if (animacao) {
                return (
                  <AnimatedTile
                    key={index}
                    animationFrames={animacao}
                    spriteSheetUrl={spriteSheetUrl}
                    spriteSheetColumns={spriteSheetColumns}
                    transformStyle={transformStyle.trim()}
                    column={column}
                    row={row}
                    layerZIndex={layerZIndex}
                    globalTick={mapTick}
                    tickIntervalMs={TICK_INTERVAL_MS}
                  />
                );
              }

              const localId = realData - firstgid;
              const posX = (localId % spriteSheetColumns) * tamanhoDoBloco;
              const posY =
                Math.floor(localId / spriteSheetColumns) * tamanhoDoBloco;

              return (
                <StaticTile
                  key={index}
                  posX={posX}
                  posY={posY}
                  spriteSheetUrl={spriteSheetUrl}
                  transformStyle={transformStyle.trim()}
                  column={column}
                  row={row}
                />
              );
            })}
          </div>
        );
      })}
    </>
  );
};
