import Link from "next/link";
import React from "react";
import Layout from "../../../../components/layout";
import RequestRow from "../../../../components/requestRow";
import campaignConstructor from "../../../../ethereum/campaign";
import { Button, Table } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

function RequestList({
    campaignAddress,
    requests,
    requestCount,
    approversCount,
}) {
    const { Header, Row, HeaderCell, Body } = Table;

    function renderRow() {
        return requests.map((request, index) => {
            return (
                <RequestRow
                    key={index}
                    request={request}
                    campaignAddress={campaignAddress}
                    id={index}
                    approversCount={approversCount}
                />
            );
        });
    }
    return (
        <>
            <Layout>
                <h3>Requests</h3>
                <Link href={`/campaigns/${campaignAddress}/requests/new`}>
                    <a>
                        <Button
                            style={{ marginBottom: 10 }}
                            floated="right"
                            primary
                        >
                            Add Request
                        </Button>
                    </a>
                </Link>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>
                    <Body>{renderRow()}</Body>
                </Table>
                <div>Found {requestCount} requests</div>
            </Layout>
        </>
    );
}

RequestList.getInitialProps = async (props) => {
    const { campaignAddress } = props.query;
    const campaign = campaignConstructor(campaignAddress);
    const requestCount = await campaign.methods.getRequestsCount().call();
    const approversCount = await campaign.methods.approversCount().call();

    const requests = await Promise.all(
        Array(parseInt(requestCount))
            .fill()
            .map((element, index) => {
                return campaign.methods.requests(index).call();
            })
    );

    return { campaignAddress, requests, requestCount, approversCount };
};

export default RequestList;
