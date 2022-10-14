import React, {Component} from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Campaign from '../../../ethereum/campaign'
import web3 from '../../../ethereum/web3'
import Layout from "../../../components/Layout";
import Link from "next/link";
import { Router } from "next/router";

class RequestNew extends Component {
    state = {
        value: '',
        description: '',
        recepient: '',
        loading: false,
        errorMessage: ''
    };
    static async getInitialProps(props){
         const { address } = props.query;
         return { address };
    }
    onSubmit = async (event) => {
        event.preventDefault();

        const campaign = await Campaign(this.props.address)
        const {description, value, recepient } = this.state;
        const accounts = await web3.eth.getAccounts();
        this.setState({loading: true, errorMessage:''})
        try {
            await campaign.methods.createRequest(
                description, web3.utils.toWei(value, 'ether'), recepient)
                .send({
                    from: accounts[0],
                    gas: '1000000'
                })
          Router.push(`/campaigns/${this.props.address}/requests`)
        } catch (error) {
            this.setState({errorMessage: error.message});
        }
        this.setState({loading: false});
    }
    render() {
        return (
          <Layout>
            <Link href={`/campaigns/${this.props.address}/requests`}>
                <a>Back</a>
            </Link>
            <h3>Create Request</h3>
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>Description</label>
                    <Input 
                        value={this.state.description} 
                        onChange={event => this.setState({description: event.target.value})}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Value in Ether</label>
                    <Input 
                        value={this.state.value}
                        onChange={event => this.setState({value: event.target.value})} 
                    />
                </Form.Field>
                <Form.Field>
                    <label>Recepient</label>
                    <Input 
                        value={this.state.recepient}
                        onChange={event => this.setState({recepient: event.target.value})}
                    />
                </Form.Field>
                <Message error header="Oops" content={this.state.errorMessage} />
                <Button type="submit" primary loading={this.state.loading}>Create!</Button>
            </Form>
          </Layout>
        )   
    }
}

export default RequestNew;