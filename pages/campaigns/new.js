import React, { Component } from "react";
import Layout from "../../components/Layout";
import { Form, Button, Checkbox, Input, Label } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';

class CampaignNew extends Component {
    state = {
      minimumContribution : ''
    }
    onSubmit = async (event) => {
      event.preventDefault();
      const accounts = await web3.eth.getAccounts();
      console.log('Address:' + accounts[0]);
      await factory.methods.createCampaign(this.state.minimumContribution).send({
        from:accounts[0],
        gas: '1000000'
      })
    }
    FormExampleForm = () => (
        <Form onSubmit={this.onSubmit}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input 
              labelPosition='right' type='text' placeholder='Amount' 
              value={this.state.minimumContribution} onChange={event => this.setState( {minimumContribution: event.target.value })}>
              <input />
              <Label>wei</Label>
            </Input>
          </Form.Field>
          <Button type='submit'>Create!</Button>
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