import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

export default function AllArtists(props) {
  const artists = props.artists;
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const handleClick = (name) => navigate("/artist/" + name);

  useEffect(() => {
    setItems(artists.slice(0, 20));
  }, [artists]);

  function fetchData() {
    setItems(artists.slice(0, items.length + 20));
  }

  return (
    <InfiniteScroll dataLength={items.length} next={fetchData} hasMore={true}>
      <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {items.map((artist, index) => (
          <div
            key={index}
            className="group relative p-3 rounded-lg"
            style={{ background: "#1e1e1e" }}
          >
            <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-lg overflow-hidden group-hover:opacity-75 lg:h-60 lg:aspect-none">
              {artist.images[0] && (
                <img
                  src={artist.images[0]}
                  alt=""
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                  onClick={() => handleClick(artist.name)}
                />
              )}
            </div>
            <div className="mt-4 flex justify-between">
              <div
                onClick={() => handleClick(artist.name)}
                className="cursor-pointer"
              >
                <h3 className="text-sm font-medium">
                  <span aria-hidden="true" className="absolute inset-0" />
                  {artist.name}
                </h3>
                <p className="mt-1 text-sm"></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
}
