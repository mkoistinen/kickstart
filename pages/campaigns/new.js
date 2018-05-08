import React, { Component } from 'react';
import { Button, Form, Icon, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class CampaignNew extends Component {
  state = {
    minimumContribution: '',
    errorMessage: '',
    loading: false
  }

  onSubmit = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    let minimumContribution = parseInt(this.state.minimumContribution, 10);

    this.setState({ loading: true, errorMessage: '' });

    try {
      if (isNaN(minimumContribution) || minimumContribution < 0) {
        throw "The Minimum Contribution must be a non-negative whole number.";
      }
      await factory.methods.createCampaign('' + minimumContribution).send({
        from: accounts[0]
      });
      Router.pushRoute('/');
    }
    catch (err) {
      this.setState({ errorMessage: err.message || err });
    }

    this.setState({ loading: false });
  }

  onCancel = (event) => {
    event.preventDefault;
    Router.pushRoute('/');
  }

  render() {
    return (
      <Layout>
        <h3>Create a New Campaign</h3>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label="wei"
              labelPosition='right'
              value={this.state.minimumContribution}
              onChange={ event => this.setState({ minimumContribution: event.target.value })}
            />
            <Message error header="Oops" content={this.state.errorMessage} />
            <Button primary loading={this.state.loading}>Create</Button>
            <Button onClick={this.onCancel}>Cancel</Button>
          </Form.Field>
        </Form>
      </Layout>
    )
  }
}

export default CampaignNew;
