import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

/* -------------------- CONTEXT -------------------- */

const CarouselContext = createContext(null);

function useCarousel() {
    const context = useContext(CarouselContext);
    if (!context) {
        throw new Error("useCarousel must be used inside Carousel");
    }
    return context;
}

/* -------------------- CAROUSEL ROOT -------------------- */

const Carousel = ({
    children,
    orientation = "horizontal",
    opts,
    plugins,
    setApi,
    className = "",
    ...props
}) => {
    const [carouselRef, api] = useEmblaCarousel(
        {
            ...opts,
            axis: orientation === "horizontal" ? "x" : "y",
        },
        plugins
    );

    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const onSelect = useCallback((api) => {
        if (!api) return;
        setCanScrollPrev(api.canScrollPrev());
        setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = () => api && api.scrollPrev();
    const scrollNext = () => api && api.scrollNext();

    useEffect(() => {
        if (!api) return;
        onSelect(api);
        api.on("select", onSelect);
        api.on("reInit", onSelect);
    }, [api, onSelect]);

    useEffect(() => {
        if (api && setApi) setApi(api);
    }, [api, setApi]);

    return (
        <CarouselContext.Provider
            value={{
                carouselRef,
                orientation,
                scrollPrev,
                scrollNext,
                canScrollPrev,
                canScrollNext,
            }}
        >
            <div
                className={`relative ${className}`}
                role="region"
                aria-roledescription="carousel"
                {...props}
            >
                {children}
            </div>
        </CarouselContext.Provider>
    );
};

/* -------------------- CONTENT -------------------- */

const CarouselContent = ({ children, className = "" }) => {
    const { carouselRef, orientation } = useCarousel();

    return (
        <div ref={carouselRef} className="overflow-hidden">
            <div
                className={`flex ${orientation === "horizontal"
                        ? "-ml-4"
                        : "-mt-4 flex-col"
                    } ${className}`}
            >
                {children}
            </div>
        </div>
    );
};

/* -------------------- ITEM -------------------- */

const CarouselItem = ({ children, className = "" }) => {
    const { orientation } = useCarousel();

    return (
        <div
            role="group"
            aria-roledescription="slide"
            className={`min-w-0 shrink-0 grow-0 basis-full ${orientation === "horizontal" ? "pl-4" : "pt-4"
                } ${className}`}
        >
            {children}
        </div>
    );
};

/* -------------------- BUTTONS -------------------- */

const CarouselPrevious = ({ className = "" }) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();

    return (
        <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className={`absolute h-8 w-8 rounded-full border bg-white shadow flex items-center justify-center disabled:opacity-50
        ${orientation === "horizontal"
                    ? "-left-12 top-1/2 -translate-y-1/2"
                    : "-top-12 left-1/2 -translate-x-1/2 rotate-90"
                }
        ${className}`}
        >
            <ArrowLeft className="h-4 w-4" />
        </button>
    );
};

const CarouselNext = ({ className = "" }) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel();

    return (
        <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            className={`absolute h-8 w-8 rounded-full border bg-white shadow flex items-center justify-center disabled:opacity-50
        ${orientation === "horizontal"
                    ? "-right-12 top-1/2 -translate-y-1/2"
                    : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90"
                }
        ${className}`}
        >
            <ArrowRight className="h-4 w-4" />
        </button>
    );
};

/* -------------------- EXPORT -------------------- */

export {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
};
