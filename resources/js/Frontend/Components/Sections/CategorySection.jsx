import Category1 from "../Category/Category1"

export default function CategorySection({ sections_data }) {
    const sectionLayout = sections_data?.layout ?? "1"
    // conditional rendering
    let section = ""
    if (sectionLayout === "1") {
        section = <Category1 data={sections_data} />
    }
    return <>{section}</>
}
