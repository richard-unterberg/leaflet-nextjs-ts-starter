next.js starter for leaflet-react
---------------------------------

An extensible [next.js](https://nextjs.org/) starter kit for the [leaflet-react](https://react-leaflet.js.org/) map plugin. Template visually enhanced by [tailwind](https://tailwindcss.com/) and [lucide icons](https://lucide.dev/). ✨
Using the power of  [typescript](https://www.typescriptlang.org/) for better scalability.

## 🎇 Features

- 🏇 powered by the mighty next.js 13
- 🗺 leaflet-react no-ssr setup
- 🔗 next.js ready route nav module
- 😏 typescript + strict lint setup
- 🌤 modular demo content
- 🐛 custom marker icons
- 📚 marker categories
- 🥐 custom hooks for getting marker data and map context (thx [Flo301](https://github.com/Flo301))
- 🏡 custom ui components (locate me, center on markers)

## 🎇 Getting Started

First, fetch repo and depts (Once):
```bash
git clone https://github.com/richard-unterberg/next-leaflet-starter-typescript
# then
npm install
# or
yarn
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## 📊 Coming up

- custom marker categories
- marker cluster
- modified zoom in / zoom out (replace icons)
- global styling for map ui components
- fix error when setting new coordinates in hot reload "Map container is already initialized."
- create breakpoint hook synced with tailwind breakpoint which is usable in js

### 🤯 How to remove those damn linting rules

You can adjust the settings mainly in ```eslint.json``` and ```tsconfig.json```.

I've been using them a lot on my dayjob so I can't be anymore without them.

### 📝 Don't wanna use typscript at all?

See this nice javascript implementation  - My starter is heavily inspired by this one:
https://github.com/colbyfayock/next-leaflet-starter


Happy coding! ✌️👽
