import Head from 'next/head'

import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('../components/Layout'), { ssr: false });

export default function Home() {
  return (
    <>
      <Head>
        <title>Mocode: Mobile-first Coding</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
      <Layout />
      </main>
    </>
  )
}
