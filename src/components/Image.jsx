import React, { useState, useEffect } from "react";
import { cdnUrl } from "../config/settings";

export default function Image(props) {
  const [url, setUrl] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setUrl(`${cdnUrl}/${props.mint}`);
  }, [props.url, props.mint]);

  const imageLoaded = () => {
    setLoaded(true);
  };

  const addDefaultSrc = () => {
    setUrl(props.url);
  };

  return (
    <div style={{ minHeight: "100px" }}>
      <div className={loaded ? "opacity-100 duration-1000" : "opacity-0"}>
        <img
          src={url}
          alt=""
          className="w-full object-center object-cover lg:w-full rounded-lg"
          onLoad={imageLoaded}
          onError={addDefaultSrc}
        />
      </div>
      <div className="middle">
        <div className={loaded ? "opacity-0" : "opacity-100"}>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-5 h-5 bg-gray-700 rounded-full delay-100 animate-pulse"></div>
            <div className="w-5 h-5 bg-gray-700 rounded-full delay-200 animate-pulse"></div>
            <div className="w-5 h-5 bg-gray-700 rounded-full delay-300 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
