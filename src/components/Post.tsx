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
  // properties: any;
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

// const  Post = ({ post: PostProps }: PostProps }}) => {
// function Post(post: PostProps) {
// const Post = (post: PostProps) => {
// const Post = ({ post }: { post: PostProps }<{}>) => {
// const Post: { post: PostProps } = ({ post }) => {

// const Post = (props: PostProps) => {

// const PostSm = (props: PostProps) => {};
// const PostLg = ({ post: PostProps }) => {};

// const Post = (props: PostProps) => {
// const PostWithProps: React.FC<{ props: PostProps }> = (props) => {

// let list: Array<number> = [1, 2, 3];

// const Post2: <PostProps> = ({ post }) => {};

// const List = <ItemType extends any>(props: { items: ItemType[]; renderItem: (item: ItemType) => React.ReactNode; }) => {

// TODO: Remove FC
const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  // const { post } = props;

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
      {post.published ? null : 'Draft'}
      <Link href={`/post/${post.id}`}>Link</Link>
      <h2>{post.title}</h2>
      <small>{authorName}</small>
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </div>
  );
};

export default Post;
