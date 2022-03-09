import React, { useState, useEffect } from "react";
import Select from "react-select";
import { nameOpts, searchResultSet } from "../../utils/artistFilterHelpers";
import InfiniteScroll from "react-infinite-scroll-component";
import { selectListingsSort } from "../../utils/selectHelpers";
import { sortListings } from "../../utils/sortHelpers";
import Image from "../Image";
import Video from "../Video";

export default function AllListings(props) {
  const listings = props.listings;
  const [artistNames, setArtistNames] = useState();
  const [searchNames, setSearchNames] = useState([]);
  const [resultSet, setResultSet] = useState([]);
  const [items, setItems] = useState([]);
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    let data = listings.map((listing) => {
      return { name: listing.name };
    });
    setArtistNames(nameOpts(data));
  }, [listings]);

  useEffect(() => {
    const results = searchResultSet(listings, searchNames, []);
    const sorted = sortListings(sortBy, results);
    setResultSet(sorted);
  }, [searchNames, sortBy, listings]);

  useEffect(() => {
    setItems(resultSet.slice(0, 25));
  }, [resultSet]);

  function onNameSelectChange(opt) {
    setResultSet([]);
    setSearchNames(opt);
  }

  function fetchData() {
    setItems((items) => resultSet.slice(0, items.length + 25));
  }

  function sortListingsChange(event) {
    setSortBy(event.target.value);
  }

  return (
    <>
      <div className="w-full mb-4">
        <p>Secondary listings by 21dao artists.</p>
      </div>
      <div className="w-full">
        <Select
          options={artistNames}
          onChange={onNameSelectChange}
          isMulti
          placeholder="Search Artists"
          className="react-select-container"
          classNamePrefix="react-select"
        />
        {selectListingsSort("md", sortListingsChange)}
      </div>
      <InfiniteScroll dataLength={items.length} next={fetchData} hasMore={true}>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {items.map((listing, index) => (
            <div
              key={index}
              className="group relative p-3 rounded-lg"
              style={{ background: "#1e1e1e" }}
            >
              <div className="w-full min-h-80 aspect-w-1 aspect-h-1 rounded-lg overflow-hidden group-hover:opacity-75 lg:h-60 lg:aspect-none cursor-pointer">
                <a
                  href={`https://exchange.art/single/${listing.mint}`}
                  title=""
                >
                  {listing.image.split(".").pop().startsWith("mp4") ? (
                    <Video url={listing.image} mint={listing.mint} />
                  ) : (
                    <Image url={listing.image} mint={listing.mint} />
                  )}
                </a>
              </div>
              <div className="mt-4 flex justify-between">
                <div className="w-full">
                  <h3 className="text-sm font-medium">{listing.name}</h3>
                  <p></p>
                  <p className="mt-1 text-sm">
                    <span>◎ {listing.last_listed_price / 1000000000}</span>
                    {listing.last_sale_price && (
                      <span className="float-right text-gray-400">
                        Last sale ◎ {listing.last_sale_price / 1000000000}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
}
