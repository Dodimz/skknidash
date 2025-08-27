import TextEditor from "../TextEditor/TextEditor"

export default function TextEditorSection({ sections_data }) {
    const sectionLayout = sections_data?.layout ?? "1"

    let section = ""
    if (sectionLayout === "1") {
        section = <TextEditor data={sections_data} />
    }
    return <>{section}</>
}
