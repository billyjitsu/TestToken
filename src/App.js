import "./styles/App.css";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import testToken from "./utils/testToken.json";

// Constants
const CONTRACT_ADDRESS = "0x4cF3a31Cd55585D624104aE352dec36b91042B02";
const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [toMint, setToMint] = useState(0);
  const [toWho, setToWho] = useState("");
  const [toAirdrop, setToAirdrop] = useState("");
  const [toBuy, setToBuy] = useState(0);


  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });
    // const chain = await window.ethereum.request({ method: "eth_chainId" });
  
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found");
    }
  };

  



  const askContractToMint = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          testToken.abi,
          signer
        );

        console.log("Going to pop wallet now to pay gas...");
        
        let tokenTxn = await connectedContract.mint(toWho, ethers.utils.parseEther(toMint));

        console.log("Mining...please wait.");
        await tokenTxn.wait();

        console.log(
          `Mined, see transaction: https://rinkeby.etherscan.io/tx/${tokenTxn.hash}`
        );
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const askContractToFaucet = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          testToken.abi,
          signer
        );

        console.log("Going to pop wallet now to pay gas...");
        
        let tokenTxn = await connectedContract.faucet();

        console.log("Mining...please wait.");
        await tokenTxn.wait();

        console.log(
          `Mined, see transaction: https://rinkeby.etherscan.io/tx/${tokenTxn.hash}`
        );
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const askContractToAirdrop = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          testToken.abi,
          signer
        );

        console.log("Going to pop wallet now to pay gas...");
        
        const air = toAirdrop.toString()
        console.log("airdrop to string:", air)
        const air2 = air.split(',');
        console.log("array:", air2);
       // let tokenTxn = await connectedContract.airdrop([(air)]);
       let tokenTxn = await connectedContract.airdrop([("")]);

        console.log("Mining...please wait.");
        await tokenTxn.wait();

        console.log(
          `Mined, see transaction: https://rinkeby.etherscan.io/tx/${tokenTxn.hash}`
        );
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const askContractToBuy = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          testToken.abi,
          signer
        );

        console.log("Going to pop wallet now to pay gas...");
        
        let payment = String(toBuy * 0.001);
        let totalGas = String(toBuy * 300000);
        let tokenTxn = await connectedContract.buy(ethers.utils.parseEther(toBuy), {
          gasLimit: totalGas,
          value: ethers.utils.parseEther(payment),
        });

        console.log("Mining...please wait.");
        await tokenTxn.wait();

        console.log(
          `Mined, see transaction: https://rinkeby.etherscan.io/tx/${tokenTxn.hash}`
        );
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const askContractToWithdraw = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          testToken.abi,
          signer
        );

        console.log("Going to pop wallet now to pay gas...");
        
        let tokenTxn = await connectedContract.withdraw();

        console.log("Mining...please wait.");
        await tokenTxn.wait();

        console.log(
          `Mined, see transaction: https://rinkeby.etherscan.io/tx/${tokenTxn.hash}`
        );
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);


  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">Token Shop</p>
          <p className="sub-text">The Best Token</p>

          <div>
          <button
              onClick={connectWallet}
              className="cta-button connect-wallet-button"
            >
              Connect Wallet
            </button>
            <div></div>
            

            <button
              onClick={askContractToMint}
              className="cta-button connect-wallet-button"
            >
              Mint Token
            </button>
            <p></p>
            <input
              onChange={(e) => setToWho(e.target.value)}
              placeHolder="Address to Sent to"
            ></input>
            <input
              onChange={(x) => setToMint(x.target.value)}
              placeHolder="Enter Total Amount"
            ></input>

            <div></div>
            <p></p>
            <button
              onClick={askContractToFaucet}
              className="cta-button connect-wallet-button"
            >
              Faucet
            </button>
          <div></div>

          <p></p>
            <button
              onClick={askContractToAirdrop}
              className="cta-button connect-wallet-button"
            >
              Airdrop
            </button>
            <p></p>
           
            <input
              onChange={(s) => setToAirdrop(s.target.value)}
              placeHolder="Enter Addresses"
            ></input>
            <p></p>

            <div></div>
            <button
              onClick={askContractToBuy}
              className="cta-button connect-wallet-button"
            >
              Buy
            </button> 
            <div></div>
            <input
              onChange={(t) => setToBuy(t.target.value)}
              placeHolder="How many"
            ></input>

            <div></div>
            <p></p>
            <button
              onClick={askContractToWithdraw}
              className="cta-button connect-wallet-button"
            >
              Withdraw
            </button> 

          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
