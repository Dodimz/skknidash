import AditionalFeature1 from "../AditionalFeature/AditionalFeature1"
import AditionalFeature2 from "../AditionalFeature/AditionalFeature2"
import AditionalFeature3 from "../AditionalFeature/AditionalFeature3"
import AditionalFeature4 from "../AditionalFeature/AditionalFeature4"

export default function AditionalFeatureSection({ sections_data }) {
    const sectionLayout = sections_data?.layout ?? "1"

    let section = ""
    if (sectionLayout === "1") {
        section = <AditionalFeature1 data={sections_data} />
    } else if (sectionLayout === "2") {
        section = <AditionalFeature2 data={sections_data} />
    } else if (sectionLayout === "3") {
        section = <AditionalFeature3 data={sections_data} />
    } else if (sectionLayout === "4") {
        section = <AditionalFeature4 data={sections_data} />
    }
    return <>{section}</>
}
