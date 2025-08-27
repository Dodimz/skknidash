import Marquee1 from "../Marquee/Marquee1"
import Marquee2 from "../Marquee/Marquee2"
import Marquee3 from "../Marquee/Marquee3"
export default function MarqueeSection({ sections_data }) {
    const sectionLayout = sections_data?.layout ?? "1"
    let layoutSection = ""
    // conditional layout rendering
    if (sectionLayout === "1") {
        layoutSection = <Marquee1 data={sections_data} />
    } else if (sectionLayout === "2") {
        layoutSection = <Marquee2 data={sections_data} />
    } else if (sectionLayout === "3") {
        layoutSection = <Marquee3 data={sections_data} />
    }

    return <>{layoutSection}</>
}
