<!-- markdownlint-disable-file MD033 -->

<h1 align="center">Fangame de Pokemon Black<picture><img width="32px" src="./public/favicon.ico" alt="icone de pokémon black"/></picture></h1>

<table>
    <tr>
        <td>
        <picture><img src="./repo/reshiram.webp" alt="Icone pokémon black" /></picture>
        </td>
        <td>
        <picture><img src="./repo/banner.png" alt="banner de pokémon black" /></picture>
        </td>
    </tr>
</table>

#### Data de início: **@22/06/2026**

> Após o grande desenvolvedor [@Reimarcosneto3](https://github.com/Reimarcosneto3), ter seu primeiro insight do ano, ele chamou 5 desenvolvedores para trabalharem com ele em seu projeto.

<picture>![Status](https://img.shields.io/badge/status-Em%20Desenvolvimento-yellow)</picture>
[![Vite](https://img.shields.io/badge/Vite-8.1.0-magenta?logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.2.7-blue?logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-24.18.0-green?logo=node.js)](https://nodejs.org/)

---

## 📁 Arquiterura do projeto

<table>
    <tr>
        <td>
<h6>
<pre>
<code>
📁 root
├── 📁 public
│   ├── 📁 assets
│   │   ├── 📁 static
│   │   │   ├── 📁 spritesheets
│   │   │   │   ├── 🖼️ hilbert_spritesheet.png
│   │   │   │   └── ...
│   │   │   └── 📁 tilesets
│   │   │       ├── 🖼️ pier_and_roads.png
│   │   │       └── ...
│   │   └── 📁 sound
│   │       ├── nuvema_town_bg.ogg
│   │       └── ...
│   └── 📄 favicon.ico
├── 📁 src
│   ├── 📁 components
│   │   ├── 📄 CharacterRenderer.jsx
│   │   ├── ...
│   │   └── 🎨 styles.css
│   ├── 📁 scenes
│   │   ├── 📁 nuvema_town
│   │   │   ├── 📄 Map.jsx
│   │   │   ├── 📄 hitbox.js
│   │   │   └── ⚙️ nuvema_town.json
│   │   └── ...
│   ├── 📁 scripts
│   │   ├── 📄 movimento.js
│   │   └── ...
│   ├── 📄 App.jsx
│   ├── 🎨 index.css
│   └── 📄 main.jsx
├── ⚙️ .gitignore
├── 📝 README.md
├── 🌐 index.html
├── ⚙️ package-lock.json
├── ⚙️ package.json
└── 📄 vite.config.js
</code>
</pre>
</h6>
        </td>
        <td>
    <ol>
        <li><strong>Informações do jogo:</strong>
            <ul>
                <li><strong>Estilo de jogo:</strong> top-down.</li>
                <li><strong>Gênero de jogo:</strong> Jogo de Turno.</li>
                <li><strong>Estética:</strong> pixel art.</li>
            </ul>
        </li>
        <li><strong>Informações do Projeto:</strong>
            <ul>
                <li><strong>Linguagem:</strong> JavaScript + React (JSX).</li>
                <li><strong>Versão do Node.js:</strong> 24.18.0 (LTS).</li>
                <li><strong>Ambiente de Desenvolvimento:</strong> Vite 8.1.0</li>
            </ul>
        </li>
        <li><strong>Ferramentas:</strong>
            <ul>
                <li><strong>Tiled:</strong> utilizado para criação dos cenários.</li>
                <li><strong>Aseprite:</strong> utilizado para a criação dos sprites.</li>
            </ul>
        </li>
    </ol>
        </td>
    </tr>
</table>

[![Tiled](https://img.shields.io/badge/Tiled-Map%20Editor-blue?logo=telegraph&logoColor=white)](https://www.mapeditor.org/)
[![Aseprite](https://img.shields.io/badge/Aseprite-Pixel%20Art-eb5e28?logo=aseprite&logoColor=white)](https://www.aseprite.org/)

## 📁 Instalação e Execução

### Requisitos

- Node.js 24.18.0+
- Ambiente de terminal (Linux, macOS ou Windows)

### Passos

#### Baixar o repositorio do GitHub

```bash
git clone https://github.com/Reimarcosneto3/pokemom.git

cd pokemom
```

#### Instalar dependencias e rodar script de desenvolvimento

```bash
npm install

npm run dev
```

---

## 👥 Desenvolvido por

| Avatar                                                                       | Nome                 | GitHub                                                 |
| ---------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------ |
| <img src="https://avatars.githubusercontent.com/u/274339477?v=4" width="60"> | **João-Vitor**       | [@jotavn-dev](https://github.com/jotavn-dev)           |
| <img src="https://avatars.githubusercontent.com/u/170953106?v=4" width="60"> | **Lucas Ximenes**    | [@Ximenes2007](https://github.com/Ximenes2007)         |
| <img src="https://avatars.githubusercontent.com/u/162238592?v=4" width="60"> | **Marcondes_Paixão** | [@Junior010101](https://github.com/Junior010101)       |
| <img src="https://avatars.githubusercontent.com/u/184113392?v=4" width="60"> | **Marcos**           | [@Reimarcosneto3](https://github.com/Reimarcosneto3)   |
| <img src="https://avatars.githubusercontent.com/u/211912997?v=4" width="60"> | **Santos**           | [@tgs4ntos](https://github.com/tgs4ntos)               |
| <img src="https://avatars.githubusercontent.com/u/277160569?v=4" width="60"> | **Layme**            | [@thiagolayme1966](https://github.com/thiagolayme1966) |
