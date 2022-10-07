import React from 'react';
import { Menu } from 'semantic-ui-react';
import Link from 'next/link';

export default () => {
  return (
    <Menu style={{ marginTop: '10px' }}>
      {/* <Link route="/" href={<a>Crowd</a>}>
        <h1>Hi</h1>
        <a className="item">CrowdCoin</a>
      </Link> */}

      <Menu.Menu position="right">
        <Link route="/" href={<a>Crowd</a>}>
          <a className="item">Campaigns</a>
        </Link>

        <Link route="/campaigns/new" href={<a>Crowd</a>}>
          <a className="item">+</a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};