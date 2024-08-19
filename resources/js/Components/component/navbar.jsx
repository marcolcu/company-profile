"use client";
import { useEffect, useState } from "react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Link } from "@inertiajs/react";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 z-50 w-full transition-colors duration-300 ${
                scrolled
                    ? 'bg-white bg-opacity-60 backdrop-blur-md shadow-md dark:bg-gray-900 dark:bg-opacity-70'
                    : 'bg-transparent'
            }`}
        >
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <Link href="#" className="flex items-center gap-2">
                    <span className="text-lg font-bold">PT CreateIT Solutions Indonesia</span>
                </Link>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="lg:hidden">
                            <MenuIcon className="h-6 w-6" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                        <div className="grid gap-4 p-2">
                            <Link
                                href="/"
                                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white ps-2 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
                            >
                                Home
                            </Link>
                            <Link
                                href="#"
                                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white ps-2 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
                            >
                                About
                            </Link>
                            <Link
                                href="#"
                                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white ps-2 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
                            >
                                Services
                            </Link>
                            <Link
                                href="/news"
                                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white ps-2 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
                            >
                                News
                            </Link>
                        </div>
                    </SheetContent>
                </Sheet>
                <NavigationMenu className="hidden lg:flex">
                    <NavigationMenuList>
                        <NavigationMenuLink asChild>
                            <Link
                                href="/"
                                className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors no-underline hover:underline-offset-2 hover:text-gray-900 focus:text-gray-900 focus:outline-none dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
                            >
                                Home
                            </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                            <Link
                                href="#"
                                className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors no-underline hover:underline-offset-2 hover:text-gray-900 focus:text-gray-900 focus:outline-none dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
                            >
                                About
                            </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                            <a
                                href="#services"
                                className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors no-underline hover:underline-offset-2 hover:text-gray-900 focus:text-gray-900 focus:outline-none dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
                            >
                                Services
                            </a>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                            <Link
                                href="/news"
                                className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors no-underline hover:underline-offset-2 hover:text-gray-900 focus:text-gray-900 focus:outline-none dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
                            >
                                News
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </header>
    );
}

function MenuIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
    );
}
