import { Icon } from "@iconify/react"
import React from "react"

export default function Rating({ className, ratingNumber }) {
    return (
        <div className={className} data-rating="4.5">
            <i className="cs_center">
                <Icon icon="fa6-regular:star" />
            </i>
            <i className="cs_center">
                <Icon icon="fa6-regular:star" />
            </i>
            <i className="cs_center">
                <Icon icon="fa6-regular:star" />
            </i>
            <i className="cs_center">
                <Icon icon="fa6-regular:star" />
            </i>
            <i className="cs_center">
                <Icon icon="fa6-regular:star" />
            </i>
            <div className="cs_rating_percentage" style={{ width: `${ratingNumber * 20}%` }}>
                <i className="cs_center">
                    <Icon icon="fa6-solid:star" />
                </i>
                <i className="cs_center">
                    <Icon icon="fa6-solid:star" />
                </i>
                <i className="cs_center">
                    <Icon icon="fa6-solid:star" />
                </i>
                <i className="cs_center">
                    <Icon icon="fa6-solid:star" />
                </i>
                <i className="cs_center">
                    <Icon icon="fa6-solid:star" />
                </i>
            </div>
        </div>
    )
}
