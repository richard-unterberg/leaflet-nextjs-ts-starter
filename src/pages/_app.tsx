import 'leaflet/dist/leaflet.css'
import type { AppProps } from 'next/app'
import { Catamaran } from 'next/font/google'

import '@src/globals.css'

const catamaran = Catamaran({
  subsets: ['latin'],
  variable: '--font-catamaran',
})

const App = ({ Component, pageProps }: AppProps) => (
  <main className={`${catamaran.variable} font-sans text-base`}>
    <Component {...pageProps} />
  </main>
)

export default App
