import Web3 from 'web3';
// const web3 = new Web3(window.web3.currentProvider);

let web3;
if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    // we are in the browser and metamask is running
    web3 = new Web3(window.web3.currentProvider);
} else {
    // we are on the server *OR* the user os not running metamask
    const provider = new Web3.providers.HttpProvider('https://sepolia.infura.io/v3/c24f61d37f764ef0841ed632141835d0');
    web3 = new Web3(provider);
}
export default web3;