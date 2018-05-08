// Use newer version of web3 and connect it to the injected web3's provider.
import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  // In browser with MetaMask
  web3 = new Web3(window.web3.currentProvider);
}
else {
  // We are on the server (Node) or, no MetaMask
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/xuJkYWc4lCAqtxCk9lcM'
  )
  web3 = new Web3(provider);
}

export default web3;
