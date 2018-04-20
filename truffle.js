module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
      ,gas:6712388
      ,gasPrice: 1
    },
    remote:{
      host: "52.179.4.144",
      port: 22000,
      network_id: '*'
      //,from:'0x82300f77f7f8a925f3156294b2cad52506cca52c' //default account is [0] if not specified
      ,gas:450000
    },
    remotetg:{
      host: "ethrus-dns-reg1.eastus.cloudapp.azure.com",
      port: 8545,
      network_id: '*',
      gas:450000
      //password: P@ssw0rd123!
      //,from:'0x82300f77f7f8a925f3156294b2cad52506cca52c' //default account is [0] if not specified
    },
    ropsten:  {
      network_id: 3,
      host: "localhost",
      port:  8545,
      gas:  450000
    }
  },
  rpc: {
    host: "127.0.0.1",
    port: 8545
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
};
