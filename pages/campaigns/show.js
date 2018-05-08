import React, { Component } from 'react';
import { Button, Card, Grid } from 'semantic-ui-react';
import Layout from '../../components/Layout';
// import factory from '../../ethereum/factory';
import Campaign from '../../ethereum/campaign.js';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';

class CampaignShow extends Component {

  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();
    return {
      address: props.query.address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4]
    };
  }

  renderCards() {
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount
    } = this.props;

    const items = [
      {
        header: manager,
        meta: 'Campaign Manager',
        description: 'The manager created this campaign and can create fund transfer requests.',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: minimumContribution + " wei",
        meta: 'Minimum Contribution (wei)',
        description: 'To become a constributor and approver, one must contribute at least amount.'
      },
      {
        header: requestsCount,
        description: 'Requests are requests from the manager to the approvers to transfer money to a vendor or other entity to move this campaign forward.',
        meta: 'Number of requests'
      },
      {
        header: approversCount,
        description: 'This is the number of contributors/approvers for this campaign.',
        meta: 'Number of Contributors/Approvers'
      },
      {
        header: web3.utils.fromWei(balance, 'ether') + " ether",
        meta: 'Campaign Balance',
        description: 'Funds remaining in this campaign.'
      },
    ]

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>Campaign:</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              {this.renderCards()}
            </Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary>View Requests</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    )
  }
}

export default CampaignShow;
