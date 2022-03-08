import React, { useState, useEffect, useCallback } from "react";
import getEndingSoon from "../../../data/leaderboard/getEndingSoon.js";
import ShowAuctions from "./auctions/ShowAuctions";

export default function EndingSoon(props) {
  const [auctions, setAuctions] = useState([]);

  const initGetData = useCallback(async (marketplace) => {
    try {
      const res = await getEndingSoon(marketplace);
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
