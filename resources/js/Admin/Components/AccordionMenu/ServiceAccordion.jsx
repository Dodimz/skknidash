import { IonIcon } from "@ionic/react"
import { chevronDownOutline, chevronUpOutline } from "ionicons/icons"
import { useEffect, useState } from "react"
import { usePage } from "@inertiajs/react"
import { produce } from "immer"

export default function ServiceAccordion({ addMenu, selectedLang }) {
    const [isOpen, setIsOpen] = useState(false)
    const [isSelectAll, setIsSelectAll] = useState(false)
    const [selectedItems, setSelectedItems] = useState([])
    const { services_menu: services } = usePage().props
    const services_menu = { data: services?.data[selectedLang] }

    // handle selected Services menu
    const handleSelect = (menu) => {
        const isExists = selectedItems.some((item) => item.name === menu.name)

        if (isExists) {
            // remove existing menu
            const removedMenu = selectedItems.filter((f) => f.name !== menu.name)
            setSelectedItems(removedMenu)
        } else {
            setSelectedItems(
                produce((draft) => {
                    draft.push(menu)
                })
            )
        }
    }

    // handle select all
    const handleSelectAll = () => {
        if (isSelectAll) {
            setSelectedItems([])
            setIsSelectAll(false)
        } else {
            setSelectedItems(services_menu.data)
            setIsSelectAll(true)
        }
    }

    // handle add menu
    const handleAddMenu = () => {
        addMenu(selectedItems)
        setIsSelectAll(false)
        setSelectedItems([])
    }

    useEffect(() => {
        // Update select all state based on selectedItems
        setIsSelectAll(selectedItems.length === services_menu.data.length)
    }, [selectedItems, services_menu.data])

    return (
        <li className={`list-group-item ${isOpen ? "show" : ""}`}>
            <div className="list-group-heading" onClick={() => setIsOpen(!isOpen)}>
                Services{" "}
                <span>
                    <IonIcon icon={isOpen ? chevronUpOutline : chevronDownOutline} />
                </span>
            </div>
            <div className="list-group-content">
                <div className="list-group-content-item">
                    {services_menu.data.map((menu, index) => (
                        <div key={index} className="form-check">
                            <input
                                type="checkbox"
                                checked={selectedItems.some((item) => item.name === menu.name)}
                                value={menu.name}
                                className="form-check-input"
                                onChange={() => handleSelect(menu)}
                                id={`Services-${index}`}
                            />
                            <label className="form-check-label" htmlFor={`Services-${index}`}>
                                {menu.name}
                            </label>
                        </div>
                    ))}
                </div>
                <div className="list-group-content-bottom mt-3">
                    <div className="form-check">
                        <input
                            type="checkbox"
                            checked={isSelectAll}
                            onChange={handleSelectAll}
                            className="form-check-input"
                            id="service-select-all"
                        />
                        <label className="form-check-label" htmlFor="service-select-all">
                            Select All
                        </label>
                    </div>
                    <button className="btn btn-sm btn-outline-primary" onClick={handleAddMenu}>
                        Add to menu
                    </button>
                </div>
            </div>
        </li>
    )
}
