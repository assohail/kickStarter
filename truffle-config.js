const HDWalletProvider = require('truffle-hdwallet-provider');

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 7545,
      network_id: "*", // Match any network id
      gas: 5000000
    },
    rinkeby: {           
      provider: () => new HDWalletProvider(process.env.MNEMONIC, "https://rinkeby.infura.io/v3/"+process.env.INFURA_API_KEY),
      network_id: 4,    
    },
    sepolia: {           
      provider: () => new HDWalletProvider(process.env.MNEMONIC, "https://sepolia.infura.io/v3/c24f61d37f764ef0841ed632141835d0"),
      network_id: 11155111,    
    },
    compilers: {
      solc: {
        settings: {
          optimizer: {
          enabled: true, // Default: false
          runs: 200,      // Default: 200
          }
        },
      version: "^0.8.0"
    }
  },
 },
}
