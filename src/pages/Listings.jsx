import React, { useState, useEffect, useCallback } from "react";
import getListings from "../data/listings/getListings";
import AllListings from "../components/listings/AllListings";
import MainNavigation from "./nav/MainNavigation";
import { Oval } from "react-loader-spinner";

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

        {listingsData ? (
          <AllListings listings={listingsData} />
        ) : (
          <div className="flex mt-8">
            <div className="m-auto">
              <Oval
                type="Oval"
                color="#25c712"
                secondaryColor="#111"
                width={35}
                height={35}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
