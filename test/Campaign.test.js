const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

let owner; // Factory owner
let manager; // Campaign manager
let contributor; // Campaign contributor

beforeEach(async () => {
  // Get some accounts
  accounts = await web3.eth.getAccounts();
  owner = accounts[0];
  manager = accounts[1];
  contributor = accounts[2];
  vendor = accounts[3];

  // Use account to deploy contract
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({from: owner, gas: 1000000});

  await factory.methods.createCampaign('100').send({
    from: manager, gas: 1000000
  });

  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
  campaign = await new web3.eth.Contract(
    JSON.parse(compiledCampaign.interface),
    campaignAddress
  );
});

describe('CampaignFactory', () => {
  it('deploys a factory instance', () => {
    assert.ok(factory.options.address);
  });
});

describe('Campaign', () => {
  it('deploys a campaign instance', () => {
    assert.ok(campaign.options.address);
  });

  it('marks caller as campaign manager', async () => {
    const newManager = await campaign.methods.manager().call();
    assert.equal(manager, newManager);
  });

  it('accepts new contributor', async () => {
    // Get approversCount
    const oldCount = await campaign.methods.approversCount().call();

    // Contribute
    await campaign.methods.contribute().send({
      from: contributor, value: '1000', gas: 1000000
    });

    // Ensure our contributor is in approvers mapping
    assert(await campaign.methods.approvers(contributor).call());

    // Get approversCount
    const newCount = await campaign.methods.approversCount().call();
    assert(newCount > oldCount);
  });

  it('requires minimum contribution', async () => {
    try {
      campaign.methods.contribute().send({
        from: contributor, value: '50', gas: 1000000
      });
      assert(false);
    }
    catch (err) {
      assert.ok(err);
    }
  });

  it('allows manager to create a payment request', async () => {
    await campaign.methods.createRequest( 'Buy gizmos', '100', vendor ).send({
      from: manager, gas: '1000000'
    });
    const request = await campaign.methods.requests(0).call();
    assert.equal('Buy gizmos', request.description);
    assert.equal('100', request.value);
    assert.equal(vendor, request.recipient);
  });

  it('processes payment requests', async () => {
    // Contributor contributes
    campaign.methods.contribute().send({
      from: contributor, value: '1000', gas: 1000000
    });

    // Manager creates a payment request
    await campaign.methods.createRequest('Buy gizmos', '100', vendor).send({
      from: manager, gas: '1000000'
    });

    // Contributor approves request
    await campaign.methods.approveRequest(0).send({
      from: contributor, gas: '1000000'
    })

    // Manager finalizes request
    const vendorOldBalance = await web3.eth.getBalance(vendor);
    await campaign.methods.finalizeRequest(0).send({
      from: manager, gas: '1000000'
    })

    // Vendor is paid
    const vendorNewBalance = await web3.eth.getBalance(vendor);
    assert(vendorNewBalance > vendorOldBalance);
  });
});
