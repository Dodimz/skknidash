import { Head, Link, router } from "@inertiajs/react"
import { createOutline, globeOutline } from "ionicons/icons"
import { IonIcon } from "@ionic/react"
import AdminLayouts from "@/Admin/Layouts/AdminLayouts"
import DeleteButton from "@/Admin/Components/Button/DeleteButton"
import translate from "@/utils/translate"

export default function Index({ languages, default_lang }) {
    const makeDefault = (languageCode) => {
        router.post(route("admin.languages.make.default", { language: languageCode }))
    }

    return (
        <AdminLayouts>
            <Head title="All Languages" />
            <div className="yoo-height-b30 yoo-height-lg-b30" />
            <div className="container">
                <div className="yoo-uikits-heading">
                    <h2 className="yoo-uikits-title">{translate("All Languages")}</h2>
                </div>
                <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                <div className="yoo-card yoo-style1">
                    <div className="yoo-card-heading">
                        <div className="yoo-card-heading-left">
                            <h2 className="yoo-card-title">
                                <span className="yoo-card-title-icon yoo-green-bg">
                                    <IonIcon
                                        icon={globeOutline}
                                        style={{
                                            width: "16px",
                                            height: "16px"
                                        }}
                                    />
                                </span>
                                {translate("Languages")}
                            </h2>
                        </div>
                        <div className="dataTables_heading_right">
                            <Link href={route("admin.languages.create")} className="btn btn-success btn-sm yoo-table-btn1">
                                <span className="yoo-add">+</span> {translate("Create New")}
                            </Link>
                        </div>
                    </div>
                    <div className="yoo-card-body">
                        <div>
                            <div className="yoo-height-b15 yoo-height-lg-b15" />
                            <div className="yooDataTableWrap">
                                <div id="yooDataTable_wrapper" className="dataTables_wrapper no-footer">
                                    <table id="yooDataTable" className="display dataTable no-footer" style={{ width: "100%" }}>
                                        <thead>
                                            <tr role="row">
                                                <th width="15%">{translate("Languages")}</th>

                                                <th width="15%">{translate("Language Code")}</th>

                                                <th width="15%">{translate("Is Default")}</th>

                                                <th width="15%">{translate("Direction")}</th>

                                                <th style={{ width: "10%" }} className="sorting">
                                                    {translate("Action")}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.entries(languages).map(([code, language], index) => (
                                                <tr className="odd" key={index}>
                                                    <td>{language.name}</td>
                                                    <td>{code}</td>
                                                    <td>
                                                        {default_lang === code ? (
                                                            <span className="badge badge-success">{translate("Default")}</span>
                                                        ) : (
                                                            <div className="text-start">
                                                                <a
                                                                    href="#"
                                                                    className="btn btn-sm btn-outline-primary"
                                                                    style={{ height: "30px" }}
                                                                    onClick={() => makeDefault(code)}
                                                                >
                                                                    {translate("Make Default")}
                                                                </a>
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td>{language.is_ltr === "yes" ? "LTR (Left To Right)" : "RTL (Right To Left)"}</td>
                                                    <td>
                                                        <div className="d-flex" style={{ gap: "5px" }}>
                                                            <Link href={route("admin.languages.edit", { id: code })} className="badge badge-primary">
                                                                <IonIcon icon={createOutline} style={{ height: "16px", width: "16px" }} />
                                                            </Link>
                                                            {default_lang === code ? (
                                                                ""
                                                            ) : (
                                                                <DeleteButton href={route("admin.languages.destroy", { id: code })} />
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {!Object.keys(languages).length && (
                                        <div
                                            className="no-data-found"
                                            style={{
                                                textAlign: "center",
                                                padding: "50px"
                                            }}
                                        >
                                            <p>{translate("No data found")}!</p>
                                        </div>
                                    )}
                                    <div className="clear" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="yoo-height-b30 yoo-height-lg-b30" />
            </div>
        </AdminLayouts>
    )
}
