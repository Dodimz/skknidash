import FromValidationError from "@/Admin/Components/Validation/FromValidationError"
import AdminLayouts from "@/Admin/Layouts/AdminLayouts"
import Amount from "@/Components/Amount"
import translate from "@/utils/translate"
import { Head, useForm } from "@inertiajs/react"
import moment from "moment"
import React from "react"

export default function Show({ order }) {
    const {
        coupon_code,
        created_at,
        customer_email,
        customer_name,
        customer_phone,
        shipping_address,
        discount,
        order_notes,
        order_number,
        payment_method,
        payment_status,
        status,
        total_price,
        orderitems,
        transaction_id,
        receipt_file_url,
        receipt_file
    } = order
    const { data, setData, errors, put } = useForm({
        status: status,
        payment_status: payment_status
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        put(route("admin.orders.update.status", order))
    }

    return (
        <AdminLayouts>
            <Head title="Order Information" />
            <div className="yoo-height-b30 yoo-height-lg-b30" />

            <div className="container-fluid">
                <div className="yoo-uikits-heading">
                    <h2 className="yoo-uikits-title">{translate("Order Information")}</h2>
                </div>
                <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                <div className="row">
                    <div className="col-lg-8">
                        <div className="yoo-card yoo-style1">
                            <div className="yoo-card-heading">
                                <div className="yoo-card-heading-left">
                                    <h2 className="yoo-card-title">{translate("Order Information")}</h2>
                                </div>
                            </div>
                            <div className="yoo-card-body">
                                <div className="yoo-padd-lr-30">
                                    <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="invoice-title">{translate("Placed On")}</div>
                                            <div className="invoice-content">{moment(created_at).format("lll")}</div>
                                        </div>{" "}
                                        <div className="col-md-4">
                                            <div className="invoice-title">{translate("Order Id")}</div>
                                            <div className="invoice-content">#{order_number}</div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="invoice-title">{translate("Full Name")}</div>
                                            <div className="invoice-content">{customer_name}</div>
                                        </div>
                                    </div>
                                    <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="invoice-title">{translate("Email")}</div>
                                            <div className="invoice-content">
                                                <a style={{ color: "#2e70c3" }} href={`mailto:${customer_email}`}>
                                                    {customer_email}
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="invoice-title">{translate("Phone")}</div>
                                            <div className="invoice-content">
                                                <a style={{ color: "#2e70c3" }} href={`tel:${customer_phone}`}>
                                                    {customer_phone}
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="invoice-title">{translate("Address")}</div>
                                            <div className="invoice-content">{shipping_address}</div>
                                        </div>
                                    </div>

                                    <h5 className="mt-5 mb-1">{translate("Order Items")}</h5>
                                    <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                                    <div id="yooDataTable_wrapper" className="dataTables_wrapper no-footer">
                                        <table id="yooDataTable" className="display dataTable no-footer" style={{ width: "100%" }}>
                                            <thead>
                                                <tr role="row" style={{ borderLeft: "1px solid #e5e5e5" }}>
                                                    <th width="25%">{translate("Image")}</th>
                                                    <th width="25%">{translate("Product Name")}</th>
                                                    <th width="15%">{translate("Quantity")}</th>
                                                    <th width="15%">{translate("Unit Price")}</th>
                                                    <th width="20%">{translate("Total")}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {orderitems?.map((item, index) => (
                                                    <tr
                                                        className="odd"
                                                        key={index}
                                                        style={{ borderBottom: "1px solid #e5e5e5", borderLeft: "1px solid #e5e5e5" }}
                                                    >
                                                        <td>
                                                            <img
                                                                style={{
                                                                    width: "150px"
                                                                }}
                                                                src={item.product_image}
                                                                alt=""
                                                            />
                                                        </td>
                                                        <td>{item.product_name}</td>
                                                        <td>{item.quantity}</td>
                                                        <td>
                                                            <Amount amount={item.product_price} />
                                                        </td>
                                                        <td>
                                                            <Amount amount={item.total_price} />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <div className="clear" />
                                    </div>
                                    <div className="yoo-height-b20 yoo-height-lg-b20"></div>

                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="invoice-title">{translate("Subtotal")}</div>
                                            <div className="invoice-content">
                                                <Amount amount={parseInt(total_price) + parseInt(discount)} />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="invoice-title">{translate("Discount Amount")}</div>
                                            <div className="invoice-content">
                                                <Amount amount={discount || "N/A"} />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="invoice-title">{translate("Applied Coupon")}</div>
                                            <div className="invoice-content">
                                                <span>{coupon_code ? coupon_code : ""}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="invoice-title">{translate("Grand Total")}</div>
                                            <div className="invoice-content">
                                                <Amount amount={total_price} />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="invoice-title">{translate("Order Number")}</div>
                                            <div className="invoice-content">#{order_number}</div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="invoice-title">{translate("Order Notes")}</div>
                                            <div className="invoice-content">{order_notes || "N/A"}</div>
                                        </div>
                                    </div>
                                    <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="invoice-title">{translate("Payment Method")}</div>
                                            <div className="invoice-content">{payment_method}</div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="invoice-title">{translate("Status")}</div>
                                            <div className="invoice-content">
                                                <span
                                                    className={`badge ${status === "initialize"
                                                        ? "badge-secondary"
                                                        : status === "pending"
                                                            ? "badge-warning"
                                                            : status === "confirmed"
                                                                ? "badge-success"
                                                                : status === "canceled"
                                                                    ? "badge-danger"
                                                                    : "badge-info"
                                                        }`}
                                                >
                                                    {status?.charAt(0)?.toUpperCase() + status?.slice(1)}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="invoice-title">{translate("Payment Status")}</div>
                                            <div className="invoice-content">
                                                <span
                                                    className={`badge ${payment_status === "0"
                                                        ? "badge-secondary"
                                                        : payment_status === "1"
                                                            ? "badge-warning"
                                                            : payment_status === "2"
                                                                ? "badge-success"
                                                                : "badge-danger"
                                                        }`}
                                                >
                                                    {payment_status === "0"
                                                        ? "Initialize"
                                                        : payment_status === "1"
                                                            ? "Awaiting Payment"
                                                            : payment_status === "2"
                                                                ? "Success"
                                                                : "Canceled"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                                    {(transaction_id || receipt_file) && (
                                        <div className="row">
                                            {transaction_id && (
                                                <div className="col-md-4">
                                                    <div className="invoice-title">{translate("Transaction ID")}</div>
                                                    <div className="invoice-content">{transaction_id}</div>
                                                </div>
                                            )}
                                            {receipt_file && (
                                                <div className="col-md-8">
                                                    <div className="invoice-title">{translate("Preview URL")}</div>
                                                    <a href={receipt_file_url} className="invoice-content" target="_blank">{receipt_file_url}</a>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    {/* Invoice buttons */}
                                    <div className="btn-list mt-4 mb-3">
                                        <a
                                            href={route("admin.orders.show.invoice", order)}
                                            type="button"
                                            className="btn btn-outline-secondary mr-3"
                                            target="_blank"
                                        >
                                            <svg
                                                className="icon icon-left svg-icon-ti-ti-printer"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                <path d="M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2"></path>
                                                <path d="M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4"></path>
                                                <path d="M7 13m0 2a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2z"></path>
                                            </svg>
                                            {translate("View Invoice")}
                                        </a>
                                        <a
                                            href={route("admin.orders.download.invoice", order)}
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            download
                                        >
                                            <svg
                                                className="icon icon-left svg-icon-ti-ti-download"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
                                                <path d="M7 11l5 5l5 -5"></path>
                                                <path d="M12 4l0 12"></path>
                                            </svg>
                                            {translate("Download Invoice")}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                    </div>
                    <div className="col-md-4">
                        <form onSubmit={handleSubmit}>
                            <div className="yoo-card yoo-style1">
                                <div className="yoo-card-heading">
                                    <div className="yoo-card-heading-left">
                                        <h2 className="yoo-card-title">{translate("Status")}</h2>
                                    </div>
                                </div>
                                <div className="yoo-card-body">
                                    <div className="yoo-padd-lr-20">
                                        <div className="yoo-height-b20 yoo-height-lg-b20" />
                                        <label htmlFor="status">{translate("Order Status")} *</label>
                                        <div className="form-group form-group-md">
                                            <div className="yoo-select">
                                                <select
                                                    id="status"
                                                    value={data.status}
                                                    className="form-control"
                                                    onChange={(e) => setData("status", e.target.value)}
                                                >
                                                    <option value="pending">{translate("Pending")}</option>
                                                    <option value="confirmed">Confirmed</option>
                                                    <option value="completed">Completed</option>
                                                    <option value="canceled">Canceled</option>
                                                </select>
                                            </div>
                                            <FromValidationError message={errors.status} />
                                        </div>
                                        <label htmlFor="payment_status">{translate("Payment Status")} *</label>
                                        <div className="form-group form-group-md">
                                            <div className="yoo-select">
                                                <select
                                                    id="payment_status"
                                                    value={data.payment_status}
                                                    className="form-control"
                                                    onChange={(e) => setData("payment_status", e.target.value)}
                                                >
                                                    <option value="1">Awaiting payment</option>
                                                    <option value="2">Success</option>
                                                    <option value="3">Cancel</option>
                                                </select>
                                            </div>
                                            <FromValidationError message={errors.payment_status} />
                                        </div>
                                        <button type="submit" className="btn btn-success mb-3">
                                            {translate("Update")}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayouts>
    )
}
