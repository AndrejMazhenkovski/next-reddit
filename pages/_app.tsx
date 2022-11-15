import '../styles/globals.css';
import type { Session } from 'next-auth';
import type { AppProps, AppType } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Header from '../components/Header';
import { ApolloProvider } from '@apollo/client';
import client from '../apollo-client';
import { Toaster } from 'react-hot-toast';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session}>
        <Toaster />
        <div className='h-screen overflow-y-scroll bg-slate-200'>
          <Header />
          <Component {...pageProps} />
        </div>
      </SessionProvider>
    </ApolloProvider>
  );
};

export default MyApp;
