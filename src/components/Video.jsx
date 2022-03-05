import React, { useState, useEffect } from "react";

export default function Video(props) {
  const [url, setUrl] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setUrl(props.url);
  }, [props.url]);

  const videoLoaded = () => {
    setLoaded(true);
  };

  return (
    <div>
      <div className={loaded ? "opacity-100 duration-1000" : "opacity-0"}>
        <video
          autoPlay
          muted
          loop
          playsInline
          id="video"
          className="w-full object-center object-cover lg:w-full cursor-pointer rounded-lg"
          onLoadedData={videoLoaded}
        >
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <script>document.getElementById('video').play();</script>
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