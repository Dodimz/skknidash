import { Head, router, usePage } from "@inertiajs/react"
import { Fragment, useState } from "react"
import { produce } from "immer"
import AdminLayouts from "@/Admin/Layouts/AdminLayouts"
import TextInput from "@/Admin/Components/Inputs/TextInput"
import translate from "@/utils/translate"

export default function Edit({ permissions, permissionsId, role }) {
    const { errors } = usePage().props
    const [data, setData] = useState({
        title: role.title,
        description: role.description,
        permissions: permissionsId ?? []
    })

    const toggleSelectAll = (item) => {
        const actionIds = Object.values(item.actions).map((action) => action.id)

        const areSelected = actionIds.every((id) => data.permissions.includes(id))

        setData(
            produce((draft) => {
                if (areSelected) {
                    draft.permissions = draft.permissions.filter((permissionId) => !actionIds.includes(permissionId))
                } else {
                    actionIds.forEach((id) => {
                        if (!draft.permissions.includes(id)) {
                            draft.permissions.push(id)
                        }
                    })
                }
            })
        )
    }

    // handle publish
    const handlePublish = (e) => {
        e.preventDefault()
        router.put(route("admin.roles.permissions.update", role), data)
    }
    const permissionArray = Object.values(permissions.crud_permissions)

    return (
        <AdminLayouts>
            <Head title="Edit role" />
            <div className="yoo-height-b30 yoo-height-lg-b30" />
            <div className="container-fluid">
                <div className="yoo-uikits-heading">
                    <h2 className="yoo-uikits-title">{translate("Edit role")}</h2>
                </div>
                <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                <form className="row" onSubmit={handlePublish}>
                    <div className="col-lg-8">
                        <div className="yoo-card yoo-style1">
                            <div className="yoo-card-heading">
                                <div className="yoo-card-heading-left">
                                    <h2 className="yoo-card-title">{translate("Role Details")}</h2>
                                </div>
                            </div>
                            <div className="yoo-card-body">
                                <div className="yoo-padd-lr-20">
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                    <TextInput
                                        title="Role Title *"
                                        type="text"
                                        id="title"
                                        error={errors?.title}
                                        value={data.title}
                                        onChange={(e) =>
                                            setData(
                                                produce((draft) => {
                                                    draft.title = e.target.value
                                                })
                                            )
                                        }
                                        readOnly={role?.name === "admin" || role?.name === "user"}
                                    />
                                    <TextInput
                                        title="Description *"
                                        type="text"
                                        id="desc"
                                        error={errors?.description}
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                produce((draft) => {
                                                    draft.description = e.target.value
                                                })
                                            )
                                        }
                                        readOnly={role?.name === "admin" || role?.name === "user"}
                                    />
                                    <div className="pb-2">
                                        <strong>{translate("Permissions")}</strong>
                                    </div>
                                    {permissionArray.map((item, index) => (
                                        <Fragment key={`g-${index}`}>
                                            <div className="yoo-card-heading">
                                                <div
                                                    className="yoo-card-heading-left"
                                                    style={{
                                                        display: "flex",
                                                        gap: "15px"
                                                    }}
                                                >
                                                    <div
                                                        className={`yoo-check-mark-all ${
                                                            Object.values(item.actions).every((action) => data.permissions.includes(action.id))
                                                                ? "active"
                                                                : ""
                                                        }`}
                                                        onClick={() => toggleSelectAll(item)}
                                                    >
                                                        <span className="yoo-first" />
                                                        <span className="yoo-last" />
                                                    </div>
                                                    <h2 className="yoo-card-title">{item.title}</h2>
                                                </div>
                                            </div>
                                            <div className="permission-group">
                                                <div className="yoo-padd-lr-20">
                                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                                    {Object.entries(item.actions).map(([key, action]) => (
                                                        <div key={key} className="custom-control custom-checkbox form-check-inline">
                                                            <input
                                                                className="custom-control-input"
                                                                type="checkbox"
                                                                id={`inlineCheckbox-${action.id}`}
                                                                value={action.id}
                                                                onClick={() => {
                                                                    const indexItem = data.permissions.findIndex((item) => item === action.id)
                                                                    if (indexItem === -1) {
                                                                        setData(
                                                                            produce((draft) => {
                                                                                draft.permissions.push(action.id)
                                                                            })
                                                                        )
                                                                    } else {
                                                                        setData(
                                                                            produce((draft) => {
                                                                                draft.permissions.splice(indexItem, 1)
                                                                            })
                                                                        )
                                                                    }
                                                                }}
                                                                checked={data.permissions.includes(action.id)}
                                                            />
                                                            <label
                                                                className="custom-control-label text-capitalize"
                                                                htmlFor={`inlineCheckbox-${action.id}`}
                                                            >
                                                                <span className="custom-control-shadow" /> {key}
                                                            </label>
                                                        </div>
                                                    ))}
                                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                                </div>
                                            </div>
                                        </Fragment>
                                    ))}
                                    <div className="mt-3">
                                        <button type="submit" className="btn btn-success">
                                            {translate("Update")}
                                        </button>
                                    </div>
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
