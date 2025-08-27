import React, { useEffect, useState } from "react"
import Editor from "react-simple-code-editor"
import { highlight, languages } from "prismjs"
import "prismjs/components/prism-clike"
import "prismjs/components/prism-javascript"
import "prismjs/themes/prism.css"

import { useDispatch, useSelector } from "react-redux"
import { updateCustomCss } from "@/Redux/features/pages/Customize/customize"

export default function CustomCSSCustomizer() {
    const css = useSelector((state) => state.customize.custom_css)
    const dispatch = useDispatch()
    const [data, setData] = useState(css)
    useEffect(() => {
        dispatch(updateCustomCss(data))
    }, [data])
    return (
        <>
            <div className="form-group">
                <label>Custom CSS</label>
                <Editor
                    value={data ?? ""}
                    onValueChange={(code) => setData(code)}
                    highlight={(code) => highlight(code, languages.css)}
                    padding={15}
                    style={{
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: 12,
                        backgroundColor: "#ffffff",
                        border: "1px solid #ccc",
                        borderRadius: "4px"
                    }}
                />
            </div>
            {/*<textarea value={data} onChange={(e) => setData(e.target.value)} rows={10} style={{ height: "400px" }}></textarea>*/}
        </>
    )
}
