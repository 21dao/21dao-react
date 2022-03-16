import MainNavigation from "./nav/MainNavigation";
import TwitterLink from "../components/links/TwitterLink";
import DiscordLink from "../components/links/DiscordLink";

export default function About() {
  const style = {
    display: "inline",
  };

  return (
    <>
      <MainNavigation page={"about"} />
      <div className="max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-7 lg:gap-x-8 mb-8 lg:mb-0 px-5">
        <div className="col-span-5 mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight mb-3">About</h2>
          <p className="mb-4 text-lg">
            21 dao is a non profit organization dedicated to supporting emerging
            creators on Solana. We believe that creators should have the freedom
            to spend all of their time creating beauty and we are focused on
            providing the tools and knowledge to make that possible.
          </p>

          <p className="text-lg mb-8">
            We are a community of artists, collectors, and builders who together
            are dedicated to unlocking as much creativity as possible and
            shaping a more beautiful world.
          </p>

          <h2 className="text-2xl font-extrabold tracking-tight my-3">
            Artist Advisor Program
          </h2>

          <p>
            21 dao's Artist Advisor Program is an initiative to help 1/1 artists
            grow and establish themselves by giving them access to 1-on-1
            sessions with experienced individuals in the Solana ecosystem. You
            can learn more about the program and schedule time with an
            advisor&nbsp;
            <a
              href="https://21dao.notion.site/21dao-Artist-Advisor-Program-92274218a9db49b2a1197722f1207d10"
              title="Artist Advisor Program"
              className="underline"
            >
              here
            </a>
            .
          </p>

          <div className="mt-12">
            <TwitterLink url="https://twitter.com/21dao_" style={style} />
            <DiscordLink url="https://discord.gg/Z3Z5vV822r" style={style} />
          </div>
        </div>
      </div>
    </>
  );
}
