import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';
import { Router } from '../routes';

class RequestRow extends Component {
  state = {
    loadingApprove: false,
    loadingFinalize: false
  }

  onApprove = async (event) => {
    event.preventDefault();

    const campaign = Campaign(this.props.address);
    const accounts = await web3.eth.getAccounts();

    this.setState({ loadingApprove: true });
    try {
      await campaign.methods.approveRequest(this.props.id).send({
        from: accounts[0]
      });
      Router.pushRoute(`/campaigns/${this.props.address}/requests`);
    }
    catch (err) {
      // Ignore?
    }
    this.setState({ loadingApprove: false });
  };

  onFinalize = async (event) => {
    event.preventDefault();

    const campaign = Campaign(this.props.address);
    const accounts = await web3.eth.getAccounts();

    this.setState({ loadingFinalize: true });
    try {
      await campaign.methods.finalizeRequest(this.props.id).send({
        from: accounts[0]
      });
      Router.pushRoute(`/campaigns/${this.props.address}/requests`);
    }
    catch (err) {
      // ignore?
    }

    this.setState({ loadingFinalize: false });
  }

  render () {
    const { Row, Cell } = Table;
    const { id, request, approversCount } = this.props;
    const { description, value, recipient, approvalCount, complete } = this.props.request;
    const approved = (approvalCount >= approversCount / 2);

    return (
      <Row disabled={complete} positive={approved && !complete}>
        <Cell>{id}</Cell>
        <Cell>{description}</Cell>
        <Cell>{ web3.utils.fromWei(value, 'ether') } ether</Cell>
        <Cell>{recipient}</Cell>
        <Cell>{approvalCount}/{approversCount}</Cell>
        <Cell>
          {complete ? null : (
            <Button basic color="green" onClick={this.onApprove} loading={this.state.loadingApprove}>Approve</Button>
          )}
        </Cell>
        <Cell>
          {complete || !approved ? null : (
            <Button basic color="teal" onClick={this.onFinalize} loading={this.state.loadingFinalize} disabled={complete}>Finalize</Button>
          )}
        </Cell>
      </Row>
    );
  }
}

export default RequestRow;
