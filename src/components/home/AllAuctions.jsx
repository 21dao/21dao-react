import React, { useState, useEffect, useCallback } from "react";
import getAllAuctions from "../../data/leaderboard/getAllAuctions.js";
import {
  selectMarketplace,
  selectAuctionView,
} from "../../utils/selectHelpers";
import ShowAuctions from "./ShowAuctions";

export default function AllAuctions() {
  const [auctions, setAuctions] = useState();
  const [marketplace, setMarketplace] = useState("all");
  const [sortBy, setSortBy] = useState("ending");

  const initGetData = useCallback(async (marketplace, sortBy) => {
    try {
      const res = await getAllAuctions(marketplace, sortBy);
      setAuctions(res);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    initGetData(marketplace, sortBy);
  }, [marketplace, sortBy, initGetData]);

  function changeSelectMarketplace(event) {
    setMarketplace(event.target.value);
  }

  function changeSelectAuctionView(event) {
    setSortBy(event.target.value);
  }

  return (
    <>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase">
        Active Auctions
      </h1>
      {selectMarketplace("lg", changeSelectMarketplace)}
      {selectAuctionView("lg", changeSelectAuctionView)}
      {auctions && <ShowAuctions auctions={auctions} />}
    </>
  );
}
