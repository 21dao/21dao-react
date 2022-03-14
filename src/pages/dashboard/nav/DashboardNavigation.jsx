import { useNavigate, useLocation } from "react-router-dom";

export default function DashNavigation(props) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="max-w-2xl mx-auto pt-2 px-0 md-px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="grid grid-cols-1">
        <nav className="border-b border-t border-solid mt-4 py-3 px-4">
          <div className="space-x-8">
            <a
              href=""
              onClick={() => navigate("/dashboard")}
              className={
                location.pathname === "/dashboard"
                  ? "text-blue-600 font-bold"
                  : "hover:text-blue-600"
              }
            >
              NFTs
            </a>
            <a
              href=""
              onClick={() => navigate("/dashboard/settings")}
              className={
                location.pathname === "/dashboard/settings"
                  ? "text-blue-600 font-bold"
                  : "hover:text-blue-600"
              }
            >
              Settings
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}
