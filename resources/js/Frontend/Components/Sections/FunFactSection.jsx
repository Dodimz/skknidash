import FunFact1 from "@/Frontend/Components/FunFact/FunFact1"
export default function FunFactSection({ sections_data }) {
    const sectionLayout = sections_data?.layout ?? "1"
    // conditional render
    let section = ""
    if (sectionLayout === "1") {
        section = <FunFact1 data={sections_data} />
    }
    return <>{section}</>
}
