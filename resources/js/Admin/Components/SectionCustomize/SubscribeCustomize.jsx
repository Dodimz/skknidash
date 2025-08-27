import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateSubscribe } from "@/Redux/features/pages/Customize/customize"

export default function SubscribeCustomize() {
    const subscriber = useSelector((state) => state.customize.subscriber)
    const dispatch = useDispatch()
    const [data, setData] = useState(subscriber)

    useEffect(() => {
        dispatch(updateSubscribe(data))
    }, [data])

    return (
        <>
            <div className="form-group">
                <label>Subscribe Title</label>
                <input
                    type="text"
                    value={data.subscribe_title}
                    onChange={(e) => setData({ ...data, subscribe_title: e.target.value })}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label>Subscribe Description</label>
                <textarea
                    value={data.subscribe_description}
                    onChange={(e) => setData({ ...data, subscribe_description: e.target.value })}
                    className="form-control"
                ></textarea>
            </div>
        </>
    )
}
