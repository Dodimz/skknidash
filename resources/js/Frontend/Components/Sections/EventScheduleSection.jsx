import EventSchedule1 from "../EventSchedule/EventSchedule1"

export default function EventScheduleSection({ sections_data }) {
    const sectionLayout = sections_data?.layout ?? "1"

    let section = ""
    if (sectionLayout === "1") {
        section = <EventSchedule1 data={sections_data} />
    }
    return <>{section}</>
}
