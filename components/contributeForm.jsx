import React, { useState } from "react";
import { Form, Container, Button, Input, Message } from "semantic-ui-react";

function ContributeForm() {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        console.log("submitted");
        setLoading(true);
    }

    return (
        <Form onSubmit={handleSubmit}>
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
            <Button primary>Contribute</Button>
        </Form>
    );
}

export default ContributeForm;
