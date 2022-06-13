import React, { Component } from "react";
import API from "./apis";
import Web3 from 'web3';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      network: "https://rinkeby.infura.io/v3/c1a5906ba0104dc9894f2b4c28aa0b2c",
      address: "",
      account:""
    };
  }

  connectWallet = async () => {
    try {
      let web3 = new Web3(Web3.givenProvider);
      if (typeof window.web3 != 'undefined') {
        web3 = new Web3(window.ethereum);
      } else {
        return { status: false };
      }
      let account = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      return { status: true, account: account[0] };
    } catch (error) {
      console.log('error', error?.message);
      return { status: false };
    }
  };

  onConnectWallet = async () => {
    if (window.ethereum) {
      let response = await this.connectWallet();
      if (response.status) {
        this.setState({account: response.account});
        alert('Successfully connected!');
      } else {
        alert('Something went wrong!');
      }
    } else {
      alert(
        'Please install Metamask wallet extension to use this app.'
      );
      setTimeout(() => {
        let popup = window.open('https://metamask.io/', '_blank');
        if (popup) {
          popup.focus();
        } else {
          alert(
            'You have disabled popups. Please enable the popups or follow this link: https://metamask.io/'
          );
        }
      }, 3000);
    }
  };


  handleSelectChange = (e) => {
    this.setState({ network: e.target.value });
  };

  handleSubmit = (event) => {
    if (this.state.network.length) {
      API.post("/deploy", this.state)
        .then((res) => {
          const { data } = res;
          this.setState({ address: data.address });
          console.log(data);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }

    event.preventDefault();
  };

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <h4>Deploy smart contract to blockchain</h4>
        <button
          onClick={this.onConnectWallet}
        >
          Connect wallet
        </button>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="network">Choose a testnet network:</label>

          <select
            name="network"
            id="network"
            onChange={this.handleSelectChange}
            required
          >
            <option value="https://rinkeby.infura.io/v3/c1a5906ba0104dc9894f2b4c28aa0b2c">
              rinkeby
            </option>
            <option value="https://ropsten.infura.io/v3/c1a5906ba0104dc9894f2b4c28aa0b2c">
              ropsten
            </option>
            <option value="https://data-seed-prebsc-1-s1.binance.org:8545">
              Binance
            </option>
            <option value="https://rpc-mumbai.matic.today">
              Polygon Mumbai
            </option>
          </select>

          <button id="btnDeploy">Deploy Smart Contract</button>

          {this.state.address && (
            <>
              <h4>Your Deployed Contract Address</h4>
              <h3>{this.state.address} </h3>
            </>
          )}
        </form>
      </div>
    );
  }
}

export default App;
