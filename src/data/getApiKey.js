import { loginMessage } from "../config/settings";
import apiClient from "./client/apiClient";
import { Buffer } from "buffer";

async function getApiKey(wallet) {
  let nonce = await requestApiKey(wallet.publicKey.toBase58());
  if (typeof nonce === "string") {
    let signature = await signMessage(wallet, nonce);
    let res = await createApiKey(
      wallet.publicKey.toBase58(),
      Buffer.from(signature.signature),
      nonce
    );
    return res;
  }
}

async function signMessage(wallet, nonce) {
  let res = await wallet.signMessage(Buffer.from(loginMessage + nonce));
  return res;
}

async function createApiKey(publicKey, signature, nonce) {
  const res = await apiClient
    .post("/api_key/create", {
      signature: Buffer.from(signature),
      public_key: publicKey,
      nonce: nonce,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
  return res;
}

async function requestApiKey(publicKey) {
  const res = apiClient
    .post("/api_key/request", { public_key: publicKey })
    .then((res) => {
      return res.data.nonce;
    })
    .catch((err) => {
      return err;
    });
  return res;
}

export default getApiKey;
