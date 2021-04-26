import React from 'react';
import Link from 'next/link';
import { signOut, useSession, signIn } from 'next-auth/client';

const Header = () => {
  const [session, loading] = useSession();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <nav>
      <Link href="/">Feed</Link>
      <Link href="/drafts">My drafts</Link>
      <Link href="/create">New post</Link>

      {session ? (
        <button type="button" onClick={() => signOut()}>
          Log out
        </button>
      ) : (
        <>
          <button type="button" onClick={() => signIn()}>
            Log in
          </button>
        </>
      )}
      {session && (
        <span>
          Signed in as {session.user.name} {/* {session.user.email} */}
        </span>
      )}
    </nav>
  );
};

export default Header;
