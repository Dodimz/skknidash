import React, { useState, useRef, useEffect } from "react"

function AccordionItem({ title, content, isOpen, onClick }) {
    const accordionContentRef = useRef(null)
    const [contentHeight, setContentHeight] = useState(0)

    useEffect(() => {
        if (accordionContentRef.current) {
            // Measure the content's height and set it dynamically
            setContentHeight(accordionContentRef.current.offsetHeight)
        }
    }, [isOpen])

    const accordionClass = isOpen ? "cs_accordian active" : "cs_accordian"

    return (
        <>
            <div className={accordionClass}>
                <div className="cs_accordian_head" onClick={onClick}>
                    <h2 className="cs_accordian_title cs_fs_24 cs_normal">{title}</h2>
                    <span className="cs_accordian_toggle cs_accent_color" />
                </div>
                <div className="cs_accordian_body_wrap" style={{ height: isOpen ? `${contentHeight}px` : "0" }}>
                    <div className="cs_accordian_body" ref={accordionContentRef}>
                        <p>{content}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default function Accordion({ accordionData, variant }) {
    const [openItemIndex, setOpenItemIndex] = useState(-1) // Initialize with -1 for no item open initially
    const [firstItemOpen, setFirstItemOpen] = useState(true) // Set the first item to open initially

    const handleItemClick = (index) => {
        if (index === openItemIndex) {
            setOpenItemIndex(-1)
        } else {
            setOpenItemIndex(index)
        }
    }
    useEffect(() => {
        // Open the first item when the component mounts
        if (firstItemOpen) {
            setOpenItemIndex(0)
            setFirstItemOpen(false)
        }
    }, [firstItemOpen])

    return (
        <>
            <div className={variant}>
                {accordionData?.map((item, index) => (
                    <AccordionItem
                        key={index}
                        title={item.faq_question}
                        content={item.faq_answer}
                        isOpen={index === openItemIndex}
                        onClick={() => handleItemClick(index)}
                    />
                ))}
            </div>
        </>
    )
}
