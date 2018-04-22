const express = require('express');
const apiRouter = express.Router();

const bodyParser = require('body-parser');
var jsonParser = bodyParser.json()

var web3 = require('web3');
web3.providers.HttpProvider('http://localhost:8545');

const getLocations = (req, res) => {
  res.send(["hello!", "how doing?"]);
}

apiRouter.get('/locations', getLocations);

apiRouter.get('/character/:charKey', (req, res) => {
  //var abi = import CharacterMeta from '';
  const abi = require('./meta/CharacterMeta');
  console.log(abi);
  
  var character = new web3.eth.Contract(abi, req.params.charKey);

  character.methods.getData().call().then(
      function(resp) {
          res.send(resp);
      }
  ).catch(function(err) { console.log(err); });
  
});

apiRouter.get('/signUp/', (req,res)=> {

  // update a paratemer in the contract. 
  var contractInstance;
  var contractCompiled = require('../../../build/contracts/Company.json');
  var contractAbi = contractCompiled.abi;
  var newContract = new web3.eth.Contract(contractAbi);

  var contractCode = contractCompiled.bytecode;

  var myContract = new web3.eth.Contract(contractAbi,{from:web3.eth.accounts[0], data:contractCode, gas:3000000});
  
  var defaultAccount = web3.eth.accounts[0]; // THIS IS NOT WORKING FOR SOME REASON
  console.log("WEB3 ACCOUNT LIST: " + defaultAccount);

  myContract.deploy({
    arguments: []
  })
  .send({
      from: '0x913199e0522ed92ef8769f8bec27c00105fb65f6', // THIS WAS TAKEN FROM GANACHE CLI
      gas: 1500000,
      gasPrice: '0'
  }, function(error, transactionHash){ console.log("TX Hash:" + transactionHash) })
  // .on('error', function(error){ console.log(error) })
  // .on('transactionHash', function(transactionHash){ console.log(transactionHash) })
  // .on('receipt', function(receipt){
  //    console.log(receipt.contractAddress) // contains the new contract address
  // })
  //.on('confirmation', function(confirmationNumber, receipt){ console.log(confirmationNumber) })
  .then(function(newContractInstance){
      console.log("CONTRACT ADDRESS: " + newContractInstance.options.address) // instance with the new contract address
  });

});

apiRouter.get('/update/:contractAddress/:name', (req,res)=> {
  
  var contractCompiled = require('../../../build/contracts/Company.json');
  var contractAbi = contractCompiled.abi;
  var contractCode = contractCompiled.bytecode;
  
  var _contractInstance = new web3.eth.Contract(contractAbi,req.params.contractAddress);

  _contractInstance.methods.setName(req.params.name).send({from:'0x913199e0522ed92ef8769f8bec27c00105fb65f6'})
  .then(function(receipt) {
    console.log("TX Hash: "+ receipt.transactionHash);
  });

});

apiRouter.get('/viewResults/:contractAddress', (req,res)=> {

  var contractCompiled = require('../../../build/contracts/Company.json');
  var contractAbi = contractCompiled.abi;
  
  var _contractInstance = new web3.eth.Contract(contractAbi,req.params.contractAddress);

  _contractInstance.methods.getName().call().then(function(v) {
    var strName= v.toString();
    console.log("Name: "+ strName);   
  });

});

apiRouter.post('/registerEmployee', jsonParser, (req, res) => {

  var contractCompiled = require('../../../build/contracts/Company.json');
  var contractAbi = contractCompiled.abi;
  var contractCode = contractCompiled.bytecode;
  
  var contractInstance = new web3.eth.Contract(contractAbi, req.body.contract_address, {from:web3.eth.accounts[0], data:contractCode, gas:3000000});

  web3.eth.personal.unlockAccount('0x567ec45b7275553386d9be132d50710f3ca6e12f',"0x00af1971ed38f11cc10c2f42331d7b7f64866ed623c57e090f1fe85ea6b87dff","120");
  
  contractInstance.methods.registerEmployee(req.body.address).send({from: '0x567ec45b7275553386d9be132d50710f3ca6e12f'}).then(function(v) {
    console.log(req.body.address + " registered!");
  }).catch(function(e) {
    console.log(e);
  });

});

module.exports = apiRouter;