typescript next.js starter kit for leaflet-react
===============

An extensible [next.js](https://nextjs.org/) starter kit archived with the [leaflet-react](https://react-leaflet.js.org/) map plugin. Template visually enhanced by [tailwind](https://tailwindcss.com/) and [lucide icons](https://lucide.dev/). ✨
Setup with [typescript](https://www.typescriptlang.org/) 👐.

Packed with useful components and hooks for using the map and create UI elements for next(.js) mapping projects.

### Table of Contents
1. [Features](#features)
2. [Getting started](#getting-started)
    1. [Breaking Changes](#breaking-changes)
    2. [Clone & Deploy with Github and Vercel](#clone-deploy)
    3. [Manual install](#manual-install)
3. [Start up](#start-up)
4. [Coming up (probably)](#coming-up)
6. [Remove / change linting rules](#disable-lint)
7. [WebGL?](#web-gl)
7. [No typescript?](#no-ts)

### <a id="features"></a> 🎇 Features

- 🏇 next.js 14 ("pages" routing)
- 😏 typescript + strict lint setup
- 🐛 custom markers
- 📄 custom popups
- 📚 marker categories
- 🫧 marker clustering
- ⚓️ context for map and leaflet instances
- 🏡 custom ui components (locate me, center on markers)

### <a id="getting-started"></a> 🏎 Getting Started

#### <a id="breaking-changes"></a> 💣 Breaking Changes introduced > v0.1.1

In Version v0.1.2 I changed the path aliases to be more consistent with the ES standards from `@alias` to `#alias`. If pulling the template from v0.1.1 you have to change the import paths in your components and pages.

```diff
- import { SomeComponent } from '@components/useMap'
+ import { SomeComponent } from '#components/useMap'
```

#### <a id="clone-deploy"></a> ⛴ Clone & Deploy with Github and Vercel

Create new Github repo with vercel and deploy it within minutes. Could not be easier as hitting some buttons. Shipping of private repos is possible.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frichard-unterberg%2Fnext-leaflet-starter-typescript)

Later: Check out your repo locally and run ```npm install``` or ```yarn``` in root

Follow Instructions for [Starting Up](#start-up)

#### <a id="manual-install"></a> ⚙️ Manual install

```bash
git clone https://github.com/richard-unterberg/next-leaflet-starter-typescript
# then
npm install
# or
yarn
```

### <a id="start-up"></a> 🏍️ Start up

According the official [Next.js Docs](https://nextjs.org/docs/getting-started):

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Building with type checking and linting

```bash
npm run build
# or
yarn build
```

Start build locally

```bash
npm run start
# or
yarn start
```

### <a id="coming-up"></a> 📊 Upcoming (probably)

+ redesign zoom in / zoom out
+ atom components for map ui
+ fix error when setting new coordinates in hot reload "Map container is already initialized."
+ breakpoint hook synced with tailwind breakpoint which is usable in js
+ multiple map instances per page
+ add some data & experiments with more data

- **Feel free to contribute!** 🤗

### <a id="disable-lint"></a> 🤯 How to remove those  linting rules?

You can adjust the settings mainly in ```eslint.json``` and ```tsconfig.json```.

I've been using them a lot on my dayjob and I can't be anymore without them. 🥲

### <a id="web-gl"></a> 👽 Web GL based mapping project

leafleft, graphic-based tile rendering or rasterized zoom levels are not smooth enough and you are in for crazy fast WebGL mapping? Here's my [maplibre next.js ts starter kit](https://github.com/richard-unterberg/maplibre-nextjs-ts-starter)

### <a id="no-ts"></a> 📝 Don't wanna use typscript at all?

See this nice javascript implementation - This repo is inspired by:
https://github.com/colbyfayock/next-leaflet-starter

Happy coding! ✌️👽
