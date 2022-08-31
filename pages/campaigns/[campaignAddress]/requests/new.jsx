import React, { useState } from "react";
import campaignConstructor from "../../../../ethereum/campaign";
import web3 from "../../../../ethereum/web3";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../../../../components/layout";
import { Form, Button, Message, Input } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

function RequestForm({ campaignAddress }) {
    const [inputs, setInputs] = useState({
        description: "",
        amount: "",
        recipient: "",
    });
    const [loading, setLoading] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    async function handleSubmit(event) {
        event.preventDefault();
        const campaign = campaignConstructor(campaignAddress);
        const { description, amount, recipient } = inputs;
        try {
            const accounts = await web3.eth.getAccounts();
            setLoading(true);
            setErrorMessage("");
            await campaign.methods
                .createRequest(
                    description,
                    web3.utils.toWei(amount, "ether"),
                    recipient
                )
                .send({ from: accounts[0] });
            setInputs({
                description: "",
                amount: "",
                recipient: "",
            });
            router.push(`/campaigns/${campaignAddress}/requests`);
        } catch (error) {
            console.log(error.message);
            setErrorMessage(error.message);
        }
        setLoading(false);
    }

    return (
        <>
            <Layout>
                <Link href={`/campaigns/${campaignAddress}/requests`}>Back</Link>
                <h4>Create a Request</h4>
                <Form error={!!errorMessage} onSubmit={handleSubmit}>
                    <Form.Field>
                        <label htmlFor="description">Description</label>
                        <Input
                            id="description"
                            value={inputs.description}
                            onChange={(event) =>
                                setInputs({
                                    ...inputs,
                                    description: event.target.value,
                                })
                            }
                        />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="amount">Amount in Ether</label>
                        <Input
                            id="amount"
                            value={inputs.amount}
                            onChange={(event) =>
                                setInputs({
                                    ...inputs,
                                    amount: event.target.value,
                                })
                            }
                        />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="recipient">Recipient</label>
                        <Input
                            id="recipient"
                            value={inputs.recipient}
                            onChange={(event) =>
                                setInputs({
                                    ...inputs,
                                    recipient: event.target.value,
                                })
                            }
                        />
                    </Form.Field>
                    <Button loading={loading} primary type="submit">
                        Create
                    </Button>
                    <Message error heading="Oops!" content={errorMessage} />
                </Form>
            </Layout>
        </>
    );
}

RequestForm.getInitialProps = async ({ query }) => {
    const { campaignAddress } = query;

    return { campaignAddress };
};

export default RequestForm;
