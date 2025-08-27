import React from "react"
import TeamDetails1 from "../TeamDetails/TeamDetails1"

export default function TeamDetailsSection({ sections_data }) {
    const sectionLayout = sections_data?.layout ?? "1"
    // conditional render
    let layoutSection = ""
    if (sectionLayout === "1") {
        layoutSection = <TeamDetails1 data={sections_data} />
    }
    return <>{layoutSection}</>
}
