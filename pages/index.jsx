import Head from "next/head";
import factory from "../ethereum/factory";
import Layout from "../components/layout";
import { Card, Button } from "semantic-ui-react";
import React from "react";
import "semantic-ui-css/semantic.min.css";

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
        <>
            <Head>
                <title>CrowdCoin</title>
                <meta
                    name="description"
                    content="nextjs app kickstarter clone utilizing the ethereum network to store campaigns"
                />
            </Head>
            <Layout>
                <h3>Open Campaigns</h3>
                <Button floated="right" content="Create Campaign" icon="add circle" primary />
                {renderCampaigns()}
            </Layout>
        </>
    );
}

Home.getInitialProps = async () => {
    const campaigns = await factory.methods.getCampaigns().call();
    return { campaigns };
};

export default Home;
