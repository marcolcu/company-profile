"use client";
import React, { useState } from "react";
import {
    IconArrowLeft,
    IconBrandTabler,
    IconSettings,
    IconUserBolt,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "@/Components/ui/sidebar.jsx";
import {Head, Link} from "@inertiajs/react";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink.jsx";

export default function SidebarDemo() {
    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState("dashboard");

    const links = [
        {
            label: "Dashboard",
            icon: (
                <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
            page: "dashboard",
        },
        {
            label: "Profile",
            icon: (
                <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
            page: "profile",
        },
        {
            label: "Settings",
            icon: (
                <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
            page: "settings",
        },
        {
            label: "Logout",
            icon: (
                <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
            page: "logout",
        },
    ];

    const handleLinkClick = async (page) => {
        if (page === "logout") {
            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                Log Out
            </ResponsiveNavLink>
        } else {
            setCurrentPage(page);
            setOpen(false);
        }
    };

    return (
        <>
            <Head title="Adminsite"/>
            <div
                className={cn(
                    "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
                    "h-screen"
                )}
            >
                <Sidebar open={open} setOpen={setOpen}>
                    <SidebarBody className="justify-between gap-10">
                        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                            {open ? <Logo/> : <LogoIcon/>}
                            <div className="mt-8 flex flex-col gap-2">
                                {links.map((link, idx) => {
                                    if (link.page === "logout") {
                                        return (
                                            <ResponsiveNavLink
                                                key={idx}
                                                method="post"
                                                href={route('logout')}
                                                as="button"
                                                className="flex items-center ps-1 cursor-pointer hover:bg-gray-200 dark:hover:bg-neutral-700"
                                            >
                                                {link.icon}
                                                <span className="ml-2 text-neutral-700 dark:text-neutral-200">
                                                  {link.label}
                                                </span>
                                            </ResponsiveNavLink>
                                        );
                                    } else {
                                        return (
                                            <div
                                                key={idx}
                                                className="flex items-center p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-neutral-700"
                                                onClick={() => handleLinkClick(link.page)}
                                            >
                                                {link.icon}
                                                <span className="ml-2 text-neutral-700 dark:text-neutral-200">
                                                  {link.label}
                                                </span>
                                            </div>
                                        );
                                    }
                                })}

                            </div>
                        </div>
                        <div>
                            <SidebarLink
                                link={{
                                    label: "Manu Arora",
                                    icon: (
                                        <img
                                            src="https://assets.aceternity.com/manu.png"
                                            className="h-7 w-7 flex-shrink-0 rounded-full"
                                            alt="Avatar"
                                        />
                                    ),
                                }}
                            />
                        </div>
                    </SidebarBody>
                </Sidebar>

                <div className="flex flex-1">
                    <div
                        className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
                        {(() => {
                            switch (currentPage) {
                                case "dashboard":
                                    return <Dashboard/>;
                                case "profile":
                                    return <Profile/>;
                                case "settings":
                                    return <Settings/>;
                                case "logout":
                                    return <Logout/>;
                                default:
                                    return <Dashboard/>;
                            }
                        })()}
                    </div>
                </div>
            </div>
        </>
    );
}

export const Logo = () => {
    return (
        <div className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
            <img
                src="/image/logocreateit.png"
                alt="Logo CreateIT"
                className="h-5 w-auto" // Adjust these values as needed
            />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium text-black dark:text-white whitespace-pre"
            >
                CreateIT Adminsite
            </motion.span>
        </div>
    );
};

export const LogoIcon = () => {
    return (
        <div className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
            <img
                src="/image/logocreateit.png"
                alt="Logo CreateIT"
                className="h-5 w-auto" // Adjust these values as needed
            />
        </div>
    );
};

// Dummy components for demonstration
const Dashboard = () => (
    <div className="flex flex-1">Dashboard Content</div>
);

const Profile = () => (
    <div className="flex flex-1">Profile Content</div>
);

const Settings = () => (
    <div className="flex flex-1">Settings Content</div>
);

const Logout = () => (
    <div className="flex flex-1">Logout Content</div>
);
