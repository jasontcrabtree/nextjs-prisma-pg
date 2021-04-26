import React from 'react';
import Router from 'next/router';
import ReactMarkdown from 'react-markdown';

export type PostProps = {
  id: number;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
  properties: any;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : 'Unknown author';
  return (
    <button
      type="button"
      onClick={() => Router.push('/p/[id]', `/p/${post.id}`)}
    >
      <h2>{post.title}</h2>
      <small>By {authorName}</small>
      {/* <ReactMarkdown source={post.content} /> */}

      <ReactMarkdown>{post.content}</ReactMarkdown>
      <style jsx>{`
        button {
          text-align: left;
          width: 100%;
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </button>
  );
};

export default Post;
