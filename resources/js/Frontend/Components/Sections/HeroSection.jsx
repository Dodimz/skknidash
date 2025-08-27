import Hero from "@/Frontend/Components/Hero/index.jsx"
import Hero2 from "@/Frontend/Components/Hero/Hero2"
import Hero3 from "@/Frontend/Components/Hero/Hero3"
import Hero4 from "@/Frontend/Components/Hero/Hero4"
import Hero5 from "@/Frontend/Components/Hero/Hero5"
import Hero6 from "@/Frontend/Components/Hero/Hero6"
import Hero7 from "@/Frontend/Components/Hero/Hero7"
import Hero8 from "@/Frontend/Components/Hero/Hero8"
import Hero9 from "@/Frontend/Components/Hero/Hero9"
import Hero10 from "@/Frontend/Components/Hero/Hero10"
import Hero11 from "@/Frontend/Components/Hero/Hero11"
import Hero12 from "../Hero/Hero12"
import Hero13 from "../Hero/Hero13"
import Hero14 from "../Hero/Hero14"
import Hero15 from "../Hero/Hero15"
import Hero16 from "../Hero/Hero16"

export default function HeroSection({ sections_data }) {
    const sectionLayout = sections_data?.layout ?? "1"

    let layoutSection = ""
    // conditional layout rendering
    if (sectionLayout === "1") {
        layoutSection = <Hero data={sections_data} />
    } else if (sectionLayout === "2") {
        layoutSection = <Hero2 data={sections_data} />
    } else if (sectionLayout === "3") {
        layoutSection = <Hero3 data={sections_data} />
    } else if (sectionLayout === "4") {
        layoutSection = <Hero4 data={sections_data} />
    } else if (sectionLayout === "5") {
        layoutSection = <Hero5 data={sections_data} />
    } else if (sectionLayout === "6") {
        layoutSection = <Hero6 data={sections_data} />
    } else if (sectionLayout === "7") {
        layoutSection = <Hero7 data={sections_data} />
    } else if (sectionLayout === "8") {
        layoutSection = <Hero8 data={sections_data} />
    } else if (sectionLayout === "9") {
        layoutSection = <Hero9 data={sections_data} />
    } else if (sectionLayout === "10") {
        layoutSection = <Hero10 data={sections_data} />
    } else if (sectionLayout === "11") {
        layoutSection = <Hero11 data={sections_data} />
    } else if (sectionLayout === "12") {
        layoutSection = <Hero12 data={sections_data} />
    } else if (sectionLayout === "13") {
        layoutSection = <Hero13 data={sections_data} />
    } else if (sectionLayout === "14") {
        layoutSection = <Hero14 data={sections_data} />
    } else if (sectionLayout === "15") {
        layoutSection = <Hero15 data={sections_data} />
    } else if (sectionLayout === "16") {
        layoutSection = <Hero16 data={sections_data} />
    }
    return <>{layoutSection}</>
}
