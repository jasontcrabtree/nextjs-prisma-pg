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
  published: boolean;
  properties: any;
};

// function Drafts(props: Props) {
// function Post: { post: PostProps } = ({ post }) => {

// const Post1 = ({ post: PostProps }) => {
//   const authorName = post.author ? post.author.name : 'Unknown author';
//   return (
//     <button
//       type="button"
//       onClick={() => Router.push('/p/[id]', `/p/${post.id}`)}
//     >
//       <h2>{post.title}</h2>
//       <small>By {authorName}</small>
//       <ReactMarkdown>{post.content}</ReactMarkdown>
//     </button>
//   );
// };

// const PostPage = ({
//   post: { title, content, excerpt, slug }
// }) =>

// function name({ post}: PostProps) {

// }

// function Post({ post: PostProps }: post) {

//   const authorName = post.author ? post.author.name : 'Unknown author';

//   return (
//     <button
//       type="button"
//       onClick={() => Router.push('/p/[id]', `/p/${post.id}`)}
//     >
//       <h2>{post.title}</h2>
//       <small>By {authorName}</small>
//       <ReactMarkdown>{post.content}</ReactMarkdown>
//     </button>
//   );
// }

// const Post = ({ post: PostProps } = ({ post }) => {

/* const Post2 = (post: PostProps) => {


  const authorName = post.author ? post.author.name : 'Unknown author';

  return (
    <button
      type="button"
      onClick={() => Router.push('/p/[id]', `/p/${post.id}`)}
    >
      <h2>{post.title}</h2>
      <small>By {authorName}</small>
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </button>
  );
}; */

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  // function Post(post: PostProps) {
  // const Post = (post: PostProps) => {

  const authorName = post.author ? post.author.name : 'Unknown author';

  return (
    // <div>
    //   <button
    //     type="button"
    //     onClick={() => Router.push('/p/[id]', `/p/${post.id}`)}
    //   >
    //     <h2>{post.title}</h2>
    //     <small>By {authorName}</small>
    //     <ReactMarkdown>{post.content}</ReactMarkdown>
    //   </button>
    // </div>
    <div className="postBox">
      <Link href={`/post/${post.id}`}>Link</Link>
      <h2>{post.title}</h2>
      <small>{authorName}</small>
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </div>
  );
};

export default Post;
