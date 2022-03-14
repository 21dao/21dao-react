import React, { useState, useEffect, useCallback } from "react";
import DashboardBreadcrumbs from "./nav/DashboardBreadcrumbs";
import DashboardNavigation from "./nav/DashboardNavigation";
import { getUser } from "../../utils/getUser";
import { signOut } from "../../utils/signOut";
import saveUserData from "../../data/dashboard/saveUserData.js";
import { error } from "../../utils/error";
import { success } from "../../utils/success";
import { host } from "../../config/settings";

export default function Settings() {
  const [user, setUser] = useState();

  // Function to get the user from the server
  // will sign out if api key is not valid
  const initGetUser = useCallback(async () => {
    try {
      const res = await getUser();
      if (res.status !== "success") signOut();
      setUser(res.user);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Hook run on page load to init the user
  useEffect(() => {
    initGetUser();
  }, [initGetUser]);

  function saveAll(e) {
    e.preventDefault();
    const data = {};
    data.username = document.getElementById("username").value;
    data.twitter = document.getElementById("twitter").value;
    data.exchange = document.getElementById("exchange").value;
    data.formfunction = document.getElementById("formfunction").value;
    data.holaplex = document.getElementById("holaplex").value;
    saveUserData(user.api_key, data)
      .then((res) => {
        switch (res.data.status) {
          case "success":
            success("Details updated successfully");
            setUser(res.data.user);
            break;
          case "error":
            error(res.data.msg);
            break;
          default:
            error("An error has occurred");
        }
      })
      .catch((err) => {
        error("An error has occurred");
      });
  }

  return (
    <div>
      <DashboardBreadcrumbs />
      <DashboardNavigation />
      <div className="max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 mt-10">
        {user && (
          <>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg bg-gray-300">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Gallery Information
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  <a
                    href={`${host}/gallery/${user.name}`}
                    title=""
                    className="text-blue-600 hover:text-blue-500"
                  >
                    {host}/gallery/{user.name}
                  </a>
                </p>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-gray-400">
                    <dt className="text-sm font-medium text-gray-500">Name</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="Name"
                        defaultValue={user.name}
                      />
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-gray-300">
                    <dt className="text-sm font-medium text-gray-500">
                      Twitter
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                          @
                        </span>
                        <input
                          type="text"
                          name="twitter"
                          id="twitter"
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          defaultValue={user.twitter}
                        />
                      </div>
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-gray-400">
                    <dt className="text-sm font-medium text-gray-500">
                      Exchange Art
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                          http://
                        </span>
                        <input
                          type="text"
                          name="exchange"
                          id="exchange"
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          defaultValue={user.exchange}
                        />
                      </div>
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-gray-300">
                    <dt className="text-sm font-medium text-gray-500">
                      Holaplex
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                          http://
                        </span>
                        <input
                          type="text"
                          name="holaplex"
                          id="holaplex"
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          defaultValue={user.holaplex}
                        />
                      </div>
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-gray-400">
                    <dt className="text-sm font-medium text-gray-500">
                      Formfunction
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                          http://
                        </span>
                        <input
                          type="text"
                          name="formfunction"
                          id="formfunction"
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          defaultValue={user.formfunction}
                        />
                      </div>
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-gray-300">
                    <dt className="text-sm font-medium text-gray-500">
                      <button
                        className="text-white font-bold py-2 px-3 rounded mt-2"
                        onClick={(e) => saveAll(e)}
                      >
                        Save
                      </button>
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"></dd>
                  </div>
                </dl>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
