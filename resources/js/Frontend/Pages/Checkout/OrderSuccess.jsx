import FrontendLayout from "@/Frontend/Layouts/FrontendLayout"
import PageHeading from "@/Frontend/Components/PageHeading"
import React from "react"
import Lottie from "lottie-react";
import SuccessAnimation from "../../Lottie/success.json";
import translate from "@/utils/translate"
import { Link } from "@inertiajs/react"
import BioneMeta from "@/utils/BioneMeta";

export default function OrderSuccess({ order, meta_tags, tagline, site_name }) {
    BioneMeta(tagline, "", meta_tags, "", "", site_name)

    // page header data
    let pageHeaderData = {
        title: "Order Success",
        breadcrumb: [
            { label: "Home", url: "/" },
            {
                label: "Order Success",
                url: null
            }
        ]
    }
    return (
        <FrontendLayout>
            <PageHeading
                data={pageHeaderData}
                bgSrc={"/static/page_heading.jpeg"}
            />
            <div className="container booking-success-page text-center">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card booking-card p-4">
                            <div className="card-body">
                                <div className="booking-success-icon">
                                    <Lottie
                                        animationData={SuccessAnimation}
                                        loop={true}
                                    />
                                </div>
                                <h1 className="my-4">
                                    {translate("Your Order Has Been Successfully Placed")}!
                                </h1>
                                <p>
                                    {translate("Your order id is")}:{" "}
                                    #{order.order_number}
                                </p>
                                <Link
                                    href={route("home")}
                                    className="btn booking-btn-custom mt-4"
                                >
                                    {translate("Go to Homepage")}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FrontendLayout>
    )
}
