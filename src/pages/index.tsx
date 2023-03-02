import { Leaf } from 'lucide-react'
import Link from 'next/link'

import { AppColor, MapConfig } from '@lib/AppConfig'

import NavMenu from '@components/common/NavMenu'

const Home = () => (
  <div className="container mx-auto max-w-2xl max-md:max-w-none p-3">
    <header className="mt-10 items-top gap-4 md:flex">
      <Leaf size={MapConfig.ui.bigIconSize} color={AppColor.primary.hex} className="mt-2" />
      <div>
        <h2 className="text-4xl font-bold ">Next.js starter for leaflet-react</h2>
        <h3 className="text-3xl mb-16">written in Typescript</h3>
      </div>
    </header>
    <section>
      <p className="mb-2">
        <span>An extensible </span>
        <Link className={AppColor.primary.tw.text} target="_blank" href="https://nextjs.org/">
          next.js
        </Link>
        <span> starter for the </span>
        <Link className={AppColor.primary.tw.text} target="_blank" href="https://react-leaflet.js.org/">
          leaflet-react
        </Link>
        <span> plugin. Written in </span>
        <Link className={AppColor.primary.tw.text} target="_blank" href="https://www.typescriptlang.org/">
          typescript
        </Link>
        <span>, visually enhanced by </span>
        <Link className={AppColor.primary.tw.text} target="_blank" href="https://tailwindcss.com/">
          tailwind
        </Link>
        <span> and </span>
        <Link className={AppColor.primary.tw.text} target="_blank" href="https://lucide.dev/">
          lucide icons
        </Link>
        <span>. ✨</span>
      </p>
      <p className="my-3">
        <span> 🤝 Free to contribute on </span>
        <Link
          href="https://github.com/richard-unterberg/typescript-next-leaflet-starter"
          className={AppColor.primary.tw.text}
        >
          Github
        </Link>
      </p>
    </section>
    <section className="grid grid-cols-1 md:grid-cols-2">
      <div>
        <h3 className="text-xl my-5">Demo Content</h3>
        <NavMenu />
      </div>
    </section>
    <footer className={`mt-16 flex justify-between p-3 rounded ${AppColor.light.tw.bg} text-sm`}>
      <div>
        2023, some rights reserved <br />
        <Link
          href="https://github.com/richard-unterberg/typescript-next-leaflet-starter"
          className={AppColor.primary.tw.text}
        >
          typescript-next-leaflet-starter
        </Link>
      </div>
      <div>
        <Leaf size={MapConfig.ui.mapIconSize} color={AppColor.primary.hex} className="mt-2" />
      </div>
    </footer>
  </div>
)

export default Home
