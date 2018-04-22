import React, { Component } from 'react';
import { Connect, SimpleSigner } from 'uport-connect'
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom'

export let uport = new Connect('Service Delivery Identifier', {
    clientId: '2ojiXHQ9VSeiar1SZrWjqEUoRGLmTfamxBU',
    network: 'rinkeby',
    signer: SimpleSigner('698e8a7e26ce35c9617b1e524db00edb7eb4c9af17e428c1fb2994cc70b6b5fe')
})

export const web3 = uport.getWeb3();

var mnid = require('mnid');

class MainArea extends Component {

  constructor(props) {
    super(props);
    this.state = {credentialsReceived: false};
  }
s
  render() {
    
    uport.requestCredentials({
      requested: ['name', 'phone', 'country'],
      notifications: true // We want this if we want to recieve credentials
    }).then((credentials) => {
      this.credentialsReceived = true;
      var signerAddress = mnid.decode(credentials.address);
      
      var contractCompiled = require('./contract/Company.json');
      var contractAbi = contractCompiled.abi;
      var contractCode = contractCompiled.bytecode;
      
      var contract = web3.eth.contract(contractAbi);//, "0xb841cc9fc4db660c64c8928cd86fc00284552744", {from:signerAddress.address, data:contractCode, gas:3000000});
      var contractInstance = contract.at("0xb841cc9fc4db660c64c8928cd86fc00284552744");

      contractInstance.registerEmployee(signerAddress.address, {from:signerAddress.address, data:contractCode, gas:3000000}, function(result) {
        
        // do a thing

      });

    })

    return (
      <div></div>
    );
  }

}

export default MainArea;
