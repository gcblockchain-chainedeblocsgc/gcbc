var Company = artifacts.require('./Company.sol');

module.exports = function(deployer, network, accounts) {
    // deployer.deploy(Company, {gas: 50000, from: accounts[0], privateFor: ["ROAZBWtSacxXQrOe3FGAqJDyJjFePR5ce4TSIzmJ0Bc="]});
    deployer.deploy(Company, {gas: 4000000, from: accounts[0]});
};