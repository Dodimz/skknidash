import WorkingProcess1 from "../WorkingProgress/WorkingProcess1"
import WorkingProcess2 from "../WorkingProgress/WorkingProcess2"
import WorkingProcess3 from "../WorkingProgress/WorkingProcess3"

export default function WorkingProcessSection({ sections_data }) {
    const sectionLayout = sections_data?.layout ?? "1"
    let layoutSection = ""
    if (sectionLayout === "1") {
        layoutSection = <WorkingProcess1 data={sections_data} />
    } else if (sectionLayout === "2") {
        layoutSection = <WorkingProcess2 data={sections_data} />
    } else if (sectionLayout === "3") {
        layoutSection = <WorkingProcess3 data={sections_data} />
    }
    return <>{layoutSection}</>
}
