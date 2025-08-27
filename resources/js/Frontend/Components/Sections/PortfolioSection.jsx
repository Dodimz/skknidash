import Portfolio1 from "@/Frontend/Components/Portfolio/Portfolio1"
export default function PortfolioSection({ sections_data }) {
    const sectionLayout = sections_data?.layout ?? "1"
    // conditional rendering
    let layoutSection = ""
    if (sectionLayout === "1") {
        layoutSection = <Portfolio1 data={sections_data} />
    }
    return <>{layoutSection}</>
}
