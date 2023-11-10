import React, { useState, useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {

  return (
    <ChakraProvider>
      <div className="min-h-screen">
        <div className="content-container">
            <Component {...pageProps} />
        </div>
      </div>
    </ChakraProvider>
  )
}