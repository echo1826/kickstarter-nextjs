import React from "react";
import Link from "next/link";
import { Menu } from "semantic-ui-react";

function Header() {
    return (
        <Menu style={{ marginTop: "1%" }}>
            <Menu.Item>
                <Link href="/">CrowdCoin</Link>
            </Menu.Item>
            <Menu.Menu position="right">
                <Link href="/">
                    <Menu.Item>Campaigns</Menu.Item>
                </Link>
                <Link href="/campaigns/new">
                    <Menu.Item>+</Menu.Item>
                </Link>
            </Menu.Menu>
        </Menu>
    );
}

export default Header;
