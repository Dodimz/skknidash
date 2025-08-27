import { IonIcon } from "@ionic/react"
import { chevronDownOutline, chevronUpOutline } from "ionicons/icons"
import { useState } from "react"

export default function CustomLinkAccordion({ addMenu }) {
    const [isOpen, setIsOpen] = useState(false)
    const [data, setData] = useState({
        url: "",
        name: "",
        type: "Custom Link"
    })
    // hande add menu
    const handleAddMenu = (e) => {
        e.preventDefault()
        addMenu([data])
        setData({ ...data, url: "", name: "" })
    }
    return (
        <li className={`list-group-item ${isOpen ? "show" : ""}`}>
            <form onSubmit={handleAddMenu}>
                <div className="list-group-heading" onClick={() => setIsOpen(!isOpen)}>
                    Custom Links{" "}
                    <span>
                        <IonIcon icon={isOpen ? chevronUpOutline : chevronDownOutline} />
                    </span>
                </div>
                <div className="list-group-content">
                    <div className="form-group" style={{ marginBottom: "10px" }}>
                        <label htmlFor="" className="mr-2">
                            URL
                        </label>
                        <input
                            style={{ width: "100%", padding: "0px 5px" }}
                            required
                            value={data.url}
                            placeholder="Https://"
                            type="text"
                            onChange={(e) => setData({ ...data, url: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="" className="mr-2">
                            Link Text
                        </label>
                        <input
                            style={{ width: "100%", padding: "0px 5px" }}
                            required
                            value={data.name}
                            type="text"
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                        />
                    </div>
                    <div className="list-group-content-bottom mt-3">
                        <button className="btn btn-sm btn-outline-primary" type="submit">
                            Add to menu
                        </button>
                    </div>
                </div>
            </form>
        </li>
    )
}
