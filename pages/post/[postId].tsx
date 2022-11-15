import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_POST_BY_POSTID } from '../../graphql/queries';
import { Orbit, Jelly } from '@uiball/loaders';

function PostPage() {
  const {
    query: { postId },
  } = useRouter();

  const { data, error } = useQuery(GET_POST_BY_POSTID, {
    variables: {
      id: postId,
    },
  });
  console.log(data, 'Data broski');
  return (
    <div>
      {!postId && (
        <div>
          {' '}
          <Orbit size={50} color={'black'} />
        </div>
      )}

      <p>{postId}</p>
    </div>
  );
}

export default PostPage;
