require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: "https://eth-ropsten.alchemyapi.io/v2/AdJFGvs7-P8E2yUtCuHbY0Jz0hXra_Q0",
      accounts: ['f14a058c9828f9f53945bc8969a0e681524f0029772a8d63e1b7cdcf4f5534a6']
    }
  }
}