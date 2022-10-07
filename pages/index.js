import React, {Component} from "react";
import instance from "../ethereum/factory";
import web3 from "../ethereum/web3";
import { Card, Button } from 'semantic-ui-react';
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
                description: <a>View Campaign</a>,
                fluid: true
            }
        })

        return <Card.Group items = {items} />
    }
    render() {
        return <div>
            {this.renderCampaigns()}
            <Button content="Create Campaign" icon="add circle" primary/>
        </div>

    }
}

export default CampaignIndex;                                       