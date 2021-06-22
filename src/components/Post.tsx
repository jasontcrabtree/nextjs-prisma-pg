import React from 'react';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

export type PostProps = {
  id: number;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  authorId: number;
  published: boolean;
  postId: number;
  postProfileId: number;
  // profile: {
  //   name: string;
  //   email: string;
  // } | null;
};

// TODO: Remove FC
const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : 'Unknown author';

  return (
    <div className="postBox">
      {post.published ? null : 'Draft'}
      <h2>
        <Link href={`/draft-post/${post.postId}`}>{post.title}</Link>
      </h2>
      <small>{authorName}</small>
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </div>
  );
};

export default Post;
