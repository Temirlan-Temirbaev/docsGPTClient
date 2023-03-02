import '@/styles/global.css';
import type { AppProps } from 'next/app';
import '@/styles/header.css';
import '@/styles/slogan.css';
import '@/styles/langList.css';
import '@/styles/langPage.css';
import '@/styles/termPage.css';
import 'highlight.js/styles/atom-one-dark.css';
import Head from 'next/head';
import '@/styles/chatPage.css';
import '@/styles/loader.css';
import '@/styles/search.css'
export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Head>
    <title>DocsGPT</title>

    </Head>
    <Component {...pageProps}/>
  </>
}
