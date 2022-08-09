import Head from "next/head";
import factory from "../ethereum/factory";
import { useEffect, useState } from "react";

export default function Home({ campaigns }) {
    Home.getInitialProps = async () => {
        const campaigns = await factory.methods.getCampaigns().call();
        return { campaigns };
    };

    return (
        <div>
            <Head>
                <title>CrowdCoin</title>
                <meta
                    name="description"
                    content="nextjs app kickstarter clone utilizing the ethereum network to store campaigns"
                />
            </Head>
            <h1>This is the campaign list</h1>
            <div>{campaigns}</div>
        </div>
    );
}
