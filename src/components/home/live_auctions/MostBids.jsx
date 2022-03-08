import React, { useState, useEffect, useCallback } from "react";
import getMostBids from "../../../data/leaderboard/getMostBids.js";
import ShowAuctions from "./auctions/ShowAuctions";

export default function MostBids(props) {
  const [auctions, setAuctions] = useState([]);

  const initGetData = useCallback(async (marketplace) => {
    try {
      const res = await getMostBids(marketplace);
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
