import React from "react";
import { useRouter } from "next/router";
import { Card, Grid } from "semantic-ui-react";
import Layout from "../../../components/layout";
import "semantic-ui-css/semantic.min.css";
import ContributeForm from "../../../components/contributeForm";
import campaignConstructor from "../../../ethereum/campaign";

function CampaignDetails(props) {

    const router = useRouter();

    function renderCards() {
        const {
            minContribution,
            balance,
            numRequests,
            approversCount,
            managerAddress,
        } = props;
        const items = [
            {
                header: balance,
                meta: "Campaign Balance (ether)",
                description: "The current balance this campaign has currently",
                style: { overflowWrap: "break-word" },
            },
            {
                header: minContribution,
                meta: "Minimum Contribution in Wei (Wei)",
                description:
                    "The minimum amount of wei needed for a person to contribute to this campaign",
                style: { overflowWrap: "break-word" },
            },
            {
                header: numRequests,
                meta: "Requests",
                description:
                    "The number of requests the manager has currently made on this campaign to withdraw money",
                style: { overflowWrap: "break-word" },
            },
            {
                header: managerAddress,
                meta: "Address of Manager",
                description:
                    "The manager created this campaign and can create requests to withdraw money",
                style: { overflowWrap: "break-word" },
            },
            {
                header: approversCount,
                meta: "Contributors",
                description: "How many people has contributed to this campaign",
                style: { overflowWrap: "break-word" },
            },
        ];

        return <Card.Group items={items} />;
    }

    return (
        <>
            <Layout>
                <h1>Campaign Details</h1>
                <Grid>
                    <Grid.Column width={10}>{renderCards()}</Grid.Column>
                    <Grid.Column width={6}>
                        <ContributeForm campaignAddress={router.query.campaignAddress}/>
                    </Grid.Column>
                </Grid>
            </Layout>
        </>
    );
}
// destructered query from props object from getInitialProps
CampaignDetails.getInitialProps = async ({ query }) => {
    const { campaignAddress } = query;
    const campaign = campaignConstructor(campaignAddress);

    const summary = await campaign.methods.getSummary().call();

    return {
        minContribution: summary[0],
        balance: summary[1],
        numRequests: summary[2],
        approversCount: summary[3],
        managerAddress: summary[4],
    };
};
export default CampaignDetails;
