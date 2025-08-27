import { IonIcon } from "@ionic/react"
import { chevronDownOutline, chevronUpOutline } from "ionicons/icons"
import { useState } from "react"

export default function MenuItem({ isBulkSelect, menu, index, outParent, underParent, handleBulkSelectedItem, removeMenu, updateLabel }) {
    const [isOpenMenu, setIsOpenMenu] = useState(false)

    // conditional menu render
    let moveElement = ""

    if (index !== 0) {
        if (menu.parent_id) {
            moveElement = <span onClick={() => outParent(menu.id)}>Out from under {menu.parentMenuName}</span>
        } else {
            moveElement = <span onClick={() => underParent(menu.id)}>Under {menu.prevMenuName}</span>
        }
    }

    return (
        <>
            <li className={`menu-single-item ${isOpenMenu ? "show" : ""}`} style={{ marginLeft: `${menu.level * 20}px` }}>
                <div className="menu-single-item-head">
                    <div className="menu-item-left">
                        {isBulkSelect && <input type="checkbox" onChange={() => handleBulkSelectedItem(menu.id)} />}
                        <span>{menu.name}</span>
                    </div>
                    <div className="menu-item-right">
                        <span>{menu?.type}</span>
                        <IonIcon onClick={() => setIsOpenMenu(!isOpenMenu)} icon={isOpenMenu ? chevronUpOutline : chevronDownOutline} />
                    </div>
                </div>
                <div className="menu-single-item-content">
                    <div className="move-control">
                        <p>
                            <span className="mr-1">Move:</span>
                            {index !== 0 && menu.prevMenuName && (
                                <span className="mr-2" onClick={() => underParent(menu.id)}>
                                    Under {menu.prevMenuName}
                                </span>
                            )}
                            {menu.parentMenuName && <span onClick={() => outParent(menu.id)}>Out from under {menu.parentMenuName}</span>}
                        </p>
                    </div>
                    <label htmlFor="">
                        Navigation Label <br />
                        <input type="text" value={menu.name} onChange={(e) => updateLabel(menu.id, e.target.value)} />
                    </label>
                    <div className="link-original">
                        <p>
                            Original:{" "}
                            <a href={menu.url} target="_blank">
                                {menu.originalName}
                            </a>
                        </p>
                    </div>
                    <div className="action-link">
                        <span
                            onClick={() => {
                                setIsOpenMenu(false)
                                removeMenu(menu.id)
                            }}
                            style={{ cursor: "pointer" }}
                            className="text-danger mr-1"
                        >
                            Remove
                        </span>
                        <span className="mr-1">|</span>
                        <span
                            onClick={() => {
                                setIsOpenMenu(false)
                            }}
                            style={{ cursor: "pointer" }}
                            className="text-primary"
                        >
                            Cancel
                        </span>
                    </div>
                </div>
            </li>
        </>
    )
}
