import React from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/layout";
import "semantic-ui-css/semantic.min.css";

function CampaignDetails() {
    const router = useRouter();
    const address = router.query;
    console.log(address);

    return (
        <>
            <Layout>
                <h1>Campaign Details for a specific campaign</h1>
            </Layout>
        </>
    );
}

export default CampaignDetails;
