import MainNavigation from "./nav/MainNavigation";
import TopSales from "../components/home/TopSales";
import TopSellers from "../components/home/TopSellers";
import TopBuyers from "../components/home/TopBuyers";
import EndingSoon from "../components/home/EndingSoon";

export default function Home() {
  return (
    <div>
      <MainNavigation />
      <div className="max-w-2xl mx-auto pb-5 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <TopSales />

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8 mt-8 mb-8">
          <div className="overflow-hidden">
            <TopSellers />
          </div>
          <div className="overflow-hidden">
            <TopBuyers />
          </div>
        </div>

        <EndingSoon />
      </div>
    </div>
  );
}
