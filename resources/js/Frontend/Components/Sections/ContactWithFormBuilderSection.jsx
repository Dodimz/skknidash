import ContactWithFormBuilder1 from "../ContactWithFormBuilder/ContactWithFormBuilder1"
import ContactWithFormBuilder2 from "../ContactWithFormBuilder/ContactWithFormBuilder2"
import ContactWithFormBuilder3 from "../ContactWithFormBuilder/ContactWithFormBuilder3"
import ContactWithFormBuilder4 from "../ContactWithFormBuilder/ContactWithFormBuilder4"

export default function ContactWithFormBuilderSection({ sections_data }) {
    const sectionLayout = sections_data?.layout ?? "1"
    // conditional render
    let layoutSection = ""
    if (sectionLayout === "1") {
        layoutSection = <ContactWithFormBuilder1 sections_data={sections_data} />
    } else if (sectionLayout === "2") {
        layoutSection = <ContactWithFormBuilder2 sections_data={sections_data} />
    } else if (sectionLayout === "3") {
        layoutSection = <ContactWithFormBuilder3 sections_data={sections_data} />
    } else if (sectionLayout === "4") {
        layoutSection = <ContactWithFormBuilder4 sections_data={sections_data} />
    }
    return <>{layoutSection}</>
}
