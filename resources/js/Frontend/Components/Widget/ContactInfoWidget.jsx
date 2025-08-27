import React from "react"
import { Icon } from "@iconify/react"
import { useSelector } from "react-redux"

export default function ContactInfoWidget() {
    const contact = useSelector((state) => state.customize.contact)
    return (
        <>
            {contact.contact_address && (
                <p
                    dangerouslySetInnerHTML={{
                        __html: contact.contact_address
                    }}
                />
            )}
            {contact.contact_phone_number && (
                <h3>
                    <a href={`tel:${contact.contact_phone_number}`}>{contact.contact_phone_number}</a>
                </h3>
            )}
            {contact.contact_email && (
                <p>
                    <a href={`mailto:${contact.contact_email}`}>{contact.contact_email}</a>
                </p>
            )}
        </>
    )
}
