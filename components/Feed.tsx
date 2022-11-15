import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_ALL_POSTS, GET_ALL_POSTS_BY_TOPIC } from '../graphql/queries';
import Post from './Post';
import { Orbit, Jelly } from '@uiball/loaders';

type Props = {
  topic?: string;
};

function Feed({ topic }: Props) {
  const { data, error } = !topic
    ? useQuery(GET_ALL_POSTS)
    : useQuery(GET_ALL_POSTS_BY_TOPIC, {
        variables: {
          topic: topic,
        },
      });

  const posts: Post[] = !topic ? data?.getPostList : data?.getPostListByTopic;

  if (!posts) {
    return (
      <div className='w-full flex items-center justify-center p-10'>
        <Jelly size={55} color={'black'} />{' '}
      </div>
    );
  }

  return (
    <div>
      <div className='mt-5 space-y-4'>
        {posts?.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
