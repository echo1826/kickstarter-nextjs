import React, { useState } from "react";
import { useRouter } from "next/router";
import { Form, Container, Button, Input, Message } from "semantic-ui-react";
import Layout from "../../components/layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import "semantic-ui-css/semantic.min.css";

// nested route: /campaigns/new
function NewCampaign() {
    const [input, setInput] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    function handleInputChange(event) {
        event.preventDefault();
        setInput(event.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        setErrorMessage("");
        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods.createCampaign(input).send({
                from: accounts[0],
            });
            setInput("");
            setErrorMessage("");
        } catch (error) {
            setErrorMessage(error.message);
        }
        setLoading(false);
        router.push("/");
    }

    return (
        <>
            <Container>
                <Layout>
                    <Form onSubmit={handleSubmit} error={!!errorMessage}>
                        <Form.Field>
                            <label htmlFor="minContribution">
                                Minimum Contribution
                            </label>
                            <Input
                                label="Wei"
                                labelPosition="right"
                                id="minContribution"
                                value={input}
                                onChange={handleInputChange}
                            />
                        </Form.Field>
                        <Button loading={loading} primary>
                            Create!
                        </Button>
                        {loading && (
                            <Message
                                header="Pending"
                                content="Transaction Pending"
                            />
                        )}
                        <Message error header="Oops" content={errorMessage} />
                    </Form>
                </Layout>
            </Container>
        </>
    );
}

export default NewCampaign;
