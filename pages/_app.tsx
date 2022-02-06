import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import customColors from "../config/colors";
import { useEffect } from "react";
import connectToDb from "../config/db";

const colors = customColors;
const customTheme = extendTheme({ colors });

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    connectToDb().catch((err) => console.log(err));
  }, []);

  return (
    <ChakraProvider theme={customTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
