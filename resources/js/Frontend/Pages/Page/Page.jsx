import React, { useEffect, useRef } from "react"
import { useState } from "react"
import FrontendLayout from "@/Frontend/Layouts/FrontendLayout"
import HeroSection from "@/Frontend/Components/Sections/HeroSection"
import FunFactSection from "@/Frontend/Components/Sections/FunFactSection"
import ServiceSection from "@/Frontend/Components/Sections/ServicesSection"
import PortfolioSection from "@/Frontend/Components/Sections/PortfolioSection"
import AditionalFeatureSection from "@/Frontend/Components/Sections/AditionalFeatureSection"
import VideoSection from "@/Frontend/Components/Sections/VideoSection"
import TeamSection from "@/Frontend/Components/Sections/TeamSection"
import TestimonialSection from "@/Frontend/Components/Sections/TestimonialSection"
import BlogSection from "@/Frontend/Components/Sections/BlogSection"
import MarqueeSection from "@/Frontend/Components/Sections/MarqueeSection"
import PartnerSection from "@/Frontend/Components/Sections/PartnerSection"
import CTASection from "@/Frontend/Components/Sections/CTASection"
import PricingSection from "@/Frontend/Components/Sections/PricingSection"
import GoogleMapSection from "@/Frontend/Components/Sections/GoogleMapSection"
import CaseStudySection from "@/Frontend/Components/Sections/CaseStudySection"
import AboutSection from "@/Frontend/Components/Sections/AboutSection"
import WhyChooseUsSection from "@/Frontend/Components/Sections/WhyChooseUsSection"
import FaqSection from "@/Frontend/Components/Sections/FaqSection"
import PageHeading from "@/Frontend/Components/PageHeading"
import { useDispatch, useSelector } from "react-redux"
import { usePage } from "@inertiajs/react"
import { updateClickedSection, updateCurrentLang, updatePageData, updatePageInfo } from "@/Redux/features/pages/Page/page"
import PhotoGallerySection from "@/Frontend/Components/Sections/PhotoGallerySection"
import WorkingProcessSection from "@/Frontend/Components/Sections/WorkingProcessSection"
import BannerSection from "@/Frontend/Components/Sections/BannerSection"
import CoreValueSection from "@/Frontend/Components/Sections/CoreValueSection"
import ContactWithFormBuilderSection from "@/Frontend/Components/Sections/ContactWithFormBuilderSection"
import BioneMeta from "@/utils/BioneMeta"
import CustomHTMLSection from "@/Frontend/Components/Sections/CustomHTMLSection"
import JobListingsSection from "@/Frontend/Components/Sections/JobListingsSection"
import TextEditorSection from "@/Frontend/Components/Sections/TextEditorSection"
import EventScheduleSection from "@/Frontend/Components/Sections/EventScheduleSection"
import HorizontalScrollSection from "@/Frontend/Components/Sections/HorizontalScrollSection"
import TeamDetailsSection from "@/Frontend/Components/Sections/TeamDetailsSection"
import PortfolioDetailsSection from "@/Frontend/Components/Sections/PortfolioDetailsSection"
import CaseStudyDetailsSection from "@/Frontend/Components/Sections/CaseStudyDetailsSection"
import CategorySection from "@/Frontend/Components/Sections/CategorySection"
import PopularProductSection from "@/Frontend/Components/Sections/PopularProductSection"
import TrendingProductSection from "@/Frontend/Components/Sections/TrendingProductSection"

export default function Page() {
    const { page_data, lang, page_info, site_name } = usePage().props
    const { pageInfo, pageData, currentLang, currentEditedSection, isEditorMode } = useSelector((state) => state.pages)
    const sectionData = pageData[currentLang] ?? []
    const currentLangPageInfo = pageInfo[currentLang]
    const dispatch = useDispatch()
    const sectionRef = useRef()
    const [screenSize, setScreenSize] = useState("desktop")
    const sectionComponents = {
        Hero: HeroSection,
        FunFact: FunFactSection,
        Service: ServiceSection,
        Portfolio: PortfolioSection,
        AditionalFeature: AditionalFeatureSection,
        Video: VideoSection,
        Team: TeamSection,
        Testimonial: TestimonialSection,
        Blog: BlogSection,
        Marquee: MarqueeSection,
        Partner: PartnerSection,
        CTA: CTASection,
        Pricing: PricingSection,
        GoogleMap: GoogleMapSection,
        CaseStudy: CaseStudySection,
        About: AboutSection,
        WhyChooseUs: WhyChooseUsSection,
        Faq: FaqSection,
        PhotoGallery: PhotoGallerySection,
        WorkingProcess: WorkingProcessSection,
        Banner: BannerSection,
        CoreValue: CoreValueSection,
        ContactWithFormBuilder: ContactWithFormBuilderSection,
        CustomHTML: CustomHTMLSection,
        JobListings: JobListingsSection,
        TeamDetails: TeamDetailsSection,
        HorizontalScroll: HorizontalScrollSection,
        EventSchedule: EventScheduleSection,
        PortfolioDetails: PortfolioDetailsSection,
        CaseStudyDetails: CaseStudyDetailsSection,
        TextEditor: TextEditorSection,
        Category: CategorySection,
        PopularProduct: PopularProductSection,
        TrendingProduct: TrendingProductSection
    }

    BioneMeta(
        currentLangPageInfo?.meta_title ?? currentLangPageInfo?.title,
        currentLangPageInfo?.meta_title ?? currentLangPageInfo?.title,
        currentLangPageInfo?.meta_tags,
        currentLangPageInfo?.meta_description,
        currentLangPageInfo?.meta_image,
        site_name
    )

    // page header data
    let pageHeaderData = {
        title: currentLangPageInfo?.breadcrumb_title ? currentLangPageInfo?.breadcrumb_title : currentLangPageInfo?.title,
        breadcrumb: [
            { label: "Home", url: "/" },
            {
                label: currentLangPageInfo?.breadcrumb_title ? currentLangPageInfo?.breadcrumb_title : currentLangPageInfo?.title,
                url: null
            }
        ]
    }

    useEffect(() => {
        if (page_data) {
            dispatch(updateCurrentLang(lang.default_lang))
            dispatch(updatePageData(page_data))
            dispatch(updatePageInfo(page_info))
        }
    }, [page_data])

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 992) {
                setScreenSize("mobile")
            } else {
                setScreenSize("desktop")
            }
        }

        handleResize()

        // Add event listener for window resize
        window.addEventListener("resize", handleResize)

        // Cleanup the event listener on component unmount
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        if (sectionRef.current) {
            const children = sectionRef.current.children
            const targetChild = Array.from(children).find((child) => child.id === currentEditedSection)
            if (targetChild) {
                targetChild.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                })
            }
        }
    }, [currentEditedSection])

    return (
        <FrontendLayout headerLayout={currentLangPageInfo?.header_layout} footerLayout={currentLangPageInfo?.footer_layout}>
            {currentLangPageInfo?.is_show_breadcrumb && (
                <PageHeading
                    data={pageHeaderData}
                    is_show_breadcrumb={currentLangPageInfo?.is_show_breadcrumb}
                    bgSrc={currentLangPageInfo?.breadcrumb_image ? currentLangPageInfo?.breadcrumb_image : "/static/page_heading.jpeg"}
                />
            )}

            <div ref={sectionRef}>
                {sectionData?.map((section) => {
                    const advanced = section?.advanced
                    const SectionComponent = sectionComponents[section?.type]
                    return (
                        <section
                            id={section.sectionId}
                            key={section.sectionId}
                            onClick={() => dispatch(updateClickedSection(section.sectionId))}
                            style={{
                                paddingTop: screenSize === "desktop" ? `${advanced?.padding?.top.lg}px` : `${advanced?.padding?.top.md}px`,
                                paddingBottom: screenSize === "desktop" ? `${advanced?.padding?.bottom.lg}px` : `${advanced?.padding?.bottom.md}px`,
                                backgroundImage: `url(${advanced?.backgroundImage ?? ""})`,
                                backgroundColor: advanced?.backgroundColor ?? "transparent"
                            }}
                            className={`cs_bg_filed${advanced?.is_section_dark ? " cs_dark_section" : ""} ${advanced?.classes} ${isEditorMode ? "editor-hover-active" : ""
                                }`}
                        >
                            <SectionComponent sections_data={section?.data} />
                        </section>
                    )
                })}
            </div>
        </FrontendLayout>
    )
}
