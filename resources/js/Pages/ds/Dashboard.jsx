"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "@/Components/ui/sidebar.jsx";
import { Head } from "@inertiajs/react";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink.jsx";
import axios from "axios";
import { DataTableServices } from "@/Components/component/datatableServices";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import {
    IconArrowLeft,
    IconBrandTabler,
    IconServer,
    IconSettings,
    IconUserBolt,
} from "@tabler/icons-react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/Components/ui/drawer";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/Components/ui/alert-dialog";

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
            label: "Services",
            icon: (
                <IconServer className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
            page: "services",
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
            <ResponsiveNavLink method="post" href={route("logout")} as="button">
                Log Out
            </ResponsiveNavLink>;
        } else {
            setCurrentPage(page);
            setOpen(false);
        }
    };

    return (
        <>
            <Head title="Adminsite" />
            <div
                className={cn(
                    "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
                    "h-screen"
                )}
            >
                <Sidebar open={open} setOpen={setOpen}>
                    <SidebarBody className="justify-between gap-10">
                        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                            {open ? <Logo /> : <LogoIcon />}
                            <div className="mt-8 flex flex-col gap-2">
                                {links.map((link, idx) => {
                                    if (link.page === "logout") {
                                        return (
                                            <ResponsiveNavLink
                                                key={idx}
                                                method="post"
                                                href={route("logout")}
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
                                                onClick={() =>
                                                    handleLinkClick(link.page)
                                                }
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
                    <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
                        {(() => {
                            switch (currentPage) {
                                case "dashboard":
                                    return <Dashboard />;
                                case "services":
                                    return <Services />;
                                case "profile":
                                    return <Profile />;
                                case "settings":
                                    return <Settings />;
                                case "logout":
                                    return <Logout />;
                                default:
                                    return <Dashboard />;
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
                className="h-5 w-auto"
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
                className="h-5 w-auto"
            />
        </div>
    );
};

const Dashboard = () => <div className="flex flex-1">Dashboard Content</div>;

const Services = () => {
    const [services, setServices] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editServiceId, setEditServiceId] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteServiceId, setDeleteServiceId] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get("/api/services");
                setServices(response.data);
            } catch (error) {
                console.error("Error fetching services:", error);
            }
        };

        fetchServices();
    }, []);

    const handleEditService = (id) => {
        const serviceToEdit = services.find((service) => service.id === id);
        if (serviceToEdit) {
            setName(serviceToEdit.name);
            setDescription(serviceToEdit.description);
            setEditServiceId(id);
            setDrawerOpen(true); // Open the drawer
        }
    };

    const handleSubmitServices = async () => {
        try {
            if (editServiceId) {
                // Handle update logic here
                await axios.put(`/api/services/${editServiceId}`, {
                    name,
                    description,
                });
            } else {
                // Handle create logic here
                await axios.post("/api/services", { name, description });
            }

            // Reset form
            setName("");
            setDescription("");
            setEditServiceId(null);

            // Refresh services
            const updatedServicesResponse = await axios.get("/api/services");
            setServices(updatedServicesResponse.data);

            setDrawerOpen(false); // Close the drawer
        } catch (error) {
            console.error("Error saving service:", error);
        }
    };

    const handleDeleteService = async () => {
        try {
            await axios.delete(`/api/services/${deleteServiceId}`);
            setServices((prevServices) =>
                prevServices.filter((service) => service.id !== deleteServiceId)
            );
            setDeleteDialogOpen(false);
        } catch (error) {
            console.error("Error deleting service:", error);
        }
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="scroll-m-20 text-xl font-bold tracking-tight lg:text-3xl">
                    Services
                </h1>
                <Button onClick={() => setDrawerOpen(true)} variant="default">
                    + Add Services
                </Button>
            </div>
            <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
                <DrawerContent>
                    <div className="mx-auto w-full max-w-sm">
                        <DrawerHeader>
                            <DrawerTitle>
                                {editServiceId ? "Edit Service" : "Add Service"}
                            </DrawerTitle>
                            <DrawerDescription>
                                {editServiceId
                                    ? "Edit the service details."
                                    : "Insert your services in here."}
                            </DrawerDescription>
                        </DrawerHeader>
                        <div className="p-4 pb-0">
                            <div className="flex flex-col gap-3 items-center justify-center">
                                <Input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <Textarea
                                    placeholder="Type your description here."
                                    name="description"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <DrawerFooter>
                            <Button onClick={handleSubmitServices}>
                                {editServiceId ? "Save Changes" : "Submit"}
                            </Button>
                            <DrawerClose asChild>
                                <Button
                                    variant="outline"
                                    onClick={() => setDrawerOpen(false)}
                                >
                                    Cancel
                                </Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </div>
                </DrawerContent>
            </Drawer>
            <DataTableServices
                data={services}
                onEdit={handleEditService}
                onDelete={(id) => {
                    setDeleteServiceId(id);
                    setDeleteDialogOpen(true);
                }}
            />
            <AlertDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete this service.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteService}>
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

const Profile = () => <div className="flex flex-1">Profile Content</div>;

const Settings = () => <div className="flex flex-1">Settings Content</div>;

const Logout = () => <div className="flex flex-1">Logout Content</div>;
