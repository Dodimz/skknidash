import { IonIcon } from "@ionic/react"
import { chevronForward, closeOutline, helpCircle, trashOutline, globeOutline } from "ionicons/icons"
import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import PageCustomizeLayout from "@/Admin/Layouts/PageCustomizeLayout"
import HeroSectionCustomize from "@/Admin/Components/SectionCustomize/HeroSectionCustomize"
import FunFactSectionCustomize from "@/Admin/Components/SectionCustomize/FunFactSectionCustomize"
import ServiceSectionCustomize from "@/Admin/Components/SectionCustomize/ServiceSectionCustomize"
import PortfolioSectionCustomize from "@/Admin/Components/SectionCustomize/PortfolioSectionCustomize"
import AditionalFeatureSectionCustomize from "@/Admin/Components/SectionCustomize/AditionalFeatureSectionCustomize"
import VideoSectionCustomize from "@/Admin/Components/SectionCustomize/VideoSectionCustomize"
import TeamSectionCustomize from "@/Admin/Components/SectionCustomize/TeamSectionCustomize"
import BlogSectionCustomize from "@/Admin/Components/SectionCustomize/BlogSectionCustomize"
import MarqueeSectionCustomize from "@/Admin/Components/SectionCustomize/MarqueeSectionCustomize"
import PartnerSectionCustomize from "@/Admin/Components/SectionCustomize/PartnerSectionCustomize"
import CTASectionCustomize from "@/Admin/Components/SectionCustomize/CTASectionCustomize"
import PricingSectionCustomize from "@/Admin/Components/SectionCustomize/PricingSectionCustomize"
import GoogleMapSectionCustomize from "@/Admin/Components/SectionCustomize/GoogleMapSectionCustomize"
import CaseStudySectionCustomize from "@/Admin/Components/SectionCustomize/CaseStudySectionCustomize"
import AboutSectionCustomize from "@/Admin/Components/SectionCustomize/AboutSectionCustomize"
import AddSection from "@/Admin/Components/SectionCustomize/AddSection"
import { produce } from "immer"
import { Head, Link, router, usePage } from "@inertiajs/react"
import WhyCooseUsSectionCustomize from "@/Admin/Components/SectionCustomize/WhyCooseUsSectionCustomize"
import FaqSectionCustomize from "@/Admin/Components/SectionCustomize/FaqSectionCustomize"
import cloneDeep from "lodash/cloneDeep"
import { clearState, updateCurrentEditedSection, updateCurrentLang, updatePageData, updatePageInfo } from "@/Redux/features/pages/Page/page"
import PageDetailsCustomize from "@/Admin/Components/SectionCustomize/PageDetailsCustomize"
import TestimonialSectionCustomize from "@/Admin/Components/SectionCustomize/TestimonialSectionCustomize"
import PhotoGallerySectionCustomize from "@/Admin/Components/SectionCustomize/PhotoGallerySectionCustomize"
import WorkingProcessSectionCustomize from "@/Admin/Components/SectionCustomize/WorkingProcessSectionCustomize"
import BannerSectionCustomize from "@/Admin/Components/SectionCustomize/BannerSectionCustomize"
import CoreValueSectionCustomize from "@/Admin/Components/SectionCustomize/CoreValueSectionCustomize"
import ContactWithFormBuilderSectionCustomize from "@/Admin/Components/SectionCustomize/ContactWithFormBuilderSectionCustomize"
import Swal from "sweetalert2"
import { useMemo } from "react"
import CustomHTMLSectionCustomize from "@/Admin/Components/SectionCustomize/CustomHTMLSectionCustomize"
import JobListingsSectionCustomize from "@/Admin/Components/SectionCustomize/JobListingsSectionCustomize"
import TextEditorSectionCustomize from "@/Admin/Components/SectionCustomize/TextEditorSectionCustomize"
import EventScheduleSectionCustomize from "@/Admin/Components/SectionCustomize/EventScheduleSectionCustomize"
import HorizontalScrollSectionCustomize from "@/Admin/Components/SectionCustomize/HorizontalScrollSectionCustomize"
import TeamDetailsSectionCustomize from "@/Admin/Components/SectionCustomize/TeamDetailsSectionCustomize"
import PortfolioDetailsSectionCustomize from "@/Admin/Components/SectionCustomize/PortfolioDetailsSectionCustomize"
import CaseStudyDetailsSectionCustomize from "@/Admin/Components/SectionCustomize/CaseStudyDetailsSectionCustomize"
import { Icon } from "@iconify/react"
import CategorySectionCustomize from "@/Admin/Components/SectionCustomize/CategorySectionCustomize"
import PopularProductSectionCustomize from "@/Admin/Components/SectionCustomize/PopularProductSectionCustomize"
import TrendingProductSectionCustomize from "@/Admin/Components/SectionCustomize/TrendingProductSectionCustomize"

export default function Create() {
    const { pageData, pageInfo, clickedSection, currentLang } = useSelector((state) => state.pages)

    const dispatch = useDispatch()
    const { lang, default_lang } = usePage().props
    const dragItem = useRef(null)
    const dragOverItem = useRef(null)
    const [customizeSections, setCustomizeSections] = useState([])
    const [isAddSection, setIsAddSection] = useState(false)
    const [isShowSwitchLanguage, setIsShowSwitchLanguage] = useState(false)
    const [isExpandInfo, setIsExpandInfo] = useState(false)
    const [expandCustomize, setExpandCustomize] = useState("PageDetails")
    const [sectionIndex, setSectionIndex] = useState("")
    const [isOpen, setIsOpen] = useState(true)
    const langSwitchRef = useRef(null)
    const [selectedLang, setSelectedLang] = useState({})

    const langArray = useMemo(() => Object.keys(lang.languages), [lang.languages])
    const initialPageInfoObject = {
        title: "",
        header_layout: "1",
        footer_layout: "1",
        is_show_breadcrumb: false,
        breadcrumb_title: "",
        header_action_button_text: "",
        header_action_button_url: "",
        breadcrumb_image: "",
        meta_title: "",
        meta_description: "",
        meta_tags: "",
        meta_image: ""
    }

    const pageInfoObj = langArray.reduce((acc, lang) => {
        acc[lang] = { ...initialPageInfoObject }
        return acc
    }, {})

    const handleExpand = (name, index) => {
        setExpandCustomize(name)
        setSectionIndex(index)
        setIsOpen(true)
    }

    const handleSwitchLangPopup = () => {
        setIsShowSwitchLanguage(!isShowSwitchLanguage)
    }

    const handleRemoveSection = () => {
        if (window.confirm("Are you sure you want to remove this section?")) {
            const removedSection = customizeSections[sectionIndex]

            setCustomizeSections(
                produce((draft) => {
                    draft.splice(sectionIndex, 1)
                })
            )
            // Update pageData by removing the section with the same sectionId
            const newPageData = produce(pageData, (draft) => {
                langArray.forEach((lang) => {
                    draft[lang] = draft[lang].filter((section) => section.sectionId !== removedSection.sectionId)
                })
            })

            dispatch(updatePageData(newPageData))
            setIsOpen(false)
        }
    }

    const changePageEditorBodyClass = () => {
        const iframeDocument = document.querySelector("iframe").contentDocument
        const defaultLangObj = lang.languages[currentLang]
        if (defaultLangObj?.is_ltr === "no") {
            iframeDocument?.body?.classList?.add("rtl")
        } else {
            iframeDocument?.body?.classList?.remove("rtl")
        }
    }
    const handleSort = () => {
        // Create a copy of the sections to reorder
        const copiedCustomizeSections = [...customizeSections]

        // Move the dragged item to the new position
        const draggedItemContent = copiedCustomizeSections.splice(dragItem.current, 1)[0]
        copiedCustomizeSections.splice(dragOverItem.current, 0, draggedItemContent)

        // Update the state with the new order
        setCustomizeSections(copiedCustomizeSections)

        // Create a new pageData based on the new order
        const newPageData = produce(pageData, (draft) => {
            langArray.forEach((lang) => {
                // Maintain the current sections and update their order
                const currentSections = draft[lang] || []
                const updatedSections = copiedCustomizeSections.map((section) => {
                    const existingSection = currentSections.find((existing) => existing.sectionId === section.sectionId)
                    return existingSection ? { ...existingSection } : { ...section }
                })

                // Ensure that we do not lose sections that were previously there
                draft[lang] = updatedSections
            })
        })

        // Dispatch the updated pageData
        dispatch(updatePageData(newPageData))
    }

    const handleChangeLang = (lang) => {
        if (default_lang !== lang.code) {
            Swal.fire({
                title: "Are you sure?",
                text: "You want to copy page data from primary language?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes!"
            }).then((result) => {
                if (result.isConfirmed) {
                    setSelectedLang(lang)
                    let defaultLangPageData = pageData[default_lang]
                    let copiedPageData = cloneDeep(pageData)
                    copiedPageData[lang.code] = defaultLangPageData
                    dispatch(updatePageData(copiedPageData))
                    // set page info
                    let defaultLangPageInfo = pageInfo[default_lang]
                    let copiedPageInfo = cloneDeep(pageInfo)
                    copiedPageInfo[lang.code] = defaultLangPageInfo
                    dispatch(updatePageInfo(copiedPageInfo))
                } else if (result.isDismissed) {
                    setSelectedLang(lang)
                }
            })
        } else {
            setSelectedLang(lang)
        }
    }

    const handlePublish = () => {
        const errors = validateLanguageTitles(pageInfo)
        if (!errors) {
            router.post(route("admin.pages.store"), {
                pageData,
                pageInfo,
                customizeSections
            })
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: errors
            })
        }

        function validateLanguageTitles(data) {
            for (const langCode in data) {
                const langData = data[langCode]
                const languageName = lang.languages[langCode].name || langCode
                if (langData.title === "") {
                    return `The ${languageName} title is required.`
                } else if (langData.title?.length > 255) {
                    return `The ${languageName} title must not exceed 255 characters.`
                } else if (langData.meta_title?.length > 255) {
                    return `The ${languageName} meta title must not exceed 255 characters.`
                } else if (langData.meta_description?.length > 255) {
                    return `The ${languageName} meta description must not exceed 255 characters.`
                } else if (langData.meta_tags?.length > 255) {
                    return `The ${languageName} meta tags must not exceed 255 characters.`
                } else if (langData.header_action_button_text?.length > 255) {
                    return `The ${languageName} header action button text must not exceed 255 characters.`
                } else if (langData.header_action_button_url?.length > 255) {
                    return `The ${languageName} header action button url must not exceed 255 characters.`
                }
            }
            return false
        }
    }

    // conditional customize section render
    let customizeSection = ""
    switch (expandCustomize) {
        case "PageDetails":
            customizeSection = <PageDetailsCustomize />
            break
        case "Hero":
            customizeSection = <HeroSectionCustomize index={sectionIndex.toString()} />
            break
        case "FunFact":
            customizeSection = <FunFactSectionCustomize index={sectionIndex.toString()} />
            break
        case "Service":
            customizeSection = <ServiceSectionCustomize index={sectionIndex.toString()} />
            break
        case "Portfolio":
            customizeSection = <PortfolioSectionCustomize index={sectionIndex.toString()} />
            break
        case "AditionalFeature":
            customizeSection = <AditionalFeatureSectionCustomize index={sectionIndex.toString()} />
            break
        case "Video":
            customizeSection = <VideoSectionCustomize index={sectionIndex.toString()} />
            break
        case "Team":
            customizeSection = <TeamSectionCustomize index={sectionIndex.toString()} />
            break
        case "Blog":
            customizeSection = <BlogSectionCustomize index={sectionIndex.toString()} />
            break
        case "Marquee":
            customizeSection = <MarqueeSectionCustomize index={sectionIndex.toString()} />
            break
        case "Partner":
            customizeSection = <PartnerSectionCustomize index={sectionIndex.toString()} />
            break
        case "CTA":
            customizeSection = <CTASectionCustomize index={sectionIndex.toString()} />
            break
        case "Pricing":
            customizeSection = <PricingSectionCustomize index={sectionIndex.toString()} />
            break
        case "GoogleMap":
            customizeSection = <GoogleMapSectionCustomize index={sectionIndex.toString()} />
            break
        case "CaseStudy":
            customizeSection = <CaseStudySectionCustomize index={sectionIndex.toString()} />
            break
        case "About":
            customizeSection = <AboutSectionCustomize index={sectionIndex.toString()} />
            break
        case "WhyChooseUs":
            customizeSection = <WhyCooseUsSectionCustomize index={sectionIndex.toString()} />
            break
        case "Faq":
            customizeSection = <FaqSectionCustomize index={sectionIndex.toString()} />
            break
        case "Testimonial":
            customizeSection = <TestimonialSectionCustomize index={sectionIndex.toString()} />
            break
        case "PhotoGallery":
            customizeSection = <PhotoGallerySectionCustomize index={sectionIndex.toString()} />
            break
        case "WorkingProcess":
            customizeSection = <WorkingProcessSectionCustomize index={sectionIndex.toString()} />
            break
        case "Banner":
            customizeSection = <BannerSectionCustomize index={sectionIndex.toString()} />
            break
        case "CoreValue":
            customizeSection = <CoreValueSectionCustomize index={sectionIndex.toString()} />
            break
        case "ContactWithFormBuilder":
            customizeSection = <ContactWithFormBuilderSectionCustomize index={sectionIndex.toString()} />
            break
        case "CustomHTML":
            customizeSection = <CustomHTMLSectionCustomize index={sectionIndex.toString()} />
            break
        case "JobListings":
            customizeSection = <JobListingsSectionCustomize index={sectionIndex.toString()} />
            break
        case "TeamDetails":
            customizeSection = <TeamDetailsSectionCustomize index={sectionIndex.toString()} />
            break
        case "HorizontalScroll":
            customizeSection = <HorizontalScrollSectionCustomize index={sectionIndex.toString()} />
            break
        case "EventSchedule":
            customizeSection = <EventScheduleSectionCustomize index={sectionIndex.toString()} />
            break
        case "PortfolioDetails":
            customizeSection = <PortfolioDetailsSectionCustomize index={sectionIndex.toString()} />
            break
        case "CaseStudyDetails":
            customizeSection = <CaseStudyDetailsSectionCustomize index={sectionIndex.toString()} />
            break
        case "TextEditor":
            customizeSection = <TextEditorSectionCustomize index={sectionIndex.toString()} />
            break
        case "CategorySection":
            customizeSection = <CategorySectionCustomize index={sectionIndex.toString()} />
            break
        case "PopularProduct":
            customizeSection = <PopularProductSectionCustomize index={sectionIndex.toString()} />
            break
        case "TrendingProduct":
            customizeSection = <TrendingProductSectionCustomize index={sectionIndex.toString()} />
            break
    }

    // handle remove section

    useEffect(() => {
        const result = produce(pageData, (draft) => {
            langArray.forEach((lang) => {
                if (!draft.hasOwnProperty(lang)) {
                    draft[lang] = customizeSections.map((obj) => ({ ...obj }))
                } else {
                    customizeSections.forEach((obj, cIndex) => {
                        if (!draft[lang].some((_, pIndex) => pIndex === cIndex)) {
                            draft[lang].push({ ...obj })
                        }
                    })
                }
            })
        })

        if (JSON.stringify(result) !== JSON.stringify(pageData)) {
            dispatch(updatePageData(result))
        }
    }, [customizeSections, langArray, pageData, dispatch])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (langSwitchRef.current && !langSwitchRef.current.contains(event.target)) {
                setIsShowSwitchLanguage(false)
            }
        }

        if (isShowSwitchLanguage) {
            document.addEventListener("mousedown", handleClickOutside)
        } else {
            document.removeEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isShowSwitchLanguage])

    useEffect(() => {
        const [code, findedLang] = Object.entries(lang.languages).find(([code, lang]) => code === default_lang)
        setSelectedLang(findedLang)
    }, [default_lang])

    useEffect(() => {
        dispatch(updateCurrentLang(selectedLang.code))
    }, [selectedLang])

    useEffect(() => {
        return () => {
            dispatch(clearState())
        }
    }, [])

    useEffect(() => {
        dispatch(updatePageInfo(pageInfoObj))
    }, [])

    useEffect(() => {
        if (clickedSection) {
            const inDex = customizeSections.findIndex((item) => item.sectionId === clickedSection)
            const cs = customizeSections.find((item) => item.sectionId === clickedSection)
            handleExpand(cs?.type, inDex)
        }
    }, [clickedSection])

    useEffect(() => {
        changePageEditorBodyClass()
    }, [pageInfo, currentLang])

    return (
        <PageCustomizeLayout type="page">
            <Head title="Create page" />
            <div className="customize-header-actions">
                <Link href={route("admin.pages.index")} className="dismiss">
                    <IonIcon icon={closeOutline} />
                </Link>
                <div className="language-switch" ref={langSwitchRef}>
                    <div className="language-switch-wrap" onClick={handleSwitchLangPopup}>
                        <IonIcon style={{ fontSize: "20px" }} icon={globeOutline} />
                        <span>{selectedLang.name}</span>
                    </div>
                    {isShowSwitchLanguage && (
                        <div className="select-lang">
                            <ul>
                                {Object.entries(lang.languages).map(([code, lang], index) => (
                                    <li
                                        key={index}
                                        value={code}
                                        onClick={() => {
                                            handleChangeLang(lang)
                                            handleSwitchLangPopup()
                                        }}
                                    >
                                        {lang.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <div className="publish">
                    <button className="btn btn-sm btn-success" onClick={handlePublish}>
                        Publish
                    </button>
                </div>
            </div>
            <div className="customize-section-wrap">
                <div className={`add-sections ${isAddSection ? "active" : ""}`}>
                    <AddSection
                        setIsAddSection={setIsAddSection}
                        addSection={(section) =>
                            setCustomizeSections(
                                produce((draft) => {
                                    draft.push({
                                        ...section,
                                        sectionId: `${section?.type?.toLowerCase()}-${Date.now()}`
                                    })
                                })
                            )
                        }
                    />
                </div>
                <div className="customize-section-area">
                    <div className="page-customize-notice">
                        <div className="page-customize-notice-title">
                            <span>
                                You are customizing <br /> <strong>Page</strong>
                            </span>
                            <IonIcon onClick={() => setIsExpandInfo(!isExpandInfo)} icon={helpCircle} />
                        </div>
                        <div className={`page-customize-notice-content ${isExpandInfo ? "show" : ""}`}>
                            <p>
                                The Customizer allows you to preview changes to your site before publishing them. You can navigate to different pages
                                on your site within the preview. Edit shortcuts are shown for some editable elements. The Customizer is intended for
                                use with non-block themes.
                            </p>
                        </div>
                    </div>
                    <div className="customize-sections">
                        <div className="customize-sections-item" onClick={() => handleExpand("PageDetails")}>
                            <div className="customize-sections-item-title">
                                <h3>Page Details</h3>
                            </div>
                            <div className="customize-sections-item-icon">
                                <IonIcon icon={chevronForward} />
                            </div>
                        </div>
                        {customizeSections.map((item, index) => (
                            <div
                                key={index}
                                className="customize-sections-item"
                                onClick={() => {
                                    dispatch(updateCurrentEditedSection(item.sectionId))
                                    handleExpand(item?.type, index)
                                }}
                                draggable
                                onDragStart={() => (dragItem.current = index)}
                                onDragEnter={() => (dragOverItem.current = index)}
                                onDragEnd={handleSort}
                                onDragOver={(e) => e.preventDefault()}
                            >
                                <div className="customize-sections-item-title">
                                    <h3>{item.title}</h3>
                                </div>
                                <div className="customize-sections-item-icon">
                                    <IonIcon icon={chevronForward} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="customizer-footer">
                        <button onClick={() => setIsAddSection(true)} className="btn btn-sm btn-success">
                            Add Section
                        </button>
                    </div>
                </div>
                <div className={`customize-options ${isOpen ? "active" : ""}`}>
                    <div className="customize-section-description-container">
                        <div className="customize-section-title">
                            <button onClick={() => setIsOpen(false)}>
                                <Icon icon="lucide:chevron-left" width="24" height="24" />
                            </button>
                            <span>
                                Customizing <br /> <strong>{expandCustomize}</strong>
                            </span>
                            {expandCustomize !== "PageDetails" && (
                                <span className="remove-section" onClick={handleRemoveSection}>
                                    <IonIcon icon={trashOutline} />
                                </span>
                            )}
                        </div>
                        <div className="customize-field">{isOpen && <>{customizeSection}</>}</div>
                    </div>
                </div>
            </div>
            {/*<MediaPopup type="images" multiple={false} isShow={true} actionButtonText="Insert Image" />*/}
        </PageCustomizeLayout>
    )
}
