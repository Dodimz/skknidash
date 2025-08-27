import { Head, Link } from "@inertiajs/react"
import { languageOutline } from "ionicons/icons"
import { IonIcon } from "@ionic/react"
import AdminLayouts from "@/Admin/Layouts/AdminLayouts"
import translate from "@/utils/translate"

export default function Index({ languages, default_lang }) {
    return (
        <AdminLayouts>
            <Head title="All Translate Files" />
            <div className="yoo-height-b30 yoo-height-lg-b30" />
            <div className="container">
                <div className="yoo-uikits-heading">
                    <h2 className="yoo-uikits-title">{translate("All Translate Files")}</h2>
                </div>
                <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                <div className="yoo-card yoo-style1">
                    <div className="yoo-card-heading">
                        <div className="yoo-card-heading-left">
                            <h2 className="yoo-card-title">
                                <span className="yoo-card-title-icon yoo-yellow-bg">
                                    <IonIcon
                                        icon={languageOutline}
                                        style={{
                                            width: "18px",
                                            height: "18px"
                                        }}
                                    />
                                </span>
                                {translate("Translate Files")}
                            </h2>
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
                                                <th width="85%">{translate("Languages")}</th>

                                                <th style={{ width: "15%" }} className="sorting text-right">
                                                    {translate("Action")}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.entries(languages).map(([code, language], index) => (
                                                <tr className="odd" key={index}>
                                                    <td>
                                                        <span style={{ marginRight: "10px" }}>{language.name}</span>{" "}
                                                        {default_lang === code ? (
                                                            <span className="badge badge-success">{translate("Default")}</span>
                                                        ) : (
                                                            ""
                                                        )}
                                                    </td>
                                                    <td>
                                                        <div className="text-right">
                                                            <Link
                                                                href={route("admin.translations.show", { id: code })}
                                                                className="btn btn-sm btn-outline-primary"
                                                            >
                                                                {translate("Translate")}
                                                            </Link>
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
