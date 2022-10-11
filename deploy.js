import HDWalletProvider from '@truffle/hdwallet-provider';
import Web3 from 'web3';

const provider = new HDWalletProvider(
  'corn inmate sorry please chef smooth hour argue erupt meat differ frequent',
  'https://sepolia.infura.io/v3/c24f61d37f764ef0841ed632141835d0'
);
import compiledFactory from './build/contracts/CampaignFactory.json' assert { type: "json"}

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(
    compiledFactory.abi
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
};
deploy();