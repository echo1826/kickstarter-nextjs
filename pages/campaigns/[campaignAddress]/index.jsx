import React from 'react';
import {useRouter} from 'next/router';

function CampaignDetails() {
    const router = useRouter();
    const address = router.query
    console.log(address);

    return (
        <h1>Campaign Details for a specific campaign</h1>
    )
}

export default CampaignDetails;