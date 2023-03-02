import { Leaf } from 'lucide-react'
import Link from 'next/link'

import { AppColor, MapConfig } from '@lib/AppConfig'

import NavMenu from '@components/common/NavMenu'

const Home = () => (
  <div className="container mx-auto max-w-2xl max-md:max-w-none p-3">
    <header className="mt-20 items-top gap-3 md:flex">
      <Leaf size={MapConfig.ui.bigIconSize} color={AppColor.primary.hex} className="mt-2" />
      <div>
        <h2 className="text-4xl font-bold ">Leaflet Starter for Next.js</h2>
        <h3 className="text-3xl mb-10">written in Typescript</h3>
      </div>
    </header>
    <section>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat.
      </p>
      <h3 className="text-xl my-5">Navigation</h3>
      <NavMenu />
    </section>
    <footer className="mt-10 flex justify-between">
      <div>
        2023, some rights reserved <br />
        <Link href="https://github.com/richard-unterberg/" className={AppColor.primary.tw.text}>
          Richard Unterberg
        </Link>
      </div>
      <div>
        <Leaf size={MapConfig.ui.mapIconSize} color={AppColor.primary.hex} className="mt-2" />
      </div>
    </footer>
  </div>
)

export default Home
