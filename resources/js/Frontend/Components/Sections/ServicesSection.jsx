import Service from "@/Frontend/Components/Service/Service"
import Service2 from "@/Frontend/Components/Service/Service2"
import Service3 from "@/Frontend/Components/Service/Service3"
import Service4 from "@/Frontend/Components/Service/Service4"
import Service5 from "../Service/Service5"
import Service6 from "../Service/Service6"

export default function ServiceSection({ sections_data }) {
    const sectionLayout = sections_data?.layout ?? "1"
    let section = ""
    // conditional rendering
    if (sectionLayout === "1") {
        section = <Service data={sections_data} />
    } else if (sectionLayout === "2") {
        section = <Service2 data={sections_data} />
    } else if (sectionLayout === "3") {
        section = <Service3 data={sections_data} />
    } else if (sectionLayout === "4") {
        section = <Service4 data={sections_data} />
    } else if (sectionLayout === "5") {
        section = <Service5 data={sections_data} />
    } else if (sectionLayout === "6") {
        section = <Service6 data={sections_data} />
    }
    return <>{section}</>
}
