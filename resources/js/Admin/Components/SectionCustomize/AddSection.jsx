import { useState } from "react"
import { Icon } from "@iconify/react"
import { usePage } from "@inertiajs/react"

export default function AddSection({ setIsAddSection, addSection }) {
    const { isEnabledCaseStudy, isEnabledPortfolio, isEnabledService, isEnabledTeam } = usePage().props

    const [sections, setSections] = useState([
        {
            type: "About",
            title: "About",
            icon: "lucide:server",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "AditionalFeature",
            title: "Aditional Feature",
            icon: "lucide:layout-list",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "Banner",
            title: "Banner",
            icon: "lucide:rectangle-horizontal",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "CaseStudy",
            title: "Case Study",
            icon: "lucide:laptop-minimal-check",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "CaseStudyDetails",
            title: "Case Study Details",
            icon: "lucide:laptop-minimal",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "Category",
            title: "Product Category",
            icon: "lucide:link",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "Blog",
            title: "Blog",
            icon: "lucide:grid-2x2",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "CoreValue",
            title: "Core Value",
            icon: "lucide:cpu",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "ContactWithFormBuilder",
            title: "Contact With Form Builder",
            icon: "lucide:container",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "CTA",
            title: "CTA",
            icon: "lucide:rectangle-ellipsis",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "CustomHTML",
            title: "Custom HTML",
            icon: "lucide:code-xml",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "EventSchedule",
            title: "Event Schedule",
            icon: "lucide:pen-box",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "Faq",
            title: "FAQ",
            icon: "lucide:message-circle-question",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "FunFact",
            title: "Funfact",
            icon: "lucide:chart-pie",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "GoogleMap",
            title: "Google Map",
            icon: "lucide:map",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "Hero",
            title: "Hero",
            icon: "lucide:monitor",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "HorizontalScroll",
            title: "Horizontal Scroll",
            icon: "lucide:stretch-horizontal",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "JobListings",
            title: "Job Listings",
            icon: "lucide:list",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "Marquee",
            title: "Marquee",
            icon: "lucide:container",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "Partner",
            title: "Partner",
            icon: "lucide:workflow",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "Pricing",
            title: "Pricing",
            icon: "lucide:zap",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "Portfolio",
            title: "Portfolio",
            icon: "lucide:route",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "PortfolioDetails",
            title: "Portfolio Details",
            icon: "lucide:laptop-minimal",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "PhotoGallery",
            title: "Photo Gallery",
            icon: "lucide:images",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "PopularProduct",
            title: "Popular Product",
            icon: "lucide:life-buoy",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "Service",
            title: "Services",
            icon: "lucide:clipboard-list",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "Team",
            title: "Team",
            icon: "lucide:copy-plus",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "TeamDetails",
            title: "Team Details",
            icon: "lucide:copy",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "Testimonial",
            title: "Testimonial",
            icon: "lucide:award",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "TextEditor",
            title: "Text Editor",
            icon: "lucide:letter-text",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "TrendingProduct",
            title: "Trending Product",
            icon: "lucide:rocket",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "Video",
            title: "Video Modal",
            icon: "lucide:video",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "WhyChooseUs",
            title: "Why Choose Us",
            icon: "lucide:inbox",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "WorkingProcess",
            title: "Working Process",
            icon: "lucide:videotape",
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        }
    ])

    const [searchTerm, setSearchTerm] = useState("")

    // Filter sections based on search input AND enabled features
    const filteredSections = sections.filter((section) => {
        const matchesSearch = section.title.toLowerCase().includes(searchTerm.toLowerCase())

        // Then check if the section should be hidden based on disabled features
        const shouldShow =
            !(isEnabledCaseStudy === "0" && (section.type === "CaseStudy" || section.type === "CaseStudyDetails")) &&
            !(isEnabledPortfolio === "0" && (section.type === "Portfolio" || section.type === "PortfolioDetails")) &&
            !(isEnabledService === "0" && section.type === "Service") &&
            !(isEnabledTeam === "0" && (section.type === "Team" || section.type === "TeamDetails"))

        return matchesSearch && shouldShow
    })

    return (
        <div className="customize-section-description-container">
            <div className="add-section-title">
                <button onClick={() => setIsAddSection(false)}>
                    <Icon icon="lucide:chevron-left" width="24" height="24" />
                </button>
                <span>
                    Action <br />
                    <strong>Add Section</strong>
                </span>
            </div>
            <div className="customize-field">
                <h4 className="section-list-title">Add Section</h4>
                <div className="section-search-input-wrap">
                    <span className="section-search-icon">
                        <Icon icon="lucide:search" width="18" height="18" />
                    </span>
                    <input
                        type="text"
                        className="section-search-input"
                        placeholder="Search section..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                        <span className="section-search-clear" onClick={() => setSearchTerm("")}>
                            <Icon icon="lucide:x" width="16" height="16" />
                        </span>
                    )}
                </div>
                <div className="section-list">
                    {filteredSections.length > 0 ? (
                        filteredSections.map((section, index) => (
                            <div
                                key={index}
                                className="section-item"
                                onClick={() => {
                                    addSection(section)
                                    setIsAddSection(false)
                                    setSearchTerm("")
                                }}
                            >
                                <i>
                                    <Icon icon={`${section.icon ? section.icon : "lucide:box"}`} width="24" height="24" />
                                </i>
                                <span>{section.title}</span>
                            </div>
                        ))
                    ) : (
                        <div className="section-list-not-found">Not found</div>
                    )}
                </div>
            </div>
        </div>
    )
}
