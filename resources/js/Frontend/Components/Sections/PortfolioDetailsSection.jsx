import React from "react"
import PortfolioDetails1 from "../PortfolioDetails/PortfolioDetails1"

export default function PortfolioDetailsSection({ sections_data }) {
    const sectionLayout = sections_data?.layout ?? "1"
    // conditional render
    let layoutSection = ""
    if (sectionLayout === "1") {
        layoutSection = <PortfolioDetails1 data={sections_data} />
    }
    return <>{layoutSection}</>
}
