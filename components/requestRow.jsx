import React from "react";
import { Table, Button } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import campaignConstructor from "../ethereum/campaign";

function RequestRow(props) {
    const { request, campaignAddress, id, approversCount } = props;
    // console.log(request);

    async function onApprove(event) {
        event.preventDefault();
        const accounts = await web3.eth.getAccounts();
        const campaign = campaignConstructor(campaignAddress);
        await campaign.methods.approveRequest(id).send({ from: accounts[0] });
    }

    async function onFinalize(event) {
        event.preventDefault();
        const campaign = campaignConstructor(campaignAddress);
        const accounts = await web3.eth.getAccounts();
        await campaign.methods.finalizeRequest(id).send({ from: accounts[0] });
    }

    return (
        <>
            <Table.Row>
                <Table.Cell>{id + 1}</Table.Cell>
                <Table.Cell>{request.description}</Table.Cell>
                <Table.Cell>
                    {web3.utils.fromWei(request.value, "ether")}
                </Table.Cell>
                <Table.Cell>{request.recipient}</Table.Cell>
                <Table.Cell>
                    {request.approvalCount}/{approversCount}
                </Table.Cell>
                <Table.Cell>
                    <Button color="green" basic onClick={onApprove}>
                        Approve
                    </Button>
                </Table.Cell>
                <Table.Cell>
                    <Button color="teal" basic onClick={onFinalize}>
                        Finalize
                    </Button>
                </Table.Cell>
            </Table.Row>
        </>
    );
}

export default RequestRow;
