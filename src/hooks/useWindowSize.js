import { useState, useEffect } from "react";

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined
    });

    useEffect(() => {

        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerWidth

            });            
        }

        handleResize();//called at loadtime

        window.addEventListener("resize", handleResize);//anytime resize event fire, call handleResize
                   
        return () => window.removeEventListener('resize', handleResize);        
    },[])

    return windowSize;
}

export default useWindowSize;