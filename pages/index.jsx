import Head from "next/head";
import factory from "../ethereum/factory";
import { Card } from "semantic-ui-react";
import React from "react";
import 'semantic-ui-css/semantic.min.css';

function Home({ campaigns }) {
    function renderCampaigns() {
        const items = campaigns.map((campaignAddress) => {
            return {
                header: campaignAddress,
                description: <a>View Campaign</a>,
                fluid: true,
            };
        });

        return <Card.Group items={items} />;
    }

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
            {renderCampaigns()}
        </div>
    );
}

Home.getInitialProps = async () => {
    const campaigns = await factory.methods.getCampaigns().call();
    return { campaigns };
};

export default Home;