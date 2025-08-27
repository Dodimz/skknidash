import Partner1 from "@/Frontend/Components/Partner/Partner1"
import Partner2 from "@/Frontend/Components/Partner/Partner2"

export default function PartnerSection({ sections_data }) {
    const sectionLayout = sections_data?.layout ?? "1"

    // conditional rendering
    let layout = ""
    if (sectionLayout === "1") {
        layout = <Partner1 data={sections_data} />
    } else if (sectionLayout === "2") {
        layout = <Partner2 data={sections_data} />
    }
    return <>{layout}</>
}
