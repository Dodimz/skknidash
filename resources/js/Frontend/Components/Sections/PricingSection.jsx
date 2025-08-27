import Pricing1 from "../Pricing/Pricing1"
import Pricing2 from "../Pricing/Pricing2"

export default function PricingSection({ sections_data }) {
    const sectionLayout = sections_data?.layout ?? "1"
    let section = ""
    if (sectionLayout === "1") {
        section = <Pricing1 data={sections_data} />
    } else if (sectionLayout === "2") {
        section = <Pricing2 data={sections_data} />
    }
    return <>{section}</>
}
