import React, { useState, useEffect, useCallback } from "react";
import getHighestBid from "../../../data/leaderboard/getHighestBid.js";
import ShowAuctions from "./auctions/ShowAuctions";

export default function HighestBid(props) {
  const [auctions, setAuctions] = useState([]);

  const initGetData = useCallback(async (marketplace) => {
    try {
      const res = await getHighestBid(marketplace);
      setAuctions(res);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    initGetData(props.marketplace);
  }, [props.marketplace, initGetData]);

  return <ShowAuctions auctions={auctions} />;
}
