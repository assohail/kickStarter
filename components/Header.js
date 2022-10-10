import React from 'react';
import { Menu } from 'semantic-ui-react';
import Link from 'next/link';

export default () => {
  return (
    <Menu style={{ marginTop: '10px' }}>
      <Link route="/" href={'/'}>
        <a className="item">CrowdCoin</a>
      </Link>
 
      <Menu.Menu position="right">
        <Link route="/" href={'/'}>
          <a className="item">Campaigns</a>
        </Link>

        <Link route="/campaigns/new" href={"/campaigns/new"}>
          <a className="item">+</a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};