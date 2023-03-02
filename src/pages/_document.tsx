import { Head, Html, Main, NextScript } from 'next/document'

import { AppColor } from '@lib/AppConfig'

const Document = () => (
  <Html lang="en">
    <Head />
    <body className={AppColor.white.tw.bg}>
      <Main />
      <NextScript />
    </body>
  </Html>
)

export default Document
