import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateContact } from "@/Redux/features/pages/Customize/customize"

export default function CustomizeContact() {
    const contact = useSelector((state) => state.customize.contact)
    const dispatch = useDispatch()
    const [data, setData] = useState(contact)

    useEffect(() => {
        dispatch(updateContact(data))
    }, [data])

    return (
        <>
            <div className="form-group">
                <label>Contact Phone Number</label>
                <input
                    type="text"
                    value={data.contact_phone_number}
                    onChange={(e) => setData({ ...data, contact_phone_number: e.target.value })}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label>Contact Email</label>
                <input
                    type="text"
                    value={data.contact_email}
                    onChange={(e) => setData({ ...data, contact_email: e.target.value })}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label>Contact Address</label>
                <input
                    type="text"
                    value={data.contact_address}
                    onChange={(e) => setData({ ...data, contact_address: e.target.value })}
                    className="form-control"
                />
            </div>
        </>
    )
}
