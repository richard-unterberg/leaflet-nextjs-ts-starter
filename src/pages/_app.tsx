import 'leaflet/dist/leaflet.css'
import type { AppProps } from 'next/app'

import '@src/globals.css'

const App = ({ Component, pageProps }: AppProps) => <Component {...pageProps} />

export default App
