import Link from "next/link";
import React from "react";
import Layout from "../../../../components/layout";
import { Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

function RequestList({campaignAddress}) {
    
    return (
        <>
            <Layout>
                <Link href={`/campaigns/${campaignAddress}/requests/new`}>
                    <Button primary>Add Request</Button>
                </Link>
            </Layout>
        </>
    );
}

RequestList.getInitialProps = async (props) => {
    const { campaignAddress } = props.query;
    return { campaignAddress };
};

export default RequestList;
