import FromValidationError from "@/Admin/Components/Validation/FromValidationError"
import { useForm, Head } from "@inertiajs/react"
import { produce } from "immer"
import AdminLayouts from "@/Admin/Layouts/AdminLayouts"
import translate from "@/utils/translate"
import SingleMediaUploader from "@/Admin/Components/Media/SingleMediaUploader"

export default function PageSetting({ pages, page_info }) {
    const contents = pages.map((page) => page.content)
    const { data, setData, errors, put } = useForm(page_info)

    // update payment gateway configure
    const handlePublish = (e) => {
        e.preventDefault()
        put(route("admin.settings.page.setting.update"))
    }

    return (
        <AdminLayouts>
            <Head title="Page Settings" />
            <div className="yoo-height-b30 yoo-height-lg-b30" />
            <div className="container">
                <div className="yoo-uikits-heading">
                    <h2 className="yoo-uikits-title">{translate("Page Settings")}</h2>
                </div>
                <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                <form className="row" onSubmit={handlePublish}>
                    <div className="col-lg-8">
                        <div className="yoo-card yoo-style1">
                            <div className="yoo-card-heading">
                                <div className="yoo-card-heading-left">
                                    <h2 className="yoo-card-title">{translate("Page Details")}</h2>
                                </div>
                            </div>
                            <div className="yoo-card-body">
                                <div className="yoo-padd-lr-20">
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                    <div className="form-group form-group-md">
                                        <label htmlFor="default_home_page">{translate("Select Default Home Page")}</label>
                                        <div className="yoo-select">
                                            <select
                                                className="form-control"
                                                id="default_home_page"
                                                onChange={(e) => setData("default_home_page", e.target.value)}
                                                value={data.default_home_page}
                                            >
                                                <option value="">{translate("Select Home Page")}</option>
                                                {contents.map((content) => (
                                                    <option key={content.id} value={content.page_id}>
                                                        {content.title}
                                                    </option>
                                                ))}
                                            </select>
                                            <FromValidationError message={errors?.default_home_page} />
                                        </div>
                                    </div>
                                    <div className="form-group form-group-md">
                                        <label htmlFor="default_terms_and_conditions_page">{translate("Select Terms & Condition Page")}</label>
                                        <div className="yoo-select">
                                            <select
                                                className="form-control"
                                                id="default_terms_and_conditions_page"
                                                onChange={(e) => setData("default_terms_and_conditions_page", e.target.value)}
                                                value={data.default_terms_and_conditions_page}
                                            >
                                                <option value="">{translate("Select Home Page")}</option>
                                                {contents.map((content) => (
                                                    <option key={content.id} value={content.page_id}>
                                                        {content.title}
                                                    </option>
                                                ))}
                                            </select>
                                            <FromValidationError message={errors?.default_terms_and_conditions_page} />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>{translate("Breadcrumb Image")}</label>
                                        <SingleMediaUploader
                                            onSelected={(e) => {
                                                setData(
                                                    produce((draft) => {
                                                        draft.breadcrumb_image = e
                                                    })
                                                )
                                            }}
                                            handleRemoved={() =>
                                                setData(
                                                    produce((draft) => {
                                                        draft.breadcrumb_image = ""
                                                    })
                                                )
                                            }
                                            defaultValue={data.breadcrumb_image}
                                        />
                                    </div>
                                    <FromValidationError message={errors?.breadcrumb_image} />
                                    <div className="form-group">
                                        <label
                                            htmlFor=""
                                            style={{
                                                display: "flex",
                                                gap: "10px"
                                            }}
                                        >
                                            {translate("Show Breadcrumb")}:{" "}
                                            <div
                                                className={`yoo-switch ${data.is_show_breadcrumb === "1" ? "active" : ""}`}
                                                onClick={() =>
                                                    setData(
                                                        produce((draft) => {
                                                            draft.is_show_breadcrumb = draft.is_show_breadcrumb === "0" ? "1" : "0"
                                                        })
                                                    )
                                                }
                                            >
                                                <div className="yoo-switch-in" />
                                            </div>
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label
                                            htmlFor=""
                                            style={{
                                                display: "flex",
                                                gap: "10px"
                                            }}
                                        >
                                            {translate("Show Blog Sidebar")}:{" "}
                                            <div
                                                className={`yoo-switch ${data.is_show_blog_details_sidebar === "1" ? "active" : ""}`}
                                                onClick={() =>
                                                    setData(
                                                        produce((draft) => {
                                                            draft.is_show_blog_details_sidebar =
                                                                draft.is_show_blog_details_sidebar === "0" ? "1" : "0"
                                                        })
                                                    )
                                                }
                                            >
                                                <div className="yoo-switch-in" />
                                            </div>
                                        </label>
                                    </div>
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                    <div className="form-group">
                                        <label>Authentication Background Image (972 x 1000 pixels)</label>
                                        <SingleMediaUploader
                                            onSelected={(e) => {
                                                setData(
                                                    produce((draft) => {
                                                        draft.auth_bg_image = e
                                                    })
                                                )
                                            }}
                                            handleRemoved={() =>
                                                setData(
                                                    produce((draft) => {
                                                        draft.auth_bg_image = ""
                                                    })
                                                )
                                            }
                                            defaultValue={data.auth_bg_image}
                                        />
                                        <FromValidationError message={errors?.auth_bg_image} />
                                    </div>
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                    <button type="submit" className="btn btn-success">
                                        {translate("Update")}
                                    </button>
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                </div>
                            </div>
                        </div>
                        <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                    </div>
                </form>
            </div>
        </AdminLayouts>
    )
}
