// initial state
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentEditedSection: null,
    isEditorMode: false,
    clickedSection: null,
    currentLang: null,
    pageInfo: {},
    pageData: {}
}

const pageSlice = createSlice({
    name: "pages",
    initialState,
    reducers: {
        updateCurrentEditedSection(state, action) {
            state.currentEditedSection = action.payload
        },
        updateSetIsEditorMode(state, action) {
            state.isEditorMode = action.payload
        },
        updateClickedSection(state, action) {
            state.clickedSection = action.payload
        },
        updateCurrentLang(state, action) {
            state.currentLang = action.payload
        },
        updatePageInfo(state, action) {
            state.pageInfo = action.payload
        },
        updatePageData(state, action) {
            state.pageData = action.payload
        },
        updatePageSection(state, action) {
            const { data: newData, index } = action.payload
            const currentLang = state.currentLang

            if (state.pageData[currentLang]) {
                state.pageData[currentLang][index].data = newData
            }
        },
        updatePageAdvancedSettings(state, action) {
            const { data: newData, index } = action.payload
            const currentLang = state.currentLang

            if (state.pageData[currentLang]) {
                state.pageData[currentLang][index].advanced = newData
            }
        },
        updateCaseStudySection(state, action) {
            const { data: newData, index } = action.payload
            const currentLang = state.currentLang

            if (state.pageData[currentLang]) {
                state.pageData[currentLang][index].data = newData
            }
        },
        updateCaseStudySectionsData(state, action) {
            const { data: newData, index } = action.payload
            const currentLang = state.currentLang

            if (state.pageData[currentLang]) {
                state.pageData[currentLang][index].data = newData
            }
        },
        updateCaseStudyDetails(state, action) {
            const { data: newData, index } = action.payload
            const currentLang = state.currentLang

            if (state.pageData[currentLang]) {
                state.pageData[currentLang][index].data = newData
            }
        },
        updatePageTitle(state, action) {
            const newData = action.payload
            const currentLang = state.currentLang

            if (state.pageInfo[currentLang]) {
                state.pageInfo[currentLang].title = newData
            }
        },
        updatePageHeaderLayout(state, action) {
            const newData = action.payload
            const currentLang = state.currentLang

            if (state.pageInfo[currentLang]) {
                state.pageInfo[currentLang].header_layout = newData
            }
        },
        updatePageHeaderShowShoppingCart(state, action) {
            const newData = action.payload
            const currentLang = state.currentLang

            if (state.pageInfo[currentLang]) {
                state.pageInfo[currentLang].is_show_shopping_cart = newData
            }
        },
        updatePageFooterLayout(state, action) {
            const newData = action.payload
            const currentLang = state.currentLang

            if (state.pageInfo[currentLang]) {
                state.pageInfo[currentLang].footer_layout = newData
            }
        },
        updatePageSubTitle(state, action) {
            const newData = action.payload
            const currentLang = state.currentLang

            if (state.pageInfo[currentLang]) {
                state.pageInfo[currentLang].sub_title = newData
            }
        },
        updatePageDetails(state, action) {
            const newData = action.payload
            const currentLang = state.currentLang

            if (state.pageInfo[currentLang]) {
                state.pageInfo[currentLang].details = newData
            }
        },
        updatePageThumbnailImage(state, action) {
            const newData = action.payload
            const currentLang = state.currentLang

            if (state.pageInfo[currentLang]) {
                state.pageInfo[currentLang].thumbnail_image = newData
            }
        },
        updatePageInfoThumbnailImage(state, action) {
            const newData = action.payload
            const currentLang = state.currentLang

            if (state.pageInfo[currentLang]) {
                state.pageInfo[currentLang].info_thumbnail_image = newData
            }
        },
        updatePagePageTitle(state, action) {
            const newData = action.payload
            const currentLang = state.currentLang

            if (state.pageInfo[currentLang]) {
                state.pageInfo[currentLang].page_title = newData
            }
        },
        updatePagePageSubTitle(state, action) {
            const newData = action.payload
            const currentLang = state.currentLang

            if (state.pageInfo[currentLang]) {
                state.pageInfo[currentLang].page_sub_title = newData
            }
        },
        updatePageProjectInfoText(state, action) {
            const newData = action.payload
            const currentLang = state.currentLang

            if (state.pageInfo[currentLang]) {
                state.pageInfo[currentLang].project_info_text = newData
            }
        },
        updatePageProjectInfo(state, action) {
            const newData = action.payload
            const currentLang = state.currentLang

            if (state.pageInfo[currentLang]) {
                state.pageInfo[currentLang].projectInfo = newData
            }
        },

        updatePageIconBoxTitle(state, action) {
            const newData = action.payload
            const currentLang = state.currentLang

            if (state.pageInfo[currentLang]) {
                state.pageInfo[currentLang].icon_box_title = newData
            }
        },
        updatePageIconBoxSubTitle(state, action) {
            const newData = action.payload
            const currentLang = state.currentLang

            if (state.pageInfo[currentLang]) {
                state.pageInfo[currentLang].icon_box_sub_title = newData
            }
        },
        updatePageIconBox(state, action) {
            const newData = action.payload
            const currentLang = state.currentLang

            if (state.pageInfo[currentLang]) {
                state.pageInfo[currentLang].icon_box = newData
            }
        },
        updatePageInfoTitle(state, action) {
            const newData = action.payload
            const currentLang = state.currentLang

            if (state.pageInfo[currentLang]) {
                state.pageInfo[currentLang].info_title = newData
            }
        },
        updatePageInfoList(state, action) {
            const newData = action.payload
            const currentLang = state.currentLang

            if (state.pageInfo[currentLang]) {
                state.pageInfo[currentLang].info_list = newData
            }
        },
        updatePagePageCategory(state, action) {
            const newData = action.payload
            const currentLang = state.currentLang

            if (state.pageInfo[currentLang]) {
                state.pageInfo[currentLang].category = newData
            }
        },
        updatePageBreadcrumb(state, action) {
            const newData = action.payload
            const currentLang = state.currentLang

            if (state.pageInfo[currentLang]) {
                state.pageInfo[currentLang].is_show_breadcrumb = newData
            }
        },
        updatePageBreadcrumbImage(state, action) {
            const newData = action.payload
            const currentLang = state.currentLang

            if (state.pageInfo[currentLang]) {
                state.pageInfo[currentLang].breadcrumb_image = newData
            }
        },
        updatePageBreadcrumbTitle(state, action) {
            const newData = action.payload
            const currentLang = state.currentLang

            if (state.pageInfo[currentLang]) {
                state.pageInfo[currentLang].breadcrumb_title = newData
            }
        },
        updatePageHeaderActionButtonText(state, action) {
            const newData = action.payload
            const currentLang = state.currentLang

            if (state.pageInfo[currentLang]) {
                state.pageInfo[currentLang].header_action_button_text = newData
            }
        },
        updatePageHeaderActionButtonURL(state, action) {
            const newData = action.payload
            const currentLang = state.currentLang

            if (state.pageInfo[currentLang]) {
                state.pageInfo[currentLang].header_action_button_url = newData
            }
        },
        updatePageDescription(state, action) {
            const newData = action.payload
            const currentLang = state.currentLang

            if (state.pageInfo[currentLang]) {
                state.pageInfo[currentLang].description = newData
            }
        },
        updatePageMetaTitle(state, action) {
            const newData = action.payload
            const currentLang = state.currentLang

            if (state.pageInfo[currentLang]) {
                state.pageInfo[currentLang].meta_title = newData
            }
        },
        updatePageMetaDescription(state, action) {
            const newData = action.payload
            const currentLang = state.currentLang

            if (state.pageInfo[currentLang]) {
                state.pageInfo[currentLang].meta_description = newData
            }
        },
        updatePageMetaTags(state, action) {
            const newData = action.payload
            const currentLang = state.currentLang

            if (state.pageInfo[currentLang]) {
                state.pageInfo[currentLang].meta_tags = newData
            }
        },
        updatePageMetaImage(state, action) {
            const newData = action.payload
            const currentLang = state.currentLang

            if (state.pageInfo[currentLang]) {
                state.pageInfo[currentLang].meta_image = newData
            }
        },
        updatePageHeroSection(state, action) {
            const { data: newData, index } = action.payload
            const currentLang = state.currentLang

            if (state.pageData[currentLang]) {
                state.pageData[currentLang][index].data = newData
            }
        },
        updatePageServiceAdvancedSettings(state, action) {
            const { data: newData, index } = action.payload
            const currentLang = state.currentLang

            if (state.pageData[currentLang]) {
                state.pageData[currentLang][index].advanced = newData
            }
        },
        clearState(state) {
            state.pageData = {}
            state.pageInfo = {}
        }
    }
})

export default pageSlice.reducer
export const {
    updatePageAdvancedSettings,
    updateCurrentEditedSection,
    updateSetIsEditorMode,
    updateClickedSection,
    updateCurrentLang,
    updatePageDetails,
    updatePageThumbnailImage,
    updatePageInfoThumbnailImage,
    updatePagePageCategory,
    updatePagePageSubTitle,
    updatePagePageTitle,
    updatePageData,
    updatePageInfo,
    updateCaseStudySection,
    updateCaseStudySectionsData,
    updateCaseStudyDetails,
    updatePageHeroSection,
    updatePageServiceAdvancedSettings,
    updatePageCoreValueAdvancedSettings,
    updatePageDescription,
    updatePageSection,
    updatePageTitle,
    updatePageHeaderLayout,
    updatePageHeaderShowShoppingCart,
    updatePageFooterLayout,
    updatePageSubTitle,
    updatePageMetaTags,
    updatePageMetaDescription,
    updatePageMetaImage,
    updatePageMetaTitle,
    updatePageSectionsData,
    updatePageBreadcrumb,
    updatePageBreadcrumbImage,
    updatePageBreadcrumbTitle,
    updatePageHeaderActionButtonText,
    updatePageHeaderActionButtonURL,
    updatePageProjectInfoText,
    updatePageProjectInfo,
    updatePageIconBoxTitle,
    updatePageIconBoxSubTitle,
    updatePageIconBox,
    updatePageInfoTitle,
    updatePageInfoList,
    clearState
} = pageSlice.actions
