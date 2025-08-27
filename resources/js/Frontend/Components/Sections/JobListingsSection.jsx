import JobListings from "../JobListings/JobListings"

export default function JobListingsSection({ sections_data }) {
    const sectionLayout = sections_data?.layout ?? "1"

    let section = ""
    if (sectionLayout === "1") {
        section = <JobListings data={sections_data} />
    }
    return <>{section}</>
}
