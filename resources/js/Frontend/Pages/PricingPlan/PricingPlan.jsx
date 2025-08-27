import React from "react"
import BioneMeta from "@/utils/BioneMeta"
import PageHeading from "@/Frontend/Components/PageHeading"
import FrontendLayout from "@/Frontend/Layouts/FrontendLayout"
import { Link } from "@inertiajs/react"
import translate from "@/utils/translate"

export default function PricingPlan({ pricing_plans, meta_tags, tagline, site_name }) {
    const { breadcrumb_image, is_show_breadcrumb } = JSON.parse(localStorage.getItem("page_settings")) || {}

    BioneMeta(tagline, "", meta_tags, "", "", site_name)

    return (
        <FrontendLayout headerLayout="1" footerLayout="1">
            {is_show_breadcrumb === "1" && (
                <PageHeading
                    data={{
                        title: translate("Pricing Plans"),
                        breadcrumb: [{ label: "Home", url: "/" }]
                    }}
                    bgSrc={breadcrumb_image ? breadcrumb_image : "/static/page_heading.jpeg"}
                />
            )}
            <div className="cs_height_150 cs_height_lg_80"></div>
            <div className="container">
                <div className="row cs_row_gap_60 cs_gap_y_40">
                    {pricing_plans?.map(
                        (plan, index) =>
                            plan?.content && (
                                <div className="col-lg-6" key={index}>
                                    <div className="cs_pricing_table cs_style_1">
                                        <h2 className="cs_pricing_title cs_fs_53 cs_normal">{plan?.content?.name}</h2>
                                        {plan?.content?.plan_features?.length > 0 && (
                                            <ul className="cs_pricing_feature cs_mp0 cs_fs_18 cs_medium">
                                                {(plan?.content?.plan_features ? JSON.parse(plan.content.plan_features) : []).map(
                                                    (feature, fIndex) => (
                                                        <li key={fIndex}>
                                                            {feature && (
                                                                <i className="cs_feature_icon cs_accent_color">
                                                                    <svg
                                                                        width={25}
                                                                        height={25}
                                                                        viewBox="0 0 25 25"
                                                                        fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <circle cx="12.5" cy="12.5" r="12.5" fill="currentColor" />
                                                                        <path
                                                                            d="M10.9273 14.5469C10.9828 14.4487 11.0197 14.3453 11.0844 14.273C12.8305 12.3146 14.5766 10.3666 16.3226 8.40821C16.5305 8.17569 16.7615 8 17.0663 8C17.4359 8.00517 17.7177 8.19119 17.8886 8.55806C18.0595 8.92493 18.0318 9.2918 17.8193 9.62767C17.7592 9.72585 17.6807 9.81369 17.6068 9.89637C15.6205 12.1183 13.6342 14.3402 11.6479 16.5621C11.126 17.146 10.6271 17.146 10.1097 16.5621C9.18586 15.5286 8.25739 14.4952 7.33354 13.4566C6.98709 13.069 6.90856 12.6092 7.10719 12.1906C7.40744 11.5499 8.13267 11.4414 8.62693 11.9839C9.31982 12.7435 9.99886 13.5186 10.6825 14.2833C10.7472 14.3557 10.8072 14.4177 10.9273 14.5469Z"
                                                                            fill="white"
                                                                        />
                                                                    </svg>
                                                                </i>
                                                            )}
                                                            <span>{feature}</span>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        )}
                                        <div className="cs_pricing_info">
                                            <div className="cs_price">
                                                <h3 className="cs_fs_53 cs_normal mb-0">
                                                    {plan?.currency?.symbol}
                                                    {plan?.price}
                                                    {plan?.content.plan_duration && "/"}
                                                </h3>
                                                <span className="cs-accent_color">{translate(plan?.content.plan_duration)}</span>
                                            </div>
                                            <Link
                                                href={route("pricing.plan", plan)}
                                                className="cs_btn cs_style_1 cs_type_2 cs_primary_bg cs_white_color"
                                            >
                                                {translate("Purchase now")}
                                                <span>
                                                    <i>
                                                        <svg
                                                            width={11}
                                                            height={11}
                                                            viewBox="0 0 11 11"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M1 10L10 1M10 1L1 1M10 1L10 10"
                                                                stroke="currentColor"
                                                                strokeWidth="1.5"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </svg>
                                                    </i>
                                                    <i>
                                                        <svg
                                                            width={11}
                                                            height={11}
                                                            viewBox="0 0 11 11"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M1 10L10 1M10 1L1 1M10 1L10 10"
                                                                stroke="currentColor"
                                                                strokeWidth="1.5"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </svg>
                                                    </i>
                                                </span>
                                            </Link>
                                        </div>
                                        {plan?.content?.subtitle && <div className="cs-price_text">{plan?.content?.subtitle}</div>}
                                    </div>
                                </div>
                            )
                    )}
                </div>
            </div>
            <div className="cs_height_150 cs_height_lg_80"></div>
        </FrontendLayout>
    )
}
