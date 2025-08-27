import { useState } from "react"
import { useEffect } from "react"

export default function Banner2({ data }) {
    const { title, background_image_url, desktop_height, mobile_height } = data
    const [screenSize, setScreenSize] = useState("desktop")
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setScreenSize("mobile")
            } else {
                setScreenSize("desktop")
            }
        }

        handleResize()

        // Add event listener for window resize
        window.addEventListener("resize", handleResize)

        // Cleanup the event listener on component unmount
        return () => window.removeEventListener("resize", handleResize)
    }, [])
    return (
        <div
            className="cs_banner cs_style_1 cs_bg_filed cs_primary_bg"
            style={{
                backgroundImage: `url(${background_image_url})`,
                height: screenSize === "desktop" ? `${desktop_height}px` : `${mobile_height}px`
            }}
        >
            {title && (
                <div className="container">
                    <h2
                        className="mb-0 cs_white_color cs_fs_50 text-end cs_normal"
                        dangerouslySetInnerHTML={{
                            __html: title
                        }}
                    />
                </div>
            )}
        </div>
    )
}
