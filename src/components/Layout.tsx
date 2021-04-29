import React, { ReactNode } from 'react';
import Header from './Header';

type Props = {
  children: ReactNode;
  // Header: HeaderProps;
};

// TODO: Remove FC
const Layout: React.FC<Props> = (props) => (
  <main>
    <Header />
    <div className="layout">{props.children}</div>
  </main>
);

export default Layout;
