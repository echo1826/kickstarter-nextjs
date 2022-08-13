import React from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/layout";
import "semantic-ui-css/semantic.min.css";
import web3 from '../../../ethereum/web3';
import factory from '../../../ethereum/factory';

function CampaignDetails({balance}) {
    const router = useRouter();
    // const {address} = router.query;
    console.log(balance);

    return (
        <>
            <Layout>
                <h1>Campaign Details for a specific campaign</h1>
            </Layout>
        </>
    );
}

CampaignDetails.getInitialProps = async ({query}) => {
    
}
export default CampaignDetails;
