import React from "react"
import SocialWidget from "../Widget/SocialWidget"
import { useSelector } from "react-redux"
import CookiePolicy from "../Cookie/CookiePolicy"
export default function Footer2() {
    const customize = useSelector((state) => state.customize)

    return (
        <footer className="cs_fullscreen_footer">
            <div className="container-fluid cs_padding_120_120">
                <div className="cs_fullscreen_footer_in">
                    <div className="cs_fullscreen_footer_left">
                        <div
                            className="cs_copyright"
                            dangerouslySetInnerHTML={{
                                __html: customize.footer.copyright_text
                            }}
                        />
                    </div>
                    <div className="cs_fullscreen_footer_right">
                        <SocialWidget />
                    </div>
                </div>
            </div>
        </footer>
    )
}
