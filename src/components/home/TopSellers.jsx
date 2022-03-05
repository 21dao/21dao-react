import React, { useState, useEffect, useCallback } from "react";
import getTopSellers from "../../data/leaderboard/getTopSellers.js";
import { sellerLink, marketplaceLogo } from "../../utils/marketplaceHelpers";
import { roundToTwo } from "../../utils/roundToTwo";
import { selectDays, selectMarketplace } from "../../utils/selectHelpers";

export default function TopSellers() {
  const [auctions, setAuctions] = useState([]);
  const [days, setDays] = useState(1);
  const [marketplace, setMarketplace] = useState("all");

  const initGetData = useCallback(async (days, marketplace) => {
    try {
      const res = await getTopSellers(days, marketplace);
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
        Top Sellers
      </h1>
      {selectDays("md", changeSelectDays)}
      {selectMarketplace("lg", changeSelectMarketplace)}
      <div className="flex flex-col mt-6">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-black sm:rounded-lg">
              <table className="min-w-full divide-y">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Name
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
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Marketplace
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {auctions.map((auction, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a
                          href={sellerLink(auction.source, auction.brand_name)}
                          title={auction.brand_name}
                        >
                          {auction.brand_name.slice(0, 12)}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {auction.auctions}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        ◎ {roundToTwo(auction.total / 1000000000)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {auction.bids}
                      </td>
                      <td className="px-6 py-4 pr-0 whitespace-nowrap text-sm">
                        {marketplaceLogo(auction.source)}
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
