import React, { useState } from "react";
import { Form, Container, Button, Input } from "semantic-ui-react";
import Layout from "../../components/layout";
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import "semantic-ui-css/semantic.min.css";

// nested route: /campaigns/new
function NewCampaign() {
    const [input, setInput] = useState("");
    function handleInputChange(event) {
        event.preventDefault();
        setInput(event.target.value);
    }

    async function handleSubmit(event) {
        event.prevenDefault();
        const accounts = await web3.eth.getAccounts();
        await factory.methods.createCampaign(input).send({
            from: accounts[0]
        });
    }

    return (
        <>
            <Container>
                <Layout>
                    <Form onSubmit={handleSubmit}>
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
                        <Button primary>Create!</Button>
                    </Form>
                </Layout>
            </Container>
        </>
    );
}

export default NewCampaign;
