export default function Actions(props) {
  return (
    <div className="max-w-2xl mx-auto px-3 md:px-0 lg:max-w-7xl lg:px-0 text-right">
      <span
        className="text-gray-300 hover:text-gray-100 cursor-pointer"
        onClick={() => props.toggleVisibility(true)}
      >
        {" "}
        Show All |{" "}
      </span>
      <span
        className="text-gray-300 hover:text-gray-100 cursor-pointer"
        onClick={() => props.toggleVisibility(false)}
      >
        {" "}
        Hide All
      </span>
      <button
        className="text-white font-bold py-2 px-3 rounded mt-2 ml-4"
        onClick={() => props.handleSave()}
      >
        Save
      </button>
      <button
        className="text-white font-bold py-2 px-3 rounded mt-4 ml-2"
        onClick={() => props.handleRefresh()}
      >
        Refresh
      </button>
    </div>
  );
}
