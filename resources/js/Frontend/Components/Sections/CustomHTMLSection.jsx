import CustomHTML from "../CustomHTML/CustomHTML"

export default function CustomHTMLSection({ sections_data }) {
    const sectionLayout = sections_data?.layout ?? "1"

    let section = ""
    if (sectionLayout === "1") {
        section = <CustomHTML data={sections_data} />
    }
    return <>{section}</>
}
