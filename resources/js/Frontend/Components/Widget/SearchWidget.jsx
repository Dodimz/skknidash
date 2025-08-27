import { Icon } from "@iconify/react"
import React, { useState } from "react"
import { router, usePage } from "@inertiajs/react"
import translate from "@/utils/translate"

export default function SearchWidget() {
    const { props } = usePage()
    const [searchQuery, setSearchQuery] = useState(props.search ?? "")
    // handle search
    const handleSearch = (e) => {
        e.preventDefault()
        router.get(route("pages.show", {slug: props?.slug, search: searchQuery }))
    }
    return (
        <div className="cs_sidebar_item widget_search">
            <form className="cs_sidebar_search" onSubmit={handleSearch}>
                <input type="text" placeholder={`${translate("Search")}...`} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <button type="submit" className="cs_sidebar_search_btn">
                    <Icon icon="material-symbols:search-rounded" width={24} height={24} />
                </button>
            </form>
        </div>
    )
}
