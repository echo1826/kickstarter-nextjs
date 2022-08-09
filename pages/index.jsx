import Head from "next/head";
import factory from "../ethereum/factory";
import { useEffect, useState } from "react";

export default function Home() {
    const [campaignList, setCampaignList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const campaigns = await factory.methods.getCampaigns().call();
            setCampaignList(campaigns);
        }
        fetchData();
    }, []);

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
            
        </div>
    );
}
