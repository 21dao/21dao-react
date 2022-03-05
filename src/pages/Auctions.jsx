import React, { useState, useEffect, useCallback } from "react";
import getAuctions from "../data/auctions/getAuctions";
import LiveAuctions from "../components/auctions/LiveAuctions";
import MainNavigation from "./nav/MainNavigation";

export default function Auctions() {
  const [auctionData, setAuctionData] = useState();

  const initGetAuctionData = useCallback(async () => {
    try {
      const res = await getAuctions();
      setAuctionData(res);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Hook run on page load to init the auction data
  useEffect(() => {
    initGetAuctionData();
  }, [initGetAuctionData]);

  return (
    <div>
      <MainNavigation page={"auctions"} />
      <div className="max-w-2xl mx-auto pb-5 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight mb-3">
          Auctions
        </h2>

        <p>Live auctions by 21dao artists.</p>

        {auctionData && <LiveAuctions auctions={auctionData} />}
      </div>
    </div>
  );
}
