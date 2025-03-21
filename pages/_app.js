import '../styles/globals.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Sales Experience - Verificador de Ingressos</title>
        <meta name="description" content="Aplicação para validação de ingressos do evento Sales Experience" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
