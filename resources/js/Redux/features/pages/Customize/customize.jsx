import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    general: {
        site_name: "",
        site_logo_dark: "",
        site_logo_light: "",
        site_favicon: "",
        accent_color: "#fe5b2c",
        primary_color: "#18333b",
        secondary_color: "#67797e",
        is_page_breadcrumbs: true,
        enable_rtl: false,
    },
    sidebar: {
        is_show_logo: true,
        is_show_contact_info: true,
        contact_title: "",
        contact_subtitle: "",
        is_show_subscribe: true,
        is_show_social_media: true,

    },
    footer: {
        footer_is_show_social_media: true,
        footer_is_show_newslatter: true,
        footer_is_show_contact_logo_section: true,
        footer_is_show_useful_links_section: true,
        footer_is_show_service_section: true,
        footer_is_show_resources_section: true,
        copyright_text: "",
    },
    social_links: {
        social_list: [],
    },
    subscriber: {
        subscribe_title: "",
        subscribe_description: "",
    },
    contact: {
        contact_phone_number: "",
        contact_email: "",
        contact_address: "",
    },
    custom_css: "",
    html_embed_code: ""
}

const customizeSlice = createSlice({
    name: "customize",
    initialState,
    reducers: {
        updateGeneral(state, action) {
            state.general = action.payload
        },
        updateSidebar(state, action) {
            state.sidebar = action.payload
        },
        updateFooter(state, action) {
            state.footer = action.payload
        },
        updateContact(state, action) {
            state.contact = action.payload
        },
        updateSubscribe(state, action) {
            state.subscriber = action.payload
        },
        updateSocialLink(state, action) {
            state.social_links = action.payload
        },
        updateCustomCss(state, action) {
            state.custom_css = action.payload
        },
        updateHtmlEmbedCode(state, action) {
            state.html_embed_code = action.payload;
        }
    }
})

export default customizeSlice.reducer;
export const { updateFooter, updateGeneral, updateSidebar, updateContact, updateSubscribe, updateSocialLink, updateCustomCss, updateHtmlEmbedCode } = customizeSlice.actions
