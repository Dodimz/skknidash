import Map1 from "../Map/Map1"

export default function GoogleMapSection({ sections_data }) {
    const sectionLayout = sections_data?.layout ?? "1"
    // conditional rendering
    let section = ""
    if (sectionLayout === "1") {
        section = <Map1 data={sections_data} />
    }
    return <>{section}</>
}
