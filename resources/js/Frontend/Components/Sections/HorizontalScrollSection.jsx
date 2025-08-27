import HorizontalScroll1 from "../HorizontalScroll/HorizontalScroll1"

export default function HorizontalScrollSection({ sections_data }) {
    const sectionLayout = sections_data?.layout ?? "1"

    let section = ""
    if (sectionLayout === "1") {
        section = <HorizontalScroll1 data={sections_data} />
    }
    return <>{section}</>
}
