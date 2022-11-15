import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import Avatar from './Avatar';
import { LinkIcon, CameraIcon } from '@heroicons/react/24/solid';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { ADD_POST, ADD_SUBREDDIT } from '../graphql/mutations';
import client from '../apollo-client';
import { GET_SUBREDDIT_BY_TOPIC, GET_ALL_POSTS } from '../graphql/queries';
import toast from 'react-hot-toast';
// 2:35:24 Sanny bro

type FormData = {
  postTitle: string;
  postBody: string;
  postImage: string;
  subreddit: string;
};

type Props = {
  subreddit?: string;
};

function PostBox({ subreddit }: Props) {
  const { data: session } = useSession();
  // Shtom ima nov post, force refresh se pravi na query-to
  const [addPost] = useMutation(ADD_POST, {
    refetchQueries: [GET_ALL_POSTS, 'getPostList'],
  });
  const [addSubreddit] = useMutation(ADD_SUBREDDIT);

  const [imageOpenBox, setImageOpenBox] = useState<boolean>(false);
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(async (formData) => {
    console.log(formData);
    const notification = toast.loading('Creating new post...');

    try {
      // Query for subreddit topic ...

      const {
        data: { getSubredditListByTopic },
      } = await client.query({
        query: GET_SUBREDDIT_BY_TOPIC,
        variables: {
          topic: subreddit || formData.subreddit,
        },
      });

      const subredditExists = getSubredditListByTopic.length > 0;

      if (!subredditExists) {
        // Create subreddit
        console.log('Subreddit is new! -> Creating NEW subreddit');

        const {
          data: { insertSubreddit: newSubreddit },
        } = await addSubreddit({
          variables: {
            topic: formData.subreddit,
          },
        });

        console.log('Creating post', formData);
        const image = formData.postImage || '';

        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            body: formData.postBody,
            image: image,
            subreddit_id: newSubreddit.id,
            title: formData.postTitle,
            username: session?.user?.name,
          },
        });

        console.log('New post added', newPost);
      } else {
        // Use existing subreddit
        console.log('using existing subreddit!');
        console.log(getSubredditListByTopic);

        const image = formData.postImage || '';

        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            body: formData.postBody,
            image: image,
            subreddit_id: getSubredditListByTopic[0].id,
            title: formData.postTitle,
            username: session?.user?.name,
          },
        });
        console.log('New post added: ', newPost);
      }

      // After thje post has been added!

      setValue('postBody', '');
      setValue('postTitle', '');
      setValue('subreddit', '');
      setValue('postImage', '');
      toast.success('New post created!', {
        id: notification,
      });
    } catch (error) {
      toast.error('Whoops - something went wrong', {
        id: notification,
      });
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className='sticky top-16 z-50 bg-white border rounded-md border-gray-300 p-2'
    >
      <div className='flex items-center space-x-3'>
        {/* Avatar */}
        <Avatar />
        <input
          {...register('postTitle', { required: true })}
          type='text'
          disabled={!session}
          className='flex-1 rounded-md bg-gray-50 p-2 pl-5 outline-none'
          placeholder={
            session
              ? subreddit
                ? `Create a post in r/${subreddit}`
                : 'Create a post by entering a title'
              : 'Sign in to post'
          }
        />

        <CameraIcon
          onClick={() => setImageOpenBox(!imageOpenBox)}
          className={`h-6 text-gray-300 ${
            imageOpenBox && 'text-blue-300'
          } cursor-pointer`}
        />
        <LinkIcon className='h-6 text-gray-300 cursor-pointer' />
      </div>

      {!!watch('postTitle') && (
        <div>
          {/* Body */}
          <div className='flex items-center py-2'>
            <p className='min-w-[90px]'>Body</p>
            <input
              {...register('postBody')}
              className='m-2 flex-1 bg-blue-50 p-2 outline-none'
              type='text'
              placeholder='Text (optional)'
            />
          </div>

          {!subreddit && (
            <div className='flex items-center py-2'>
              <p className='min-w-[90px]'>Subreddit</p>
              <input
                {...register('subreddit', { required: true })}
                className='m-2 flex-1 bg-blue-50 p-2 outline-none'
                type='text'
                placeholder='i.e reactJS'
              />
            </div>
          )}

          {imageOpenBox && (
            <div className='flex items-center py-2'>
              <p className='min-w-[90px]'>Image URL</p>
              <input
                {...register('postImage')}
                className='m-2 flex-1 bg-blue-50 p-2 outline-none'
                type='text'
                placeholder='optional'
              />
            </div>
          )}

          {/* Errors */}
          {Object.keys(errors).length > 0 && (
            <div className='space-y-2 p-2 text-red-500'>
              {errors.postTitle?.type === 'required' && (
                <p>- A post title is required</p>
              )}

              {errors.subreddit?.type === 'required' && (
                <p>- A subreddit is required</p>
              )}
            </div>
          )}

          {!!watch('postTitle') && (
            <button
              className={`w-full rounded-full ${
                !watch('postBody') ? 'bg-gray-400' : 'bg-blue-400'
              }  p-2 text-white`}
            >
              Create Post
            </button>
          )}
        </div>
      )}
    </form>
  );
}

export default PostBox;
