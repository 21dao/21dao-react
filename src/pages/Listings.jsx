import React, { useState, useEffect, useCallback } from "react";
import getListings from "../data/listings/getListings";
import AllListings from "../components/listings/AllListings";
import MainNavigation from "./nav/MainNavigation";

export default function Listings() {
  const [listingsData, setListingsData] = useState();

  const initGetListingsData = useCallback(async () => {
    try {
      const listings = await getListings();
      setListingsData(listings);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Hook run on page load to init the listings data
  useEffect(() => {
    initGetListingsData();
  }, [initGetListingsData]);

  return (
    <div>
      <MainNavigation page={"listings"} />
      <div className="max-w-2xl mx-auto pb-5 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight mb-3">
          Listings
        </h2>

        {listingsData && <AllListings listings={listingsData} />}
      </div>
    </div>
  );
}
