import WhyChooseUs1 from "@/Frontend/Components/WhyChooseUs/WhyChooseUs1"
import WhyChooseUs2 from "@/Frontend/Components/WhyChooseUs/WhyChooseUs2"
import WhyChooseUs3 from "../WhyChooseUs/WhyChooseUs3"
import WhyChooseUs4 from "../WhyChooseUs/WhyChooseUs4"

export default function WhyChooseUsSection({ sections_data }) {
    const sectionLayout = sections_data?.layout ?? "1"
    // conditionally rendering
    let section = null
    if (sectionLayout === "1") {
        section = <WhyChooseUs1 data={sections_data} />
    } else if (sectionLayout === "2") {
        section = <WhyChooseUs2 data={sections_data} />
    } else if (sectionLayout === "3") {
        section = <WhyChooseUs3 data={sections_data} />
    } else if (sectionLayout === "4") {
        section = <WhyChooseUs4 data={sections_data} />
    }
    return <>{section}</>
}
