import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { GithubLogo, XLogo } from "@phosphor-icons/react/dist/ssr"
import { ModeToggle } from "./mode-toggle";


const Navbar = () => {
    return (
            <nav className="sticky top-0 z-30 flex items-center mx-auto w-full px-2.5 md:px-6  border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className=" flex justify-center items-center text-center h-14">

                    <Link href="/" className="flex items-center space-x-2 mr-4">
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            width={42}
                            height={42}
                            priority
                        />
                        <div className="font-semibold text-center">
                            Globe
                        </div>
                    </Link>

                    {/* mobile nav */}


                    <div className="hidden md:flex">
                        <Link
                            href="/countries"
                            className="transition-colors hover:text-foreground/80"
                        >
                            Countries
                        </Link>
                    </div>


                </div>
                <div className="ml-auto flex items-center justify-between space-x-2 ">
                    <div className="flex items-center space-x-2">
                        <Link
                            href='https://github.com/Raiza-Hub/globe'
                            target="_blank"
                            rel="noreferrer"
                        >
                            <div
                                className={cn(
                                    buttonVariants({
                                        variant: "ghost",
                                    }),
                                    "w-9 px-0"
                                )}
                            >
                                <GithubLogo className="h-4 w-4"  />
                                <span className="sr-only">GitHub</span>
                            </div>
                        </Link>
                        <Link
                            href='https://x.com/wisdom_adebola'
                            target="_blank"
                            rel="noreferrer"
                        >
                            <div
                                className={cn(
                                    buttonVariants({
                                        variant: "ghost",
                                    }),
                                    "w-9 px-0"
                                )}
                            >
                                <XLogo className="h-4 w-4" />
                                <span className="sr-only">GitHub</span>
                            </div>
                        </Link>
                        <ModeToggle />
                    </div>
                </div>
            </nav>
    );
}

export default Navbar;