import PopularProduct1 from "../PopularProduct/PopularProduct1"

export default function PopularProductSection({ sections_data }) {
    const sectionLayout = sections_data?.layout ?? "1"

    let section = ""
    if (sectionLayout === "1") {
        section = <PopularProduct1 data={sections_data} />
    }
    return <>{section}</>
}
