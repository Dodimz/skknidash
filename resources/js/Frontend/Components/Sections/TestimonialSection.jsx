import Testimonial1 from "@/Frontend/Components/Testimonial/Testimonial1"
import Testimonial2 from "@/Frontend/Components/Testimonial/Testimonial2"
import Testimonial3 from "@/Frontend/Components/Testimonial/Testimonial3"
import Testimonial4 from "@/Frontend/Components/Testimonial/Testimonial4"

export default function TestimonialSection({ sections_data }) {
    const sectionLayout = sections_data?.layout ?? "1"
    // conditional rendering
    let section = ""
    if (sectionLayout === "1") {
        section = <Testimonial1 data={sections_data} />
    } else if (sectionLayout === "2") {
        section = <Testimonial2 data={sections_data} />
    } else if (sectionLayout === "3") {
        section = <Testimonial3 data={sections_data} />
    } else if (sectionLayout === "4") {
        section = <Testimonial4 data={sections_data} />
    }
    return <>{section}</>
}
