import React, { useState, useEffect, useCallback } from "react";
import getEndingSoon from "../../data/leaderboard/getEndingSoon.js";
import {
  marketplaceLink,
  marketplaceLogo,
} from "../../utils/marketplaceHelpers";
import { roundToTwo } from "../../utils/roundToTwo";
import { selectMarketplace } from "../../utils/selectHelpers";
import Image from "../Image";
import Video from "../Video";
import Moment from "react-moment";

export default function EndingSoon() {
  const [auctions, setAuctions] = useState([]);
  const [marketplace, setMarketplace] = useState("all");

  const initGetData = useCallback(async (marketplace) => {
    try {
      const res = await getEndingSoon(marketplace);
      setAuctions(res);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    initGetData(marketplace);
  }, [marketplace, initGetData]);

  function changeSelectMarketplace(event) {
    setMarketplace(event.target.value);
  }

  return (
    <>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase">
        Ending Soon
      </h1>
      {selectMarketplace("lg", changeSelectMarketplace)}
      <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 items-center">
        {auctions.map((auction, index) => (
          <div
            key={index}
            className="group relative p-3 rounded-lg"
            style={{ background: "#1e1e1e" }}
          >
            <div className="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden group-hover:opacity-75 lg:h-60 lg:aspect-none cursor-pointer">
              <a
                href={marketplaceLink(
                  auction.source,
                  auction.mint,
                  auction.brand_name,
                  auction.highest_bidder_username
                )}
                title=""
              >
                {auction.image.split(".").pop().startsWith("mp4") ? (
                  <Video url={auction.image} />
                ) : (
                  <Image url={auction.image} />
                )}
              </a>
            </div>
            <div className="mt-4 flex justify-between">
              <div className="w-full">
                <p></p>
                <p className="mt-1 text-sm">
                  <span>
                    ◎{" "}
                    {auction.highest_bid / 1000000000
                      ? roundToTwo(auction.highest_bid / 1000000000)
                      : roundToTwo(auction.reserve / 1000000000)}
                  </span>
                  <span className="float-right">
                    Bids {auction.number_bids}
                  </span>
                </p>
                <p className="mt-1 text-sm text-gray-400">
                  <Moment
                    date={auction.end_time}
                    format="d[d] hh[h] mm[m]"
                    unix
                    duration={new Date()}
                  />
                  <span className="float-right">
                    {marketplaceLogo(auction.source)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}