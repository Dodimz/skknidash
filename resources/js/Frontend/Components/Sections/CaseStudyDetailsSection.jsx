import React from "react"
import CaseStudyDetails1 from "../CaseStudyDetails/CaseStudyDetails1"
import CaseStudyDetails2 from "../CaseStudyDetails/CaseStudyDetails2"

export default function CaseStudyDetailsSection({ sections_data }) {
    const sectionLayout = sections_data?.layout ?? "1"
    // conditional render
    let layoutSection = ""
    if (sectionLayout === "1") {
        layoutSection = <CaseStudyDetails1 data={sections_data} />
    } else if (sectionLayout === "2") {
        layoutSection = <CaseStudyDetails2 data={sections_data} />
    }
    return <>{layoutSection}</>
}
