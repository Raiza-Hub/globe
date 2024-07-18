import { buttonVariants } from "@/components/ui/button";
import { GithubLogo } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import '@/assets/styles/github-action-btn.css';
import Globe from "@/components/magicui/globe";

export default function Home() {
  return (
    <main className="w-full flex flex-col items-center px-4 lg:px-6 mt-8 lg:mt-12">
      <header className="flex flex-col items-center justify-center text-center">
        <div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50 dark:hover:bg-white animate-bounce">
          <p className="text-sm font-semibold text-gray-700">
            Star on Github✨
          </p>
        </div>
        <h1 className="max-w-4xl text-4xl font-bold md:text-6xl">
          Explore the World at Your <span className=" ">Fingertips</span>
        </h1>
        <p className="mt-3 max-w-prose text-muted-foreground dark:text-white sm:text-lg">
          Discover valuable information about countries worldwide, focusing on their unique climates and currencies
          with detailed insights into the weather patterns and monetary systems of nations around the globe.
        </p>
        <div className="flex gap-4 mt-6 md:mt-8">
          <Link
            href='/countries'
            className={buttonVariants({
              className: 'shadow px-4'
            })}
          >
            Get Started
          </Link>

          <Link
            href='https://github.com/Raiza-Hub/globe'
            className={buttonVariants({
              variant: 'ghost',
              className: 'border shadow px-4  git-button '
            })}
            target="_blank"
            rel="noreferrer"
          >
            <div className="flex items-center justify-center space-x-2">
              <div className="svg-wrapper-1" aria-hidden="true">
                <div className="svg-wrapper" aria-hidden="true">
                  <GithubLogo className="w-5 h-5 icon" />
                </div>
              </div>
              <span className="font-semibold">GitHub</span>
            </div>
          </Link>
        </div>
      </header>

      <section className="relative flex h-[20rem] w-full max-w-[32rem] items-center justify-center overflow-hidden rounded-lg pt-16 mx-auto md:shadow-xl">
        <Globe />
        <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
      </section>


    </main>
  );
}
