import TrendingProduct1 from "../TrendingProduct/TrendingProduct1"

export default function TrendingProductSection({ sections_data }) {
    const sectionLayout = sections_data?.layout ?? "1"

    let section = ""
    if (sectionLayout === "1") {
        section = <TrendingProduct1 data={sections_data} />
    }
    return <>{section}</>
}
