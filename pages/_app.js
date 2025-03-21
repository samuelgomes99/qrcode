import '../styles/globals.css';
import Head from 'next/head';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  // Fix for iOS Safari viewport issues
  useEffect(() => {
    // Prevent scrolling and zooming on mobile devices
    const handleTouchMove = (e) => {
      // Allow scrolling on elements with 'scroll-allowed' class
      if (!e.target.closest('.scroll-allowed')) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    // Handle iOS height issues with viewport
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);

    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', setViewportHeight);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Sales Experience - Verificador de Ingressos</title>
        <meta name="description" content="Aplicação para validação de ingressos do evento Sales Experience" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
