import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateHtmlEmbedCode } from "@/Redux/features/pages/Customize/customize"

export default function HtmlEmbedCustomize() {
    const html_embed_code = useSelector((state) => state.customize.html_embed_code)
    const dispatch = useDispatch()
    const [data, setData] = useState(html_embed_code)
    useEffect(() => {
        dispatch(updateHtmlEmbedCode(data))
    }, [data])

    return (
        <div className="form-group">
            <label>Code</label>
            <textarea cols="30" rows="10" className="form-control" value={data} onChange={(e) => setData(e.target.value)}></textarea>
        </div>
    )
}
