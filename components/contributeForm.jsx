import React, { useState } from "react";
import { useRouter } from "next/router";
import { Form, Button, Input, Message } from "semantic-ui-react";
import campaignConstructor from "../ethereum/campaign";
import web3 from "../ethereum/web3";

function ContributeForm({campaignAddress}) {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        const campaign = campaignConstructor(campaignAddress);
        setErrorMessage("");
        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(input, 'ether')
            });
            setInput("");
            
            router.reload();
        } catch(err) {
            setErrorMessage(err.message);
        }
        setLoading(false);
    }

    return (
        <Form onSubmit={handleSubmit} error={!!errorMessage}>
            <Form.Field>
                <label>Amount to Contribute</label>
                <Input
                    label="ether"
                    labelPosition="right"
                    value={input}
                    onChange={(event) => {
                        event.preventDefault();
                        setInput(event.target.value);
                    }}
                />
            </Form.Field>
            <Button loading={loading} primary>Contribute</Button>
            {loading && <Message header="Pending" content="Transaction Pending" />}
            <Message error header="Oops" content = {errorMessage} />
        </Form>
    );
}

export default ContributeForm;
