import React, { Component } from 'react';
import { Connect, SimpleSigner } from 'uport-connect'
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom'

export let uport = new Connect('Service Delivery Identifier', {
    clientId: '2ojiXHQ9VSeiar1SZrWjqEUoRGLmTfamxBU',
    network: 'rinkeby',
    signer: SimpleSigner('698e8a7e26ce35c9617b1e524db00edb7eb4c9af17e428c1fb2994cc70b6b5fe')
})

export const web3 = uport.getWeb3()

class MainArea extends Component {

  credentialsReceived = {
    redirect: false
  }

  componentDidMount() {
    
  }

  render() {
    
    uport.requestCredentials({
      requested: ['name', 'phone', 'country'],
      notifications: true // We want this if we want to recieve credentials
    }).then((credentials) => {
      this.credentialsReceived = true;

      fetch('http://localhost:5000/api/registerEmployee/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: credentials.address,
          contract_address: '0xb841cc9fc4db660c64c8928cd86fc00284552744' // mock contract address they are joining
        })
      })

    })

    const { redirect } = this.credentialsReceived;

    if (redirect) {
      console.log("asdad");
      return <Redirect to='www.google.ca'/>;
    }

    return (
      <div></div>
    );
  }

}

export default MainArea;
