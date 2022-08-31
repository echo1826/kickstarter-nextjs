import React, { useState } from "react";
import campaignConstructor from "../../../../ethereum/campaign";
import web3 from "../../../../ethereum/web3";
import { useRouter } from "next/router";
import Link from "next/link";
import { Form, Button, Message, Input } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

function RequestForm({ campaignAddress }) {
    const [inputs, setInputs] = useState({
        description: "",
        amount: "",
        recipient: "",
    });

    return (
        <>
            <Form>
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
                            setInputs({ ...inputs, amount: event.target.value })
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
                <Button>Create</Button>
            </Form>
        </>
    );
}

RequestForm.getInitialProps = async ({ query }) => {
    const { campaignAddress } = query;

    return { campaignAddress };
};

export default RequestForm;
