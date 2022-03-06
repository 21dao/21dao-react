import React from "react";
import Moment from "react-moment";
import {
  marketplaceLink,
  marketplaceLogo,
} from "../../utils/marketplaceHelpers";
import Image from "../Image";
import Video from "../Video";

export default function LiveAuctions(props) {
  const auctions = props.auctions;

  return (
    <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {auctions.map((auction, index) => (
        <div
          key={index}
          className="group relative p-3 rounded-lg"
          style={{ background: "#1e1e1e" }}
        >
          <div className="w-full min-h-80 aspect-w-1 aspect-h-1 rounded-lg overflow-hidden group-hover:opacity-75 lg:h-60 lg:aspect-none cursor-pointer">
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
                <Video url={auction.image} mint={auction.mint} />
              ) : (
                <Image url={auction.image} mint={auction.mint} />
              )}
            </a>
          </div>
          <div className="mt-4 flex justify-between">
            <div className="w-full">
              <h3 className="text-sm font-medium float-left">
                {auction.brand_name}
              </h3>
              <p className="float-right">{marketplaceLogo(auction.source)}</p>
              <p className="clear-both"></p>
              <p className="mt-1 text-sm">
                <span>
                  ◎{" "}
                  {auction.highest_bid / 1000000000
                    ? auction.highest_bid / 1000000000
                    : auction.reserve / 1000000000}
                </span>
                <span className="float-right">Bids {auction.number_bids}</span>
              </p>
              <p className="mt-1 text-sm text-gray-400">
                Time left{" "}
                <Moment
                  date={auction.end_time}
                  format="d[d] hh[h] mm[m] ss[s]"
                  unix
                  duration={new Date()}
                />
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
