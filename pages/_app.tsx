import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Web3 from 'web3'
import { Web3ReactProvider } from '@web3-react/core'


const getLibarary = (provider:any) => {
  return new Web3(provider)
}

function MyApp({ Component, pageProps }: AppProps) {
  return  (
    <Web3ReactProvider getLibrary={getLibarary}>
      <Component {...pageProps} />
    </Web3ReactProvider>
  )
}

export default MyApp
