import CaseStudy1 from "../CaseStudy/CaseStudy1"
import CaseStudy2 from "../CaseStudy/CaseStudy2"
import CaseStudy3 from "../CaseStudy/CaseStudy3"
import CaseStudy4 from "../CaseStudy/CaseStudy4"

export default function CaseStudySection({ sections_data }) {
    const sectionLayout = sections_data?.layout ?? "1"
    // conditional rendering
    let section = ""
    if (sectionLayout === "1") {
        section = <CaseStudy1 data={sections_data} />
    } else if (sectionLayout === "2") {
        section = <CaseStudy2 data={sections_data} />
    } else if (sectionLayout === "3") {
        section = <CaseStudy3 data={sections_data} />
    } else if (sectionLayout === "4") {
        section = <CaseStudy4 data={sections_data} />
    }
    return <>{section}</>
}
