import hitbox from "../scenes/nuvema_town/hitbox";

function movim(setPlayerPosition, fps) {
  const keys = {
    w: false,
    s: false,
    a: false,
    d: false,
  };
  const FPS = fps;

  let interval = null;

  const handleKeyDown = (e) => {
    const key = e.key.toLowerCase();

    if (key in keys) {
      keys[key] = true;
    }
  };

  const handleKeyUp = (e) => {
    const key = e.key.toLowerCase();

    if (key in keys) {
      keys[key] = false;
    }
  };

  const move = () => {
    setPlayerPosition((pos) => {
      let x = pos.x;
      let y = pos.y;

      let moving = false;
      let direction = pos.direction || "down";

      if (keys.w) {
        direction = "up";
        moving = true;
        if (hitbox[y - 1]?.[x] === 0) y--;
      } else if (keys.s) {
        direction = "down";
        moving = true;
        if (hitbox[y + 1]?.[x] === 0) y++;
      } else if (keys.a) {
        direction = "left";
        moving = true;
        if (hitbox[y]?.[x - 1] === 0) x--;
      } else if (keys.d) {
        direction = "right";
        moving = true;
        if (hitbox[y]?.[x + 1] === 0) x++;
      }

      return { x, y, direction, moving };
    });
  };

  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);

  interval = setInterval(move, FPS);

  return () => {
    document.removeEventListener("keydown", handleKeyDown);
    document.removeEventListener("keyup", handleKeyUp);
    clearInterval(interval);
  };
}

export default movim;
