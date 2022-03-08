import React, { useState } from "react";
import {
  selectMarketplace,
  selectAuctionView,
} from "../../utils/selectHelpers";
import EndingSoon from "./live_auctions/EndingSoon";
import HighestBid from "./live_auctions/HighestBid";
import MostBids from "./live_auctions/MostBids";

export default function LiveAuctions() {
  const [marketplace, setMarketplace] = useState("all");
  const [sortBy, setSortBy] = useState("ending");

  function changeSelectMarketplace(event) {
    setMarketplace(event.target.value);
  }

  function changeSelectAuctionView(event) {
    setSortBy(event.target.value);
  }

  return (
    <>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase">
        Live Auctions
      </h1>
      {selectMarketplace("lg", changeSelectMarketplace)}
      {selectAuctionView("lg", changeSelectAuctionView)}
      {sortBy === "ending" && <EndingSoon marketplace={marketplace} />}
      {sortBy === "highest" && <HighestBid marketplace={marketplace} />}
      {sortBy === "bids" && <MostBids marketplace={marketplace} />}
    </>
  );
}
