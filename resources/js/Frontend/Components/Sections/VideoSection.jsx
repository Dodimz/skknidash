import Video1 from "@/Frontend/Components/VideoModal/Video1"
import Video2 from "@/Frontend/Components/VideoModal/Video2"
import Video3 from "@/Frontend/Components/VideoModal/Video3"

export default function VideoSection({ sections_data }) {
    const sectionLayout = sections_data?.layout ?? "1"
    // conditional rendering
    let layoutSection = ""
    if (sectionLayout === "1") {
        layoutSection = <Video1 data={sections_data} />
    } else if (sectionLayout === "2") {
        layoutSection = <Video2 data={sections_data} />
    } else if (sectionLayout === "3") {
        layoutSection = <Video3 data={sections_data} />
    }
    return <>{layoutSection}</>
}
