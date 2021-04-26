import { AppProps } from 'next/app';
import '../styles/reset.css';
import '../styles/globals.css';
import { Provider } from 'next-auth/client';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
