import React from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/layout";
import "semantic-ui-css/semantic.min.css";
import web3 from '../../../ethereum/web3';
import campaignConstructor from '../../../ethereum/campaign';

function CampaignDetails(props) {
    console.log(props);
    return (
        <>
            <Layout>
                <h1>Campaign Details for a specific campaign</h1>
            </Layout>
        </>
    );
}
// destructered query from props object from getInitialProps
CampaignDetails.getInitialProps = async ({query}) => {
    const {campaignAddress} = query;
    const campaign = campaignConstructor(campaignAddress);

    const summary = await campaign.methods.getSummary().call();
    
    return {
        minContribution: summary[0],
        balance: summary[1],
        numRequests: summary[2],
        approversCount: summary[3],
        managerAddress: summary[4]
    };
}
export default CampaignDetails;
