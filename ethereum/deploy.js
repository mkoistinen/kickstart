const path = require('path');
const fs = require('fs');
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const mnemonicPath = path.resolve(__dirname, 'deploy_mnemonic.key');
const mnemonicList = fs.readFileSync(mnemonicPath, 'utf8').trim();

const provider = new HDWalletProvider(
  mnemonicList,
  '[INSERT YOUR OWN INFURA URL HERE]'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];

  console.log('Attempting to deploy from account', account);

  // const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
  //   .deploy({ data: '0x' + compiledFactory.bytecode })
  //   .send({ gas: '2500000', from: account });
  //
  // console.log('Contract address:', result.options.address);
};

deploy();

// 0x42313d9E3C8174d697A208DE60E0616290e29D83
