import React from "react"
import NavigationLink from "@/Components/NavigationLink"

export default function Button({ href = "/", btnText, btnClass }) {
    return (
        <NavigationLink href={href} className={btnClass}>
            {btnText}
            <span>
                <i>
                    <svg width={11} height={11} viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M1 10L10 1M10 1L1 1M10 1L10 10"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </i>
                <i>
                    <svg width={11} height={11} viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M1 10L10 1M10 1L1 1M10 1L10 10"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </i>
            </span>
        </NavigationLink>
    )
}
