"use client";
import React, {useEffect, useId, useRef, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {useOutsideClick} from "@/hooks/useOutsideClick.jsx";
import {PlaceholdersAndVanishInput} from "@/Components/ui/placeholders-and-vanish-input.jsx";
import {Head} from "@inertiajs/react";
import {Button} from "@/Components/ui/button.jsx";

export default function News() {
    const [value, setValue] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [showAll, setShowAll] = useState(true);

    const placeholders = [
        "What's the first rule of Fight Club?",
        "Who is Tyler Durden?",
        "Where is Andrew Laeddis Hiding?",
        "Write a Javascript method to reverse a string",
        "How to assemble your own PC?",
    ];

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchQuery(value);
        setShowAll(false);
        console.log(value, "submitted"); // Access value from state
    };

    const handleShowAll = () => {
        setSearchQuery('');
        setValue('');
        setShowAll(true);
    };

    const filteredCards = showAll
        ? cards
        : cards.filter(card =>
            card.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

    return (
        <>
            <Head title="News"/>
            <div className="container mx-auto mt-20">
                <div className="flex items-center justify-between mb-10">
                    <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
                        News
                    </h1>
                    <div className="search flex items-center justify-end gap-2 w-1/2">
                        {!showAll && (
                            <Button onClick={handleShowAll} variant="outline" className="h-12 rounded-full">Show All</Button>
                        )}
                        <PlaceholdersAndVanishInput placeholders={placeholders} onChange={handleChange}
                                                    onSubmit={handleSubmit}/>
                    </div>
                </div>
                <ExpandableCardDemo cards={filteredCards}/>
            </div>
        </>
    )
}

export function ExpandableCardDemo({cards}) {
    const [active, setActive] = useState(null);
    const ref = useRef(null);
    const id = useId();

    useEffect(() => {
        function onKeyDown(event) {
            if (event.key === "Escape") {
                setActive(false);
            }
        }

        if (active && typeof active === "object") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [active]);

    useOutsideClick(ref, () => setActive(null));

    return (
        <>
            <AnimatePresence>
                {active && typeof active === "object" && (
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        className="fixed inset-0 bg-black/20 h-full w-full z-10"
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {active && typeof active === "object" ? (
                    <div className="fixed inset-0 grid place-items-center z-[100]">
                        <motion.button
                            key={`button-${active.title}-${id}`}
                            layout
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0, transition: {duration: 0.05}}}
                            className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
                            onClick={() => setActive(null)}
                        >
                            <CloseIcon/>
                        </motion.button>
                        <motion.div
                            layoutId={`card-${active.title}-${id}`}
                            ref={ref}
                            className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
                        >
                            <motion.div layoutId={`image-${active.title}-${id}`}>
                                <img
                                    src={active.src}
                                    alt={active.title}
                                    className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                                />
                            </motion.div>

                            <div>
                                <div className="flex justify-between items-start p-4">
                                    <div className="">
                                        <motion.h3
                                            layoutId={`title-${active.title}-${id}`}
                                            className="font-bold text-neutral-700 dark:text-neutral-200"
                                        >
                                            {active.title}
                                        </motion.h3>
                                        <motion.p
                                            layoutId={`description-${active.description}-${id}`}
                                            className="text-neutral-600 dark:text-neutral-400"
                                        >
                                            {active.description}
                                        </motion.p>
                                    </div>
                                </div>
                                <div className="pt-4 relative px-4">
                                    <motion.div
                                        layout
                                        initial={{opacity: 0}}
                                        animate={{opacity: 1}}
                                        exit={{opacity: 0}}
                                        className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                                    >
                                        {typeof active.content === "function"
                                            ? active.content()
                                            : active.content}
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                ) : null}
            </AnimatePresence>
            <div className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {cards.map((card) => (
                        <motion.div
                            layoutId={`card-${card.title}-${id}`}
                            key={`card-${card.title}-${id}`}
                            onClick={() => setActive(card)}
                            className="p-6 bg-white dark:bg-neutral-900 shadow-md rounded-xl cursor-pointer hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="flex flex-col items-center">
                                <motion.div layoutId={`image-${card.title}-${id}`} className="mb-4">
                                    <img
                                        src={card.src}
                                        alt={card.title}
                                        className="h-48 w-48 rounded-lg object-cover object-top"
                                    />
                                </motion.div>
                                <motion.h3
                                    layoutId={`title-${card.title}-${id}`}
                                    className="font-medium text-neutral-800 dark:text-neutral-200 text-center"
                                >
                                    {card.title}
                                </motion.h3>
                                <motion.p
                                    layoutId={`description-${card.description}-${id}`}
                                    className="text-neutral-600 dark:text-neutral-400 text-center"
                                >
                                    {card.description}
                                </motion.p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </>
    );
}

export const CloseIcon = () => {
    return (
        <motion.svg
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0, transition: {duration: 0.05}}}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-black"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M18 6l-12 12"/>
            <path d="M6 6l12 12"/>
        </motion.svg>
    );
};

const cards = [
    {
        description: "Lana Del Rey",
        title: "Summertime Sadness",
        src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
        content: (
            <p>
                Lana Del Rey, an iconic American singer-songwriter, is celebrated for her
                melancholic and cinematic music style. Born Elizabeth Woolridge Grant in
                New York City, she has captivated audiences worldwide with her haunting
                voice and introspective lyrics. <br/> <br/> Her songs often explore
                themes of tragic romance, glamour, and melancholia, drawing inspiration
                from both contemporary and vintage pop culture. With a career that has
                seen numerous critically acclaimed albums, Lana Del Rey has established
                herself as a unique and influential figure in the music industry, earning
                a dedicated fan base and numerous accolades.
            </p>
        ),
    },
    {
        description: "Babbu Maan",
        title: "Mitran Di Chhatri",
        src: "https://assets.aceternity.com/demos/babbu-maan.jpeg",
        content: (
            <p>
                Babu Maan, a legendary Punjabi singer, is renowned for his soulful voice
                and profound lyrics that resonate deeply with his audience. Born in the
                village of Khant Maanpur in Punjab, India, he has become a cultural icon
                in the Punjabi music industry. <br/> <br/> His songs often reflect the
                struggles and triumphs of everyday life, capturing the essence of Punjabi
                culture and traditions. With a career spanning over two decades, Babu
                Maan has released numerous hit albums and singles that have garnered him a
                massive fan following both in India and abroad.
            </p>
        ),
    },
    {
        description: "Metallica",
        title: "For Whom The Bell Tolls",
        src: "https://assets.aceternity.com/demos/metallica.jpeg",
        content: (
            <p>
                Metallica, an iconic American heavy metal band, is renowned for their
                powerful sound and intense performances. Formed in 1981 in Los Angeles,
                California, by drummer Lars Ulrich and guitarist/vocalist James Hetfield,
                the band has become one of the most influential and commercially
                successful acts in the history of rock music. <br/> <br/> Their music
                blends fast tempos, aggressive guitar riffs, and introspective lyrics,
                addressing themes such as personal struggles, political issues, and the
                human condition. With a career spanning over four decades, Metallica has
                released numerous critically acclaimed albums, earned multiple Grammy
                Awards, and built a massive global fan base.
            </p>
        ),
    }, {
        description: "Metallica2",
        title: "For Whom The Bell Tolls2 ",
        src: "https://assets.aceternity.com/demos/metallica.jpeg",
        content: (
            <p>
                Metallica, an iconic American heavy metal band, is renowned for their
                powerful sound and intense performances. Formed in 1981 in Los Angeles,
                California, by drummer Lars Ulrich and guitarist/vocalist James Hetfield,
                the band has become one of the most influential and commercially
                successful acts in the history of rock music. <br/> <br/> Their music
                blends fast tempos, aggressive guitar riffs, and introspective lyrics,
                addressing themes such as personal struggles, political issues, and the
                human condition. With a career spanning over four decades, Metallica has
                released numerous critically acclaimed albums, earned multiple Grammy
                Awards, and built a massive global fan base.
            </p>
        ),
    }, {
        description: "Metallica3",
        title: "For Whom The Bell Tolls 3",
        src: "https://assets.aceternity.com/demos/metallica.jpeg",
        content: (
            <p>
                Metallica, an iconic American heavy metal band, is renowned for their
                powerful sound and intense performances. Formed in 1981 in Los Angeles,
                California, by drummer Lars Ulrich and guitarist/vocalist James Hetfield,
                the band has become one of the most influential and commercially
                successful acts in the history of rock music. <br/> <br/> Their music
                blends fast tempos, aggressive guitar riffs, and introspective lyrics,
                addressing themes such as personal struggles, political issues, and the
                human condition. With a career spanning over four decades, Metallica has
                released numerous critically acclaimed albums, earned multiple Grammy
                Awards, and built a massive global fan base.
            </p>
        ),
    },
];
