import '../styles/globals.css'
import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { AuthProvider } from "utils/context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <>
    <AuthProvider>
      <Head>
        <link
          rel="icon"
          href="https://lesplusbeauxdrapeauxdumonde.files.wordpress.com/2016/12/flag-1040567_1280-1.png"
        />
      </Head>
      <Component {...pageProps} />
    </AuthProvider>
    // </>
  );
}

export default MyApp
