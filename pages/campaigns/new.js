import React, { Component } from "react";
import Layout from "../../components/Layout";
import { Form, Button, Checkbox, Input, Label, Message} from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import Router from "next/router";

class CampaignNew extends Component {
    state = {
      minimumContribution : '',
      errorMessage: '',
      loading: ''
    }
    onSubmit = async (event) => {

      event.preventDefault();
      this.setState({loading:true, errorMessage:''});
      try{
        const accounts = await web3.eth.getAccounts();
        await factory.methods.createCampaign(this.state.minimumContribution).send({
          from:accounts[0],
          gas: '1000000'
        })
        Router.push('/');
      } catch(err) {
        this.setState({errorMessage: err.message})
      }
      this.setState({loading:false});
    }

    FormExampleForm = () => (
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input 
              labelPosition='right' type='text' placeholder='Amount' 
              value={this.state.minimumContribution} onChange={event => this.setState( {minimumContribution: event.target.value })}>
              <input />
              <Label>wei</Label>
            </Input>
          </Form.Field>
          <Message error header="You must register before you can do that!" content={this.state.errorMessage} />
          <Button type='submit' loading={this.state.loading} primary>Create!</Button>
        </Form>
    )

    render() {
        return (
            <Layout>
                <h2>Create Campaign!</h2>
                {this.FormExampleForm()}
            </Layout>
        )
    }
}

export default CampaignNew;