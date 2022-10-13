import React, { Component} from 'react';
import { Form, Input, Message, Button, Label } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import routes from 'next/router';

class ContributeForm extends Component {
  state = {
    value: '',
    errorMessage: '',
    loading: false
  }

  onSubmit = async (event) => {
    event.preventDefault();
    const campaign = await Campaign(this.props.address);
    this.setState({loading:true, errorMessage:''});
    try{
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from:accounts[0],
        value: web3.utils.toWei(this.state.value, 'ether'),
        gas: '1000000'
      })
      routes.reload(`/campaigns/${this.props.address}`);
    } catch(err) {
      this.setState({errorMessage: err.message})
    }
    this.setState({loading:false});
  }

  render() {
    return (
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} >
          <Form.Field>
            <label>Amount to Contribute</label>
            <Input labelPosition='right' type='text' value={this.state.value} onChange={event => this.setState( { value: event.target.value })}
            />
            <Label>ether</Label>
          </Form.Field>
          <Message error header="Value is less to become contributor!" content={this.state.errorMessage} />
          <Button type='submit' loading={this.state.loading} primary>Contribute</Button>
        </Form>
      )
    };
} 

export default ContributeForm;