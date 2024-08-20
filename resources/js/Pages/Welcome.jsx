import { Head } from "@inertiajs/react";
import { AuroraBackground } from "@/Components/ui/aurora-background.jsx";
import { motion } from "framer-motion";
import { FlipWords } from "@/Components/ui/flip-words.jsx";
import { HoverEffect } from "@/Components/ui/card-hover-effect.jsx";
import { CardStack } from "@/Components/ui/card-stack.jsx";
import { cn } from "@/lib/utils";
import { LinkPreview } from "@/Components/ui/link-preview.jsx";
import { useEffect, useState } from "react";

export default function Welcome() {
    const words = ["IT", " Business", " Website", " Profit"];

    const [services, setServices] = useState([]);
    const [portfolio, setPortfolio] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get("/api/services");
                setServices(response.data);
            } catch (error) {
                console.error("Error fetching services:", error);
            }
        };

        const fetchPortfolio = async () => {
            try {
                const response = await axios.get("/api/portfolios");
                setPortfolio(response.data);
            } catch (error) {
                console.error("Error fetching portfolios:", error);
            }
        };

        fetchPortfolio();
        fetchServices();
    }, []);

    return (
        <>
            <Head title="Home" />
            <AuroraBackground>
                <motion.div
                    initial={{ opacity: 0.0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    className="relative flex gap-4 items-center justify-around px-4 container mx-auto h-screen"
                >
                    <div className="left p-5">
                        <div className="font-extralight text-base md:text-xl dark:text-neutral-200 py-4">
                            Software and Technology Solutions
                        </div>
                        <div className="text-3xl md:text-7xl font-bold dark:text-white">
                            Create
                            <FlipWords words={words} />
                        </div>
                        <div className="font-extralight text-base md:text-xl dark:text-neutral-200 py-4 w-3/4">
                            At PT CreateIT Solution Indonesia, we are at the
                            forefront of innovation, delivering unparalleled
                            software solutions to drive the success of
                            businesses in the digital age. As an experienced
                            software company, we specialize in creating and
                            maintaining businesses' software
                        </div>
                        <div className="flex gap-2">
                            <button className="bg-[#0fc4c0] dark:bg-white rounded-full w-fit text-white dark:text-black px-5 py-3">
                                Read More
                            </button>
                            <LinkPreview
                                url="http://127.0.0.1:8000/news"
                                className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500"
                            >
                                <button className="bg-transparent border border-black dark:bg-white rounded-full w-fit text-black dark:text-black px-5 py-3">
                                    News
                                </button>
                            </LinkPreview>
                        </div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0.0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.5,
                            duration: 0.8,
                            ease: "easeInOut",
                        }}
                        className="right"
                    >
                        <img
                            src="/image/logocreateit.png"
                            alt="Logo CreateIT"
                            className="w-[700px]"
                        />
                    </motion.div>
                </motion.div>
            </AuroraBackground>

            {/* Services */}
            <section
                className="relative flex flex-col gap-4 items-center justify-center px-4 container mx-auto mt-5"
                id="services"
            >
                <div className="text-3xl md:text-7xl font-bold dark:text-white">
                    Services
                </div>
                <div className="font-extralight text-base md:text-xl dark:text-neutral-200 py-4">
                    Services that we are provide
                </div>
                <div className="">
                    <HoverEffect items={services} />
                </div>
            </section>
            {/* Portfolio & Partners */}
            <section
                className="relative flex flex-col gap-4 items-center justify-center px-4 container mx-auto h-screen mt-5"
                id="porto"
            >
                <div className="text-3xl md:text-7xl font-bold dark:text-white">
                    Portfolio & Partners
                </div>
                <div className="font-extralight text-base md:text-xl dark:text-neutral-200 py-4">
                    Our Portfolio & Partners
                </div>
                <div className="">
                    {portfolio.length > 0 ? (
                        <CardStack items={portfolio} />
                    ) : (
                        null// Optional: Provide feedback if there are no portfolios
                    )}
                </div>
            </section>
        </>
    );
}

export const projects = [
    {
        title: "Stripe",
        description:
            "A technology company that builds economic infrastructure for the internet.",
        link: "https://stripe.com",
    },
    {
        title: "Netflix",
        description:
            "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
        link: "https://netflix.com",
    },
    {
        title: "Google",
        description:
            "A multinational technology company that specializes in Internet-related services and products.",
        link: "https://google.com",
    },
    {
        title: "Meta",
        description:
            "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
        link: "https://meta.com",
    },
    {
        title: "Amazon",
        description:
            "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
        link: "https://amazon.com",
    },
    {
        title: "Microsoft",
        description:
            "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
        link: "https://microsoft.com",
    },
];

const Highlight = ({ children, className }) => {
    return (
        <span
            className={cn(
                "font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5",
                className
            )}
        >
            {children}
        </span>
    );
};

export const CARDS = [
    {
        id: 0,
        name: "Manu Arora",
        designation: "Senior Software Engineer",
        link: "https://chatgpt.com",
        content: (
            <p>
                These cards are amazing,{" "}
                <Highlight>I want to use them</Highlight> in my project. Framer
                motion is a godsend ngl tbh fam 🙏
            </p>
        ),
    },
    {
        id: 1,
        name: "Elon Musk",
        designation: "Senior Shitposter",
        link: "https://tailwindcss.com",
        content: (
            <p>
                I dont like this Twitter thing,{" "}
                <Highlight>deleting it right away</Highlight> because yolo.
                Instead, I would like to call it <Highlight>X.com</Highlight> so
                that it can easily be confused with adult sites.
            </p>
        ),
    },
    {
        id: 2,
        name: "Tyler Durden",
        designation: "Manager Project Mayhem",
        link: "https://youtube.com",
        content: (
            <p>
                The first rule of
                <Highlight>Fight Club</Highlight> is that you do not talk about
                fight club. The second rule of
                <Highlight>Fight club</Highlight> is that you DO NOT TALK about
                fight club.
            </p>
        ),
    },
];
