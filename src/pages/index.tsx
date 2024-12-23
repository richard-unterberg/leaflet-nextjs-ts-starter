import { Leaf } from 'lucide-react'
import Head from 'next/head'
import Link from 'next/link'
import rc from 'react-classmate'

import NavMenu from '#components/common/NavMenu'
import { AppConfig } from '#lib/AppConfig'

const PageContainer = rc.div`
  container
  p-3
  mx-auto
  max-w-2xl
  max-md:max-w-none
`

const PageHeader = rc.header`
  items-top
  mt-10
  gap-4
  md:flex
`

const PageContent = rc.main`
  flex
  flex-col
  gap-4
`

const PageNav = rc.nav`
  grid
  grid-cols-1
  md:grid-cols-2
`

const PageFooter = rc.footer`
  mt-16
  flex
  justify-between
  rounded
  bg-light
  p-3
  text-sm
`

const StyledLink = rc.extend(Link)`
  text-primary
`

const Home = () => (
  <PageContainer>
    <Head>
      <title>Jumpstart your new leaflet mapping Project with next.js and typescript 🤩</title>
      <meta
        property="og:title"
        content="Jumpstart your new leaflet mapping Project with next.js and typescript 🤩"
        key="title"
      />
      <meta
        name="description"
        content="next-leaflet-starter-typescript is an extensible next.js starter template for the leaflet-maps-react plugin. Written in typescript,
      visually enhanced by tailwind and lucide-react icons."
      />
    </Head>
    <PageHeader>
      <span className="text-primary">
        <Leaf size={AppConfig.ui.bigIconSize} className="mt-2" />
      </span>
      <div>
        <h2 className="text-4xl font-bold ">Next.js starter for leaflet-react</h2>
        <h3 className="mb-16 text-3xl">written in Typescript</h3>
      </div>
    </PageHeader>
    <PageContent>
      <p>
        <span>An extensible </span>
        <StyledLink target="_blank" href="https://nextjs.org/">
          next.js
        </StyledLink>
        <span> starter for the </span>
        <StyledLink target="_blank" href="https://react-leaflet.js.org/">
          leaflet-react
        </StyledLink>
        <span> plugin. Written in </span>
        <StyledLink target="_blank" href="https://www.typescriptlang.org/">
          typescript
        </StyledLink>
        <span>, visually enhanced by </span>
        <StyledLink target="_blank" href="https://tailwindcss.com/">
          tailwind
        </StyledLink>
        <span> and </span>
        <StyledLink target="_blank" href="https://lucide.dev/">
          lucide icons
        </StyledLink>
        <span>. ✨</span>
      </p>
      <p>
        <span> 🤝 Feel free to contribute on </span>
        <Link
          href="https://github.com/richard-unterberg/typescript-next-leaflet-starter"
          className="text-primary"
        >
          Github
        </Link>
      </p>
    </PageContent>
    <PageNav>
      <h3 className="my-5 text-xl">Demo Content</h3>
      <NavMenu />
    </PageNav>
    <PageFooter>
      <div>
        2024, Richard Unterberg
        <br />
        <Link
          href="https://github.com/richard-unterberg/typescript-next-leaflet-starter"
          className="text-primary"
        >
          typescript-next-leaflet-starter
        </Link>
      </div>
      <div className="text-primary">
        <Leaf size={AppConfig.ui.mapIconSize} className="mt-1" />
      </div>
    </PageFooter>
  </PageContainer>
)

export default Home
