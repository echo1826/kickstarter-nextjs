import React, { useState } from "react";
import {
    Form,
    Container,
    Button,
    Input,
    Message,
} from "semantic-ui-react";
import Layout from "../../components/layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import "semantic-ui-css/semantic.min.css";

// nested route: /campaigns/new
function NewCampaign() {
    const [input, setInput] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    function handleInputChange(event) {
        event.preventDefault();
        setInput(event.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            setLoading(true);
            const accounts = await web3.eth.getAccounts();
            await factory.methods.createCampaign(input).send({
                from: accounts[0],
            });
            setLoading(false);
            setInput("");
            setErrorMessage("");
        } catch (error) {
            setErrorMessage(error.message);
        }
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
                        <Button loading={loading} primary>Create!</Button>
                        <Message error header="Oops" content={errorMessage} />
                    </Form>
                </Layout>
            </Container>
        </>
    );
}

export default NewCampaign;
