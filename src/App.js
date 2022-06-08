import React, { Component } from "react";
import API from "./apis";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      privatekey: "",
      network: "https://rinkeby.infura.io/v3/c1a5906ba0104dc9894f2b4c28aa0b2c",
      address: "",
    };
  }

  handleInputChange = (e) => {
    this.setState({ privatekey: e.target.value });
  };

  handleSelectChange = (e) => {
    this.setState({ network: e.target.value });
  };

  handleSubmit = (event) => {
    if (this.state.privatekey.length && this.state.network.length) {
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
    return (
      <div className="App">
        <h4>Deploy smart contract to blockchain</h4>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            id="privatekey"
            value={this.state.privatekey}
            onChange={this.handleInputChange}
            required
            placeholder="Enter wallet private key"
          />

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
