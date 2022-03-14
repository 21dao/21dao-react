import React, { useState, useEffect } from "react";
import getApiKey from "../../data/getApiKey";
import { error } from "../../utils/error";
import { environment } from "../../utils/environment";
import PhantomLogo from "../../assets/images/phantom-icon-purple.png";

function ConnectToPhantom(props) {
  const [phantom, setPhantom] = useState();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    sleep(100).then(() => {
      if ("solana" in window) {
        setPhantom(window["solana"]);
      }
    });
    return () => {
      setPhantom();
    };
  }, []);

  function establishConnection() {
    setConnected(true);
    _getApiKey(phantom)
      .then((apiKey) => {
        props.onConnect(phantom, apiKey);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    phantom?.connect({ onlyIfTrusted: true });

    phantom?.on("connect", () => {
      establishConnection();
    });

    phantom?.on("disconnect", () => {
      setConnected(false);
    });
  }, [phantom]);

  const connectHandler = () => {
    phantom?.connect();
  };

  const disconnectHandler = () => {
    phantom?.disconnect();
    props.onDisconnect();
  };

  async function _getApiKey(wallet) {
    let apiKey = localStorage.getItem(environment + "_api_key");

    if (!apiKey) {
      let res = await getApiKey(wallet);
      if (res.data.status === "success") {
        localStorage.setItem(environment + "_api_key", res.data.api_key);
        return res.data.api_key;
      } else {
        localStorage.removeItem(environment + "_api_key");
        wallet.disconnect();
        error(res.data.msg);
      }
    } else {
      return apiKey;
    }
  }

  function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  return (
    <>
      {connected && (
        <button onClick={disconnectHandler} className="phantom-button">
          <img src={PhantomLogo} alt="" />
          <span>Disconnect</span>
        </button>
      )}
      {phantom && !connected && (
        <button onClick={connectHandler} className="phantom-button">
          <img src={PhantomLogo} alt="" />
          <span>Connect Phantom</span>
        </button>
      )}
      {!phantom && (
        <a
          href="https://phantom.app/"
          target="_blank"
          rel="noreferrer"
          className="bg-purple-500 px-4 py-2 border border-transparent rounded-md text-base font-medium text-white"
        >
          Get Phantom
        </a>
      )}
    </>
  );
}

export default ConnectToPhantom;
