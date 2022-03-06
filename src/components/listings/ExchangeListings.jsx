import React, { useState, useEffect, useCallback } from "react";
import getListings from "../../data/listings/getListings";
import { roundToTwo } from "../../utils/roundToTwo";

export default function Listings(props) {
  const name = props.name;
  const [listings, setListings] = useState();

  const initGetListings = useCallback(async () => {
    try {
      const res = await getListings(name);
      if (res.length > 0) setListings(res);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Hook run on page load to init the artist listings
  useEffect(() => {
    initGetListings();
  }, [initGetListings]);

  return (
    <>
      {listings && (
        <div className="exchange-listings col-span-7 rounded-md px-1 py-1 lg:px-6 lg:py-4 mt-8 lg:mt-16 mb-8">
          <h2 className="text-2xl font-extrabold tracking-tight pt-2 pl-1">
            Exchange Art Listings
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-y-5 gap-x-6 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-4">
            {listings.map((token, index) => {
              {
                console.log(token);
              }
              return (
                <div className="group relative p-2 cursor-move" key={index}>
                  <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-40 lg:aspect-none">
                    <a
                      href={`https://exchange.art/single/${token.mintKey}`}
                      title=""
                    >
                      <img
                        src={token.image}
                        alt=""
                        className="w-full h-full object-center object-cover lg:w-full lg:h-full cursor-pointer"
                      />
                    </a>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div className="cursor-pointer">
                      <h3 className="text-sm font-medium">{token.name}</h3>
                      <p className="mt-1 text-sm absolute top-0 right-0 md:top-1 md:right-1 lg:top-0 lg:right-1 bg-orange-50 px-1 py-0.5 text-gray-900">
                        ◎{roundToTwo(token.lastListedPrice / 1000000000)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
