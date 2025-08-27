import { useState } from "react"
import { useEffect } from "react"

export default function Banner3({ data }) {
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
            className="cs_banner cs_style_3 cs_bg_filed text-center cs_center"
            style={{
                backgroundImage: `url(${background_image_url})`,
                height: screenSize === "desktop" ? `${desktop_height}px` : `${mobile_height}px`
            }}
        >
            {title && (
                <div className="container">
                    <h2
                        className="mb-0 cs_white_color cs_fs_60 cs_bold"
                        dangerouslySetInnerHTML={{
                            __html: title
                        }}
                    />
                </div>
            )}
            <div className="cs_shape_1 cs_accent_color">
                <svg width={228} height={475} viewBox="0 0 228 475" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="195.468" y="187.383" width={451} height={42} transform="rotate(140.444 195.468 187.383)" fill="currentColor" />
                    <rect x="212.468" y="109.383" width={451} height={42} transform="rotate(140.444 212.468 109.383)" fill="currentColor" />
                    <rect x="227.468" y="32.3826" width={451} height={42} transform="rotate(140.444 227.468 32.3826)" fill="currentColor" />
                </svg>
            </div>
            <div className="cs_shape_2 cs_accent_color">
                <svg width={210} height={475} viewBox="0 0 210 475" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x={32} y="287.213" width={451} height={42} transform="rotate(-39.5563 32 287.213)" fill="currentColor" />
                    <rect x={15} y="365.213" width={451} height={42} transform="rotate(-39.5563 15 365.213)" fill="currentColor" />
                    <rect y="442.213" width={451} height={42} transform="rotate(-39.5563 0 442.213)" fill="currentColor" />
                </svg>
            </div>
        </div>
    )
}
