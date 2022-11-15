import React from 'react';
import Avatar from './Avatar';
import TimeAgo from 'react-timeago';

import {
  ArrowDownIcon,
  ArrowUpIcon,
  BookmarkIcon,
  ChatBubbleOvalLeftIcon as ChatAltIcon,
  EllipsisHorizontalIcon,
  GiftIcon,
  ShareIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

type Props = {
  post: Post;
};

function Post({ post }: Props) {
  return (
    <Link href={`/post/${post.id}`}>
      <div className='flex cursor-pointer rounded-md border border-gray-300 bg-white shadow-sm hover:border hover:border-gray-600'>
        {/* Votes */}
        <div className='flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400'>
          <ArrowUpIcon className='voteButtons hover:text-red-400' />
          <p className='text-black font-bold text-xs'> 0 </p>
          <ArrowDownIcon className='voteButtons hover:text-blue-400' />
        </div>

        <div className='p-3 pb-1'>
          {/* Header */}
          <div className='flex items-center space-x-2'>
            <Avatar seed={post.subreddit[0]?.topic} />
            <p className='text-xs text-gray-400'>
              <Link href={`/subreddit/${post.subreddit[0]?.topic}`}>
                <span className='font-bold text-black hover:text-blue-400 hover:underline'>
                  r/{post.subreddit[0]?.topic}
                </span>
              </Link>
              . *Posted by u/
              {post.username} <TimeAgo date={post.created_at} />
            </p>
          </div>
          {/* Body */}
          <div className='py-4'>
            <h2 className='text-xl font-semibold'>{post.title}</h2>
            <p className='mt-2 text-sm font-light'>{post.body}</p>
          </div>

          {/* Image */}
          <img className='w-full' src={post.image} alt='' />

          {/* Footer */}
          <div className='flex space-x-4 text-gray-400'>
            <div className='postButtons'>
              <ChatAltIcon className='h-6 w-5' />
              <p className=''>{post.commentList.length} Comments</p>
            </div>

            <div className='postButtons'>
              <GiftIcon className='h-6 w-5' />
              <p className='hidden sm:inline'>Award</p>
            </div>
            <div className='postButtons'>
              <ShareIcon className='h-6 w-5' />
              <p className='hidden sm:inline'> Share</p>
            </div>
            <div className='postButtons'>
              <BookmarkIcon className='h-6 w-5' />
              <p className='hidden sm:inline'> Save</p>
            </div>
            <div className='postButtons'>
              <EllipsisHorizontalIcon className='h-6 w-5' />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Post;
