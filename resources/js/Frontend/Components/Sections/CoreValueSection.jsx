import CoreValue from "@/Frontend/Components/CoreValue/CoreValue"
import CoreValue2 from "@/Frontend/Components/CoreValue/CoreValue2"
import CoreValue3 from "@/Frontend/Components/CoreValue/CoreValue3"
import CoreValue4 from "@/Frontend/Components/CoreValue/CoreValue4"
import CoreValue5 from "@/Frontend/Components/CoreValue/CoreValue5"

export default function CTASection({ sections_data }) {
    const sectionLayout = sections_data?.layout ?? "1"
    // conditional render
    let layoutSection = ""
    if (sectionLayout === "1") {
        layoutSection = <CoreValue data={sections_data} />
    } else if (sectionLayout === "2") {
        layoutSection = <CoreValue2 data={sections_data} />
    } else if (sectionLayout === "3") {
        layoutSection = <CoreValue3 data={sections_data} />
    } else if (sectionLayout === "4") {
        layoutSection = <CoreValue4 data={sections_data} />
    } else if (sectionLayout === "5") {
        layoutSection = <CoreValue5 data={sections_data} />
    }
    return <>{layoutSection}</>
}
