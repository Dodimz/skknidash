import { IonIcon } from "@ionic/react"
import { chevronDownOutline, chevronUpOutline } from "ionicons/icons"

export default function SingleMenu() {
    return (
        <li className={`menu-single-item ${isOpenMenu ? "show" : ""}`} draggable>
            <div className="menu-single-item-head">
                <div className="menu-item-left">
                    {isBulkSelect && <input type="checkbox" />}
                    <span>{menu.name}</span>
                </div>
                <div className="menu-item-right">
                    <span>{menu?.type}</span>
                    <IonIcon onClick={() => setIsOpenMenu(!isOpenMenu)} icon={isOpenMenu ? chevronUpOutline : chevronDownOutline} />
                </div>
            </div>
            <div className="menu-single-item-content">
                <label htmlFor="">
                    Navigation Label <br />
                    <input type="text" value={menu.name} />
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
                    <a href="" className="text-danger mr-1">
                        Remove
                    </a>
                    <span className="mr-1">|</span>
                    <a href="" className="text-primary">
                        Cancel
                    </a>
                </div>
            </div>
        </li>
    )
}
