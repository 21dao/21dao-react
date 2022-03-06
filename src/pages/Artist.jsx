import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import getArtist from "../data/artists/getArtist";
import TwitterLink from "../components/links/TwitterLink";
import ExchangeLink from "../components/links/ExchangeLink";
import HolaplexLink from "../components/links/HolaplexLink";
import FormfunctionLink from "../components/links/FormfunctionLink";
import ArtistBreadcrumbs from "./nav/ArtistBreadcrumbs";
import MainNavigation from "./nav/MainNavigation";

export default function Artist() {
  const [artist, setArtist] = useState();
  const { name } = useParams();

  const initGetArtist = useCallback(async () => {
    try {
      const res = await getArtist(name);
      setArtist(res);
    } catch (error) {
      console.log(error);
    }
  }, [name]);

  // Hook run on page load to init the artist data
  useEffect(() => {
    initGetArtist();
  }, [initGetArtist]);

  return (
    <>
      <MainNavigation page={"artist"} />
      {artist && (
        <>
          <div className="max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-7 lg:gap-x-8 mb-8 lg:mb-0 px-5">
            <div className="col-span-2 mb-8">
              <ArtistBreadcrumbs name={name} />
              <h2 className="text-4xl font-extrabold tracking-tight mb-3">
                {artist.name}
              </h2>
              <p className="mb-4">{artist.bio}</p>
              <div className="mt-4">
                <TwitterLink url={artist.twitter} />
                <ExchangeLink url={artist.exchange} />
                <HolaplexLink url={artist.holaplex} />
                <FormfunctionLink url={artist.formfunction} />
              </div>
            </div>
            <div className="rounded-lg overflow-hidden lg:block col-span-3 mb-8 lg:mb-0">
              <img
                src={artist.images[0]}
                alt=""
                className="w-full h-full object-center object-cover"
              />
            </div>
            <div className="lg:grid lg:grid-cols-1 lg:gap-y-8 col-span-2">
              <div className="rounded-lg overflow-hidden mb-8 lg:mb-0">
                <img
                  src={artist.images[1]}
                  alt=""
                  className="w-full h-full object-center object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden col-span-2">
                <img
                  src={artist.images[2]}
                  alt=""
                  className="w-full h-full object-center object-cover"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
