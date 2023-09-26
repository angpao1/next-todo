import type {AppProps} from 'next/app'
import './globals.css'
import client from "@/config/apollo-client";
import {ApolloProvider} from "@apollo/client";

export default function App({Component, pageProps}: AppProps) {
    return (
        <ApolloProvider client={client}>
            <Component {...pageProps} />
        </ApolloProvider>
    )
}