const hitbox = Array.from({ length: 30 }, () => Array(30).fill(0));
const lista_de_blocos_com_colisão = [
  { x: 4, y: 1 },
  { x: 14, y: 3 },
  { x: 14, y: 4 },
  { x: 15, y: 4 },
];

for (let i = 2; i < 30; i++) {
  lista_de_blocos_com_colisão.push({ x: 3, y: i });
}
for (let i = 4; i < 30; i++) {
  lista_de_blocos_com_colisão.push({ x: i, y: 29 });
}

for (let i = 0; i < 30; i++) {
  lista_de_blocos_com_colisão.push({ x: 24, y: i });
}

for (let i = 5; i < 14; i++) {
  lista_de_blocos_com_colisão.push({ x: i, y: 2 });
}

for (let i = 0; i < 7; i++) {
  lista_de_blocos_com_colisão.push({ x: 16, y: i });
}

lista_de_blocos_com_colisão.forEach((element) => {
  hitbox[element.y][element.x] = 1;
});

export default hitbox;
