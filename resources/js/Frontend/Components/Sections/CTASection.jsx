import Cta from "../Cta/Cta"
import Cta2 from "../Cta/Cta2"
import Cta3 from "../Cta/Cta3"
import Cta4 from "../Cta/Cta4"

export default function CTASection({ sections_data }) {
    const sectionLayout = sections_data?.layout ?? "1"
    // conditional render
    let layoutSection = ""
    if (sectionLayout === "1") {
        layoutSection = <Cta data={sections_data} />
    } else if (sectionLayout === "2") {
        layoutSection = <Cta2 data={sections_data} />
    } else if (sectionLayout === "3") {
        layoutSection = <Cta3 data={sections_data} />
    } else if (sectionLayout === "4") {
        layoutSection = <Cta4 data={sections_data} />
    }
    return <>{layoutSection}</>
}
