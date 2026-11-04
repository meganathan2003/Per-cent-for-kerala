"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

interface AnimatedTextProps {
    text: string;
    className?: string;
}

export default function AnimatedText({
    text,
    className = "",
}: AnimatedTextProps) {
    const containerRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const element = containerRef.current;
        if (!element) return;

        const letters = element.querySelectorAll(".animated-letter");

        const animation = animate(letters, {
            opacity: [0, 1],
            translateY: [25, 0],
            delay: stagger(35),
            duration: 650,
            ease: "out(3)",
            autoplay: true,
        });

        return () => {
            animation.cancel();
        };
    }, [text]);

    return (
        <h2 ref={containerRef} className={className}>
            {text.split("").map((letter, index) => (
                <span
                    key={index}
                    className="animated-letter inline-block"
                    style={{ whiteSpace: "pre" }}
                >
                    {letter}
                </span>
            ))}
        </h2>
    );
}