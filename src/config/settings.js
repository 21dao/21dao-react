const dev = {
  apiHost: "https://dao21-api-me4qf.ondigitalocean.app",
  host: "https://dao21-7su7t.ondigitalocean.app",
};

const prod = {
  apiHost: "https://dao21-api-me4qf.ondigitalocean.app",
  host: "https://dao21-7su7t.ondigitalocean.app",
};

const config = process.env.REACT_APP_STAGE === "production" ? prod : dev;

export const rpcHost = "https://ssc-dao.genesysgo.net/";
export const apiHost = config.apiHost;
export const host = config.host;
export const loginMessage = "Please sign this message to log-in. ";
export const cdnUrl = "https://cdn.looksrare.so";
