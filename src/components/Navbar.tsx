import Link from "next/link";
// import MaxWidthWrapper from "./MaxWidthWrapper";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { GithubLogo } from "@phosphor-icons/react/dist/ssr"
// import { ModeToggle } from "./mode-toggle";


const Navbar = () => {
    return (
            <nav className="sticky top-0 z-30 flex items-center mx-auto w-full px-2.5 md:px-6  border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className=" flex justify-center items-center text-center h-14">

                    <Link href="/" className="flex items-center space-x-2 mr-4">
                        <Image
                            src="https://img.freepik.com/free-vector/cute-cool-boy-dabbing-pose-cartoon-vector-icon-illustration-people-fashion-icon-concept-isolated_138676-5680.jpg?size=626&ext=jpg"
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


                    <div className="hidden md:flex gap-4 lg:gap-6">
                        <Link
                            href="/countries"
                            className="transition-colors hover:text-foreground/80"
                        >
                            Countries
                        </Link>
                        <Link
                            href="/weather"
                            className="transition-colors hover:text-foreground/80"
                        >
                            Weather
                        </Link>
                    </div>


                </div>
                <div className="ml-auto flex items-center justify-between space-x-2 grow md:grow-0">
                    <div className="flex items-center space-x-2">
                        <Link
                            href='/github'
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
                        {/* <ModeToggle /> */}
                    </div>
                </div>
            </nav>
    );
}

export default Navbar;