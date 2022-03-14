import ConnectToPhantom from "../components/wallet/ConnectToPhantom";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const navigate = useNavigate();

  function onConnect() {
    navigate("/dashboard");
  }

  function onDisconnect() {
    console.log("disconnected");
  }

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 style={{ fontWeight: "bold", fontSize: "44px" }}>
              <span className="text-gray-300">21</span>
              <span className="text-gray-400 ml-1">dao</span>
            </h1>
            <h2 className="mt-6 text-center text-3xl font-extrabold">
              Connect your Wallet
            </h2>
            <p className="mt-2 text-center text-sm">
              You will be asked to sign a message to prove your wallet
              ownership.
            </p>
          </div>
          <div className="text-center">
            <ConnectToPhantom
              onConnect={onConnect}
              onDisconnect={onDisconnect}
            />
          </div>
        </div>
      </div>
    </>
  );
}
