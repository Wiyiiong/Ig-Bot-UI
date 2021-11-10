import '../styles/globals.css';

import { ChakraProvider, Container, Flex } from '@chakra-ui/react';
import React from 'react';

import SideMenu from '../components/menu/sideMenu';

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Flex w="100%">
        <SideMenu />
        <Container mx="auto">
          <Component {...pageProps} />
        </Container>
      </Flex>
    </ChakraProvider>)

}

export default MyApp
