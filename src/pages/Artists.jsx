import React, { useState, useEffect, useCallback } from "react";
import getArtists from "../data/artists/getArtists";
import AllArtists from "../components/artists/AllArtists";
import MainNavigation from "./nav/MainNavigation";
import Select from "react-select";
import {
  nameOpts,
  tagOpts,
  searchResultSet,
} from "../utils/artistFilterHelpers";

export default function Artists() {
  const [artistData, setArtistData] = useState([]);
  const [artistNames, setArtistNames] = useState();
  const [artistTags, setArtistTags] = useState();
  const [searchNames, setSearchNames] = useState([]);
  const [searchTags, setSearchTags] = useState([]);
  const [resultSet, setResultSet] = useState([]);

  const initGetArtistData = useCallback(async () => {
    try {
      const res = await getArtists();
      setArtistData(res);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Hook run on page load to init the artist data
  useEffect(() => {
    initGetArtistData();
  }, [initGetArtistData]);

  useEffect(() => {
    setArtistNames(nameOpts(artistData));
    setArtistTags(tagOpts(artistData));
  }, [artistData]);

  useEffect(() => {
    let results = searchResultSet(artistData, searchNames, searchTags);
    setResultSet(results);
  }, [searchNames, searchTags, artistData]);

  function onNameSelectChange(opt) {
    setResultSet([]);
    setSearchNames(opt);
  }

  function onTagSelectChange(opt) {
    setResultSet([]);
    setSearchTags(opt);
  }

  return (
    <div>
      <MainNavigation page={"artists"} />
      <div className="max-w-2xl mx-auto pb-5 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight mb-3 px-1">
          Artists
        </h2>

        <div className="w-full lg:w-1/2 mb-3 lg:mb-0 lg:inline-block lg:pr-2">
          <Select
            options={artistNames}
            onChange={onNameSelectChange}
            isMulti
            placeholder="Search Artists"
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>

        <div className="w-full lg:w-1/2 lg:inline-block lg:pl-2">
          <Select
            options={artistTags}
            onChange={onTagSelectChange}
            isMulti
            placeholder="Search Tags"
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>
        <AllArtists artists={resultSet} />
      </div>
    </div>
  );
}
