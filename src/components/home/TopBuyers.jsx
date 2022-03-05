import React, { useState, useEffect, useCallback } from "react";
import getTopBuyers from "../../data/leaderboard/getTopBuyers.js";
import { buyerLink } from "../../utils/marketplaceHelpers";
import { roundToTwo } from "../../utils/roundToTwo";
import { selectDays, selectMarketplace } from "../../utils/selectHelpers";

export default function TopBuyers() {
  const [auctions, setAuctions] = useState([]);
  const [days, setDays] = useState(1);
  const [marketplace, setMarketplace] = useState("all");

  const initGetData = useCallback(async (days, marketplace) => {
    try {
      const res = await getTopBuyers(days, marketplace);
      setAuctions(res);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    initGetData(days, marketplace);
  }, [days, marketplace, initGetData]);

  function changeSelectDays(event) {
    setDays(event.target.value);
  }

  function changeSelectMarketplace(event) {
    setMarketplace(event.target.value);
  }

  return (
    <>
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase mb-0">
        Top Buyers
      </h1>
      {selectDays("md", changeSelectDays)}
      {selectMarketplace("lg", changeSelectMarketplace)}
      <div className="flex flex-col mt-6">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-black sm:rounded-lg">
              <table className="min-w-full max-w-full divide-y overflow-hidden">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Address
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Auctions
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Bids
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {auctions.map((auction, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300 text-sm">
                        <a
                          href={buyerLink(auction.highest_bidder)}
                          title={auction.brand_name}
                        >
                          {auction.highest_bidder.substr(0, 4)}...
                          {auction.highest_bidder.slice(-4)}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                        {auction.auctions}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-300">
                        ◎ {roundToTwo(auction.total / 1000000000)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {auction.bids}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
