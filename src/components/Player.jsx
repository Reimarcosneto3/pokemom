import "./styles.css";

export const Player = ({ posX, posY, tileSize }) => {
  const visualX = posX * tileSize;
  const visualY = posY * tileSize;
  const offsetY = tileSize;

  return (
    <div
      className="PlayerContainer"
      style={{
        transform: `translate3d(${visualX}px, ${visualY - offsetY}px, 0)`,
        zIndex: 25,
      }}
    />
  );
};
