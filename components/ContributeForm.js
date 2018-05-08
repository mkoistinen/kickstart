import React, { Component } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class ContributeForm extends Component {
  state = {
    value: '',
    errorMessage: '',
    loading: false
  };

  onSubmit = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    const campaign = Campaign(this.props.address);
    const wei = web3.utils.toWei(this.state.value, 'ether');
    const minimumContribution = await campaign.methods.minimumContribution().call();

    this.setState({ loading: true, errorMessage: '' });

    try {
      if (isNaN(wei) || wei < minimumContribution) {
        throw "The Minimum Contribution is " + minimumContribution + " wei";
      }
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: wei
      });
      Router.replaceRoute(`/campaigns/${this.props.address}`);
    }
    catch (err) {
      console.log(err);
      this.setState({ errorMessage: err.message || err });
    }

    this.setState({ loading: false });
  }

  render () {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Amount to contribute</label>
          <Input
            value={this.state.value}
            onChange={event => this.setState({ value: event.target.value })}
            label="ether"
            labelPosition="right"
          />
          <Message error header="Oops" content={this.state.errorMessage} />
          <Button primary loading={this.state.loading}>Contribute!</Button>
        </Form.Field>
      </Form>
    )
  };
}

export default ContributeForm
