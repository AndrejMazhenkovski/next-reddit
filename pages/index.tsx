import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header';
import PostBox from '../components/Postbox';
import Feed from '../components/Feed';

const Home: NextPage = () => {
  return (
    <div className='max-w-5xl my-7 mx-auto'>
      <Head>
        <title>Next Reddit</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {/* PostBox */}
      <PostBox />

      <div className='flex'>
        {/* Feed */}
        <Feed />{' '}
      </div>
    </div>
  );
};

export default Home;
