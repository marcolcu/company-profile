"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LinkPreview } from "@/Components/ui/link-preview.jsx";

let interval;

export const CardStack = ({ items, offset, scaleFactor }) => {
    const CARD_OFFSET = offset || 10;
    const SCALE_FACTOR = scaleFactor || 0.06;
    const [cards, setCards] = useState(items);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (!isHovered) {
            startFlipping();
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isHovered]);

    const startFlipping = () => {
        interval = setInterval(() => {
            setCards((prevCards) => {
                const newArray = [...prevCards]; // create a copy of the array
                newArray.unshift(newArray.pop()); // move the last element to the front
                return newArray;
            });
        }, 5000);
    };

    return (
        <div
            className="relative h-60 w-60 md:h-60 md:w-96"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {cards.map((card, index) => {
                return (
                    <LinkPreview
                        url={card.link}
                        key={card?.id}
                        className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500"
                    >
                        <motion.div
                            key={card.id}
                            className="absolute dark:bg-black bg-white h-60 w-60 md:h-60 md:w-96 rounded-3xl p-4 shadow-xl border border-neutral-200 dark:border-white/[0.1] shadow-black/[0.1] dark:shadow-white/[0.05] flex flex-col justify-between"
                            style={{
                                transformOrigin: "top center",
                            }}
                            animate={{
                                top: index * -CARD_OFFSET,
                                scale: 1 - index * SCALE_FACTOR, // decrease scale for cards that are behind
                                zIndex: cards.length - index, // decrease z-index for the cards that are behind
                            }}
                        >
                            <div className="font-normal text-neutral-700 dark:text-neutral-200">
                                <p>{card.description}</p>
                            </div>
                            <div>
                                <p className="text-neutral-500 font-medium dark:text-white">
                                    {card.name}
                                </p>
                                <p className="capitalize text-neutral-400 font-normal dark:text-neutral-200">
                                    {card.type}
                                </p>
                            </div>
                        </motion.div>
                    </LinkPreview>
                );
            })}
        </div>
    );
};
