import PhotoGallery1 from "../PhotoGallery/PhotoGallery1"
import PhotoGallery2 from "../PhotoGallery/PhotoGallery2"
import PhotoGallery3 from "../PhotoGallery/PhotoGallery3"
import PhotoGallery4 from "../PhotoGallery/PhotoGallery4"

export default function PartnerSection({ sections_data }) {
    const sectionLayout = sections_data?.layout ?? "1"

    // conditional rendering
    let layout = ""
    if (sectionLayout === "1") {
        layout = <PhotoGallery1 data={sections_data} />
    } else if (sectionLayout === "2") {
        layout = <PhotoGallery2 data={sections_data} />
    } else if (sectionLayout === "3") {
        layout = <PhotoGallery3 data={sections_data} />
    } else if (sectionLayout === "4") {
        layout = <PhotoGallery4 data={sections_data} />
    }
    return <>{layout}</>
}
