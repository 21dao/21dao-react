export function selectDays(size, callback) {
  return (
    <div className="select-container select-container-days">
      <select
        className={`form-select form-select-${size}
                  align-middle
                  inline
                  px-3
                  py-1.5
                  text-lg
                  font-normal
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  mt-4
                  mr-4
                  pr-8
                  focus:outline-none`}
        onChange={callback}
      >
        <option value="1" defaultValue>
          1 day
        </option>
        <option value="7">7 days</option>
      </select>
    </div>
  );
}

export function selectMarketplace(size, callback) {
  return (
    <div className="select-container">
      <select
        className={`form-select form-select-${size}
                  align-middle
                  inline
                  px-3
                  py-1.5
                  text-lg
                  font-normal
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  mt-4
                  pr-8
                  focus:outline-none`}
        onChange={callback}
      >
        <option value="all" defaultValue>
          All Marketplaces
        </option>
        <option value="exchange">Exchange.Art</option>
        <option value="holaplex">Holaplex</option>
        <option value="formfunction">Formfunction</option>
      </select>
    </div>
  );
}

export function selectListingsSort(size, callback) {
  return (
    <div className="select-container">
      <select
        className={`form-select form-select-${size}
                  align-middle
                  inline
                  px-3
                  py-1.5
                  font-normal
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  mt-4
                  pr-4
                  focus:outline-none`}
        onChange={callback}
      >
        <option value="newest" defaultValue>
          Newest
        </option>
        <option value="oldest">Oldest</option>
        <option value="asc">Price Asc</option>
        <option value="desc">Price desc</option>
      </select>
    </div>
  );
}
