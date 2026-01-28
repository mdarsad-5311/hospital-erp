import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const onChange = () => {
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        };

        // initial check
        onChange();

        window.addEventListener("resize", onChange);
        return () => window.removeEventListener("resize", onChange);
    }, []);

    return isMobile;
}
