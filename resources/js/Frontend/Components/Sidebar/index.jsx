import React from "react"
import RecentPost from "../Widget/RecentPost"
import SearchWidget from "../Widget/SearchWidget"
import SideMenuWidget from "../Widget/SideMenuWidget"
import TagWidget from "../Widget/TagWidget"
import translate from "@/utils/translate"

export default function Sidebar({ customizedCategories, customizedTags, recent_post }) {
    return (
        <div className="cs_sidebar cs_right_sidebar">
            <SearchWidget />
            <SideMenuWidget title={translate("Categories")} data={customizedCategories} />
            <RecentPost title={translate("Recent Posts")} data={recent_post} />
            <TagWidget title={translate("Tag Cloud")} data={customizedTags} />
        </div>
    )
}
