import AdminLayouts from "@/Admin/Layouts/AdminLayouts"
import translate from "@/utils/translate"
import { Head, router, useForm } from "@inertiajs/react"
import { IonIcon } from "@ionic/react"
import { languageOutline, closeOutline } from "ionicons/icons"
import React, { useEffect, useState } from "react"
import SmallModal from "@/Admin/Components/Modal/SmallModal"

export default function Show({ language, posts }) {
    const { data, setData, put } = useForm({ values: { ...posts } })
    const [isAutoTranslating, setIsAutoTranslating] = useState(false);
    const [showProgressModal, setShowProgressModal] = useState(false);
    const [translationProgress, setTranslationProgress] = useState({
        total: 0,
        completed: 0,
        currentKey: ""
    });

    const handleInputChange = (key, value) => {
        setData("values", { ...data.values, [key]: value })
    }

    const handlePublish = (e) => {
        e.preventDefault()
        put(route("admin.translations.update", language), data)
    }

    // Modified auto translate function to process keys one by one
    const handleAutoTranslate = async () => {
        setIsAutoTranslating(true);
        setShowProgressModal(true);

        // Get all keys that need translation
        const keys = Object.keys(data.values);
        setTranslationProgress({
            total: keys.length,
            completed: 0,
            currentKey: ""
        });


        // Process each key one by one
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];

            // Update progress state
            setTranslationProgress(prev => ({
                ...prev,
                currentKey: key,
                completed: i
            }));

            // Send individual translation request
            try {
                const response = await axios.put(route('admin.translations.auto', language), {
                    key,
                });
                // Small delay to prevent overwhelming the server
                await new Promise(resolve => setTimeout(resolve, 100));

            } catch (error) {
                console.error(`Error translating key ${key}:`, error);
            }
        }

        // Final update
        setTranslationProgress(prev => ({
            ...prev,
            completed: keys.length
        }));

        // Wait a moment before closing modal so user can see completion
        setTimeout(() => {
            setIsAutoTranslating(false);
            setShowProgressModal(false);
            window.location.reload();
        }, 1000);
    }

    // Progress calculation
    const getProgressPercentage = () => {
        if (translationProgress.total === 0) return 0;
        return Math.round((translationProgress.completed / translationProgress.total) * 100);
    }

    // Custom progress modal component
    const TranslationProgressModal = () => (
        <SmallModal
            isModal={showProgressModal}
            title={translate("Translation Progress")}
            dismissButtonTitle={translate("Canceled")}
            hideActionButton={true}
            onClose={() => {
                window.location.reload();
            }}
            closeModal={() => {
                window.location.reload();
            }}
        >
            <div className="text-center mb-4">
                <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="fw-bold">{translate("Progress")}</span>
                        <span>{getProgressPercentage()}% {translate("Complete")}</span>
                    </div>

                    <div className="progress" style={{ height: "20px" }}>
                        <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: `${getProgressPercentage()}%` }}
                            aria-valuenow={getProgressPercentage()}
                            aria-valuemin="0"
                            aria-valuemax="100"
                        ></div>
                    </div>
                </div>

                <p className="text-muted">
                    <IonIcon icon={languageOutline} className="me-1" />
                    {translationProgress.completed} of {translationProgress.total} {translate("translation keys completed")}
                </p>

                {translationProgress.currentKey && (
                    <p className="mt-2">
                        {translate("Currently translating")}: <strong>{translationProgress.currentKey}</strong>
                    </p>
                )}
            </div>
        </SmallModal>
    );

    return (
        <AdminLayouts>
            <Head title="Edit Language" />
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
                                            width: "16px",
                                            height: "16px"
                                        }}
                                    />
                                </span>
                                {translate("Translate Files")}
                            </h2>
                        </div>
                    </div>
                    <div className="yoo-card-body" style={{ padding: "0px 30px" }}>
                        <div>
                            <div className="yoo-height-b15 yoo-height-lg-b15" />
                            <div className="yooDataTableWrap">
                                <form onSubmit={handlePublish}>
                                    <div id="yooDataTable_wrapper" className="dataTables_wrapper no-footer">
                                        <table id="yooDataTable" className="display dataTable no-footer" style={{ width: "100%" }}>
                                            <thead>
                                                <tr role="row">
                                                    <th width="35%">{translate("Translation Key")}</th>
                                                    <th width="65%">{translate("Translated Value")}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Object.entries(data.values).map(([key, value]) => (
                                                    <tr key={key}>
                                                        <td style={{ padding: "10px 30px" }}>{key}</td>
                                                        <td style={{ padding: "10px 30px" }}>
                                                            <input
                                                                type="text"
                                                                value={value}
                                                                className="form-control"
                                                                onChange={(e) => handleInputChange(key, e.target.value)}
                                                            />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <div className="clear" />
                                    </div>
                                    <div className="dataTables_heading">
                                        <div className="dataTables_heading_left mt-3 ml-3 mb-3"></div>
                                        <div className="dataTables_heading_right mt-3 ml-3 mb-3">
                                            <button
                                                onClick={handleAutoTranslate}
                                                type="button"
                                                className="btn btn-success"
                                                disabled={isAutoTranslating}
                                            >
                                                {isAutoTranslating ? translate('Translating...') : translate('Auto Translate')}
                                            </button>
                                            <button type="submit" className="btn btn-success">
                                                {translate("Save")}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Translation Progress Modal */}
                <TranslationProgressModal />
                <div className="yoo-height-b30 yoo-height-lg-b30" />
            </div>
        </AdminLayouts>
    )
}
