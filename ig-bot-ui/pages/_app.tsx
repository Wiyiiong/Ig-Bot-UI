import '../styles/globals.css';

import { Box, ChakraProvider, Container, Flex } from '@chakra-ui/react';
import React from 'react';

import SideMenu from '../components/menu/sideMenu';

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Flex w="100%">
        <Box>
        <SideMenu />
        </Box>
        <Box w="100%">
          <Component {...pageProps} />
        </Box>
      </Flex>
    </ChakraProvider>)

}

export default MyApp
