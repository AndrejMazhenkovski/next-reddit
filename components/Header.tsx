import Image from 'next/image';
import React from 'react';
import {
  ChevronDownIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  Bars3Icon as MenuIcon,
} from '@heroicons/react/24/solid';
import {
  BellIcon,
  ChatBubbleLeftEllipsisIcon as ChatIcon,
  GlobeEuropeAfricaIcon as GlobeIcon,
  PlusIcon,
  SparklesIcon,
  MegaphoneIcon as SpeakerPhoneIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

function Header() {
  const { data: session } = useSession();

  console.log(session);
  return (
    <div className='sticky top-0 z-50 flex items-center bg-white px-4 py-2 shadow-sm'>
      <div className='relative h-10 w-20 flex-shrink-0 cursor-pointer'>
        <Link href='/'>
          <Image
            objectFit='contain'
            src='https://logos-world.net/imageup/Reddit/Reddit-Logo-PNG5.png'
            layout='fill'
          ></Image>
        </Link>
      </div>

      <div className='flex items-center mx-7 xl:min-w-[300px]'>
        <HomeIcon className='h-5 w-5' />
        <p className='flex-1 ml-2 hidden lg:inline'>Home</p>
        <ChevronDownIcon className='h-5 w-5' />
      </div>

      {/*  Search */}
      <form className='flex flex-1 items-center space-x-2 rounded-sm border border-gray-200 bg-gray-100 px-3 py-1'>
        <MagnifyingGlassIcon className='h-6 w-6 text-gray-400' />
        <input
          className='flex-1 bg-transparent outline-none'
          type='text'
          name=''
          id=''
          placeholder='Search Reddit'
        />
        <button type='submit' hidden></button>
      </form>
      <div className='mx-5 flex items-center text-gray-500 space-x-2 lg:inline-flex '>
        <SparklesIcon className='icon' />
        <GlobeIcon className='icon' />
        <VideoCameraIcon className='icon' />
        <hr className='h-10 border border-gray-100' />

        <ChatIcon className='icon' />
        <BellIcon className='icon' />
        <PlusIcon className='icon' />
        <SpeakerPhoneIcon className='icon' />
      </div>
      <div className='ml-5 flex items-center lg:hidden'>
        <MenuIcon className='icon' />
      </div>
      {/* Sign in and Out button */}

      {session ? (
        <div
          onClick={() => signOut()}
          className='hidden lg:flex items-center space-x-2 border border-gray-100 p-2 cursor-pointer'
        >
          <div className='relative h-5 w-5 flex-shrink-0'>
            <Image
              src='https://links.papareact.com/23l'
              layout='fill'
              alt=''
            ></Image>
          </div>
          <div className='flex-1'>
            <p className='truncate'>Hi {session?.user?.name} </p>
            <p className='text-gray-400 text-xs'>Sign Out</p>
          </div>
          <ChevronDownIcon className='h-4 w-4 ml-2' />
        </div>
      ) : (
        <div
          onClick={() => signIn()}
          className='hidden lg:flex items-center space-x-2 border border-gray-100 p-2 cursor-pointer'
        >
          <div className='relative h-5 w-5 flex-shrink-0'>
            <Image
              src='https://links.papareact.com/23l'
              layout='fill'
              alt=''
            ></Image>
          </div>
          <p className='text-gray-400'>Sign In</p>
        </div>
      )}
    </div>
  );
}

export default Header;
