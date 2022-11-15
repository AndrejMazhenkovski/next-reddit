import { gql } from '@apollo/client';

export const GET_ALL_POSTS = gql`
  query MyQuery {
    getPostList {
      body
      created_at
      id
      image
      title
      subreddit_id
      username
      commentList {
        created_at
        id
        post_id
        text
        username
      }
      subreddit {
        created_at
        id
        topic
      }
      voteList {
        created_at
        id
        post_id
        upvote
        username
      }
    }
  }
`;

export const GET_SUBREDDIT_BY_TOPIC = gql`
  query MyQuery($topic: String!) {
    getSubredditListByTopic(topic: $topic) {
      id
      topic
      created_at
    }
  }
`;

export const GET_ALL_POSTS_BY_TOPIC = gql`
  query MyQuery($topic: String!) {
    getPostListByTopic(topic: $topic) {
      body
      created_at
      id
      image
      title
      subreddit_id
      username
      commentList {
        created_at
        id
        post_id
        text
        username
      }
      subreddit {
        created_at
        id
        topic
      }
      voteList {
        created_at
        id
        post_id
        upvote
        username
      }
    }
  }
`;

export const GET_POST_BY_POSTID = gql`
  query MyQuery($id: ID!) {
    getPost(id: $id) {
      body
      commentList {
        created_at
        id
        post_id
        text
        username
      }
      created_at
      id
      image
      subreddit {
        created_at
        id
        topic
      }
      subreddit_id
      title
      username
    }
  }
`;
