import React, {Component} from "react";
import instance from "../ethereum/factory";
import web3 from "../ethereum/web3";
import { Card, Button } from 'semantic-ui-react';
import Layout from "../components/Layout";
import Link from "next/link";
// import 'semantic-ui-css';   

class CampaignIndex extends Component {
    static async getInitialProps() {
        const campaigns = await instance.methods.getDeployedCampaigns().call();
        return { campaigns };
    }

    renderCampaigns(){
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description: <Link href={`/campaigns/${address}`}><a>View Campaign</a></Link>,
                fluid: true
            }
        })

        return <Card.Group items = {items} />
    }
    render() {
        return (
                <Layout>
                    <div>
                        <h3>Open Campaigns</h3>
                        <Link href={"/campaigns/new"}>
                            <Button content="Create Campaign" icon="add circle" primary/>
                        </Link>
                        {this.renderCampaigns()}
                    </div>
                </Layout>
            )
    }
}

export default CampaignIndex;                                       