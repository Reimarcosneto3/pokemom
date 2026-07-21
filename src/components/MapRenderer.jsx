import "./styles.css";

export const MapRenderer = ({ mapData, tileSize }) => {
  const colunasDoMapa = mapData.width;
  const linhasDoMapa = mapData.height;
  const tamanhoDoBloco = tileSize;

  return (
    <>
      {mapData.layers.map((layerE, layerI) => {
        return (
          <div
            key={layerI}
            className="MapLayer"
            style={{
              width: `${colunasDoMapa * tamanhoDoBloco}px`,
              height: `${linhasDoMapa * tamanhoDoBloco}px`,

              gridTemplateColumns: `repeat(${colunasDoMapa}, ${tamanhoDoBloco}px)`,
              gridTemplateRows: `repeat(${linhasDoMapa}, ${tamanhoDoBloco}px)`,
              zIndex: (layerI + 1) * 10,
            }}
          >
            {layerE.data.map((data, index) => {
              const column = (index % colunasDoMapa) + 1;
              const row = Math.floor(index / colunasDoMapa) + 1;

              let spriteSheetColumns;
              let spriteSheetUrl;
              let transformStyle = "";

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

              const realData = data & 0xffff;

              mapData.tilesets.forEach((options) => {
                if (realData >= options.firstgid) {
                  spriteSheetColumns = options.columns;
                  spriteSheetUrl = options.image;
                }
              });

              const flipHorizontal = (data & 0x80000000) !== 0;
              const flipVertical = (data & 0x40000000) !== 0;
              const flipDiagonal = (data & 0x20000000) !== 0;

              if (flipHorizontal) transformStyle += "scaleX(-1) ";
              if (flipVertical) transformStyle += "scaleY(-1) ";
              if (flipDiagonal) transformStyle += "rotate(-90deg) scaleX(-1) ";

              const posX = ((realData % spriteSheetColumns) - 1) * 16;
              const posY = Math.floor(realData / spriteSheetColumns) * 16;

              return (
                <div
                  key={index}
                  style={{
                    backgroundImage: `url(${spriteSheetUrl})`,
                    imageRendering: "pixelated",
                    backgroundPosition: `-${posX}px -${posY}px`,
                    transformOrigin: "center",
                    transform: transformStyle.trim(),
                    backgroundRepeat: "no-repeat",
                    gridColumnStart: column,
                    gridRowStart: row,
                  }}
                ></div>
              );
            })}
          </div>
        );
      })}
    </>
  );
};
