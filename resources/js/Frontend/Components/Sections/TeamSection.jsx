import Team1 from "@/Frontend/Components/Team/Team1"
import Team2 from "@/Frontend/Components/Team/Team2"
import Team3 from "@/Frontend/Components/Team/Team3"
import Team4 from "@/Frontend/Components/Team/Team4"

export default function TeamSection({ sections_data }) {
    const sectionLayout = sections_data?.layout ?? "1"
    // conditional render
    let layoutSection = ""
    if (sectionLayout === "1") {
        layoutSection = <Team1 data={sections_data} />
    } else if (sectionLayout === "2") {
        layoutSection = <Team2 data={sections_data} />
    } else if (sectionLayout === "3") {
        layoutSection = <Team3 data={sections_data} />
    } else if (sectionLayout === "4") {
        layoutSection = <Team4 data={sections_data} />
    }
    return <>{layoutSection}</>
}
