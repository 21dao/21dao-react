import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import getNftsFromUsername from "../data/getNftsFromUsername";
import TwitterLink from "../components/links/TwitterLink";
import ExchangeLink from "../components/links/ExchangeLink";
import HolaplexLink from "../components/links/HolaplexLink";
import FormfunctionLink from "../components/links/FormfunctionLink";

export default function Gallery() {
  const { name } = useParams();
  const [user, setUser] = useState();
  const [tokens, setTokens] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    getNftsFromUsername(name)
      .then((res) => {
        setUser(res.data.user);
        setTokens(res.data.nfts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [name]);

  useEffect(() => {
    if (!tokens) return;
    setItems(tokens.slice(0, 20));
  }, [tokens]);

  function fetchData() {
    setItems(tokens.slice(0, items.length + 20));
  }

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-5 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          {name}
        </h1>

        <div>
          {user && user.twitter && (
            <TwitterLink
              url={`https://twitter.com/${user.twitter}`}
              style={{ display: "inline-block" }}
            />
          )}
          {user && user.exchange && (
            <ExchangeLink
              url={`https://${user.exchange}`}
              style={{ display: "inline-block" }}
            />
          )}
          {user && user.holaplex && (
            <HolaplexLink
              url={`https://${user.holaplex}`}
              style={{ display: "inline-block" }}
            />
          )}
          {user && user.formfunction && (
            <FormfunctionLink
              url={`https://${user.formfunction}`}
              style={{ display: "inline-block" }}
            />
          )}
        </div>

        <InfiniteScroll
          dataLength={items.length}
          next={fetchData}
          hasMore={true}
        >
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {items.map((item, index) => (
              <div key={index} className="group relative">
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                  {item.metadata.image && (
                    <img
                      src={item.metadata.image}
                      alt=""
                      className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                    />
                  )}
                </div>
                <div className="mt-4 flex justify-between">
                  <div className="cursor-pointer">
                    <h3 className="text-sm font-medium text-gray-900">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {item.metadata.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500"></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
}
