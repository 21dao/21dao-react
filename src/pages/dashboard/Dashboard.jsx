import React, { useState, useEffect, useCallback } from "react";
import Items from "../../components/dashboard/Items";
import LoadingNfts from "../../components/dashboard/LoadingNfts";
import DashboardBreadcrumbs from "./nav/DashboardBreadcrumbs";
import DashboardNavigation from "./nav/DashboardNavigation";
import { getUser } from "../../utils/getUser";
import { signOut } from "../../utils/signOut";
import triggerRefresh from "../../data/dashboard/triggerRefresh";

export default function Dash() {
  const [user, setUser] = useState();
  const [nfts, setNfts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // Function to get the user from the server
  // will sign out if api key is not valid
  const initGetUser = useCallback(async () => {
    try {
      const user = await getUser();
      if (user.status !== "success") signOut();
      setUser(user.user);
      setNfts(user.nfts);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Hook run on page load to init the user
  useEffect(() => {
    initGetUser();
  }, [initGetUser]);

  // Check if NFTs are being loaded/refreshed server side
  useEffect(() => {
    if (user && user.loading === false) {
      setRefreshing(false);
    } else {
      setRefreshing(true);
      setTimeout(initGetUser, 5000);
    }
  }, [user, initGetUser]);

  function handleRefresh() {
    triggerRefresh()
      .then((res) => {
        if (res.data.status === "success") {
          setRefreshing(true);
          setTimeout(initGetUser, 5000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      {user && (
        <>
          <DashboardBreadcrumbs />
          <DashboardNavigation />
          <div className="max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8">
            <LoadingNfts loading={refreshing} />
            <Items nfts={nfts} handleRefresh={handleRefresh} />
          </div>
        </>
      )}
    </div>
  );
}
