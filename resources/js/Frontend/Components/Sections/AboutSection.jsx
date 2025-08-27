import About1 from "@/Frontend/Components/About/About1"
import About2 from "@/Frontend/Components/About/About2"
import About3 from "../About/About3"
import About4 from "../About/About4"
import About5 from "../About/About5"
import About6 from "../About/About6"

export default function AboutSection({ sections_data }) {
    const sectionLayout = sections_data?.layout ?? "1"

    let section = ""
    if (sectionLayout === "1") {
        section = <About1 data={sections_data} />
    } else if (sectionLayout === "2") {
        section = <About2 data={sections_data} />
    } else if (sectionLayout === "3") {
        section = <About3 data={sections_data} />
    } else if (sectionLayout === "4") {
        section = <About4 data={sections_data} />
    } else if (sectionLayout === "5") {
        section = <About5 data={sections_data} />
    } else if (sectionLayout === "6") {
        section = <About6 data={sections_data} />
    }
    return <>{section}</>
}
