import MainNavigation from "./nav/MainNavigation";
import TwitterLink from "../components/links/TwitterLink";

export default function About() {
  return (
    <>
      <MainNavigation page={"about"} />
      <div className="max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-7 lg:gap-x-8 mb-8 lg:mb-0 px-5">
        <div className="col-span-5 mb-8">
          <h2 className="text-4xl font-extrabold tracking-tight mb-3">About</h2>
          <p className="mb-4">
            21 dao is a non profit organization dedicated to supporting emerging
            creators on Solana. We believe that creators should have the freedom
            to spend all of their time creating beauty and we are focused on
            providing the tools and knowledge to make that possible.
          </p>

          <p>
            We are a community of artists, collectors, and builders who together
            are dedicated to unlocking as much creativity as possible and
            shaping a more beautiful world.
          </p>

          <TwitterLink url="https://twitter.com/21dao_" />
        </div>
      </div>
    </>
  );
}
