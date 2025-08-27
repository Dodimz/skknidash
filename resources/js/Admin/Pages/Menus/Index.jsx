import AdminLayouts from "@/Admin/Layouts/AdminLayouts"
import { Head, router } from "@inertiajs/react"
import "./style.scss"
import AccordionMenu from "@/Admin/Components/AccordionMenu/Index"
import MenuItem from "@/Admin/Pages/Menus/Components/MenuItem"
import { useEffect, useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { produce } from "immer"
import getMaxId from "@/Admin/Utils/getMaxId"
import { cloneDeep } from "lodash"

export default function Index({ edit_action, menu_list, lang }) {
    const languages = lang.languages ?? {}

    const [selectedLang, setSelectedLang] = useState(lang.default_lang)
    const [tempLang, setTempLang] = useState(selectedLang)

    const [isBulkSelect, setIsBulkSelect] = useState(false)
    const [bulkSelectedItems, setBulkSelectedItems] = useState([])
    const [selectedDisplayLocation, setSelectedDisplayLocation] = useState([])
    const [filteredMenu, setFilteredMenu] = useState(edit_action)
    const [menus, setMenus] = useState(menu_list)

    function addLevels(menus, parent_id = null, level = 0) {
        const updatedMenus = []

        for (const menu of menus) {
            if (menu.parent_id === parent_id) {
                const updatedMenu = { ...menu, level }
                updatedMenus.push(updatedMenu)
                updatedMenus.push(...addLevels(menus, menu.id, level + 1))
            }
        }

        const levelWithName = updatedMenus.map((item, index) => {
            if (item.parent_id === null) {
                if (index !== -1 && 0 !== -1) {
                    for (let i = index - 1; i >= 0; i--) {
                        const currentItem = updatedMenus[i]
                        if (currentItem.parent_id === null) {
                            return { ...item, prevMenuName: currentItem.name, prevId: currentItem.id, parentMenuName: null }
                        }
                    }
                }
            }
            let prevItem = null

            if (index > 0) {
                prevItem = updatedMenus[index - 1]
            }

            let prevMenuName = null
            let prevId = null

            if (prevItem) {
                if (item.parent_id === prevItem.parent_id) {
                    prevMenuName = prevItem.name
                    prevId = prevItem.id
                } else {
                    const prevParent = updatedMenus.find((m) => m.id === prevItem.parent_id)
                    if (prevParent) {
                        prevMenuName = prevParent.name
                        prevId = prevParent.id
                    }
                }
            }

            const parentMenuName = item.parent_id ? menus.find((p) => p.id === item.parent_id)?.name : null

            return { ...item, prevMenuName, prevId, parentMenuName }
        })

        return levelWithName
    }

    const handleDragEnd = (result) => {
        if (!result.destination) return
        const updatedMenus = Array.from(menus[selectedLang])
        const [reorderedItem] = updatedMenus.splice(result.source.index, 1)
        updatedMenus.splice(result.destination.index, 0, reorderedItem)
        const addedLevelsMenus = { ...menus, [selectedLang]: addLevels(updatedMenus) }
        setMenus(addedLevelsMenus)
    }

    // outParent
    const outParent = (id) => {
        const menu = menus[selectedLang].find((menu) => menu.id === id)
        const parentMenu = menus[selectedLang].find((p) => p.id === menu.parent_id)
        let menuCopy = cloneDeep(menus)
        const updatedMenuIndex = menus[selectedLang].findIndex((item) => item.id === id)
        if (parentMenu && parentMenu.parent_id) {
            menuCopy[selectedLang][updatedMenuIndex].parent_id = parentMenu.parent_id
        } else {
            menuCopy[selectedLang][updatedMenuIndex].parent_id = null
        }
        const addedLevelsMenus = { ...menuCopy, [selectedLang]: addLevels(menuCopy[selectedLang]) }
        setMenus(addedLevelsMenus)
    }

    // underParent
    const underParent = (id) => {
        const menu = menus[selectedLang].find((menu) => menu.id === id)
        const updatedMenuIndex = menus[selectedLang].findIndex((item) => item.id === id)
        let menuCopy = cloneDeep(menus)
        menuCopy[selectedLang][updatedMenuIndex].parent_id = menu.prevId
        const addedLevelsMenus = { ...menuCopy, [selectedLang]: addLevels(menuCopy[selectedLang]) }
        setMenus(addedLevelsMenus)
    }

    // handle bulk selected items
    const handleBulkSelectedItem = (itemId) => {
        let itemsCopy = [...bulkSelectedItems]
        const isExists = itemsCopy.some((item) => item === itemId)
        if (isExists) {
            itemsCopy = itemsCopy.filter((f) => f !== itemId)
        } else {
            itemsCopy.push(itemId)
        }
        setBulkSelectedItems(itemsCopy)
    }

    // handle remove menu
    const handleRemoveMenu = (deletedItems = []) => {
        if (window.confirm("Do you really want to remove selected menu")) {
            const selectedItems = Array.isArray(deletedItems) ? deletedItems : bulkSelectedItems

            const menuCopied = produce(menus[selectedLang], (draft) => {
                selectedItems.forEach((itemId) => {
                    const subMenu = draft.filter((m) => m.parent_id === itemId)
                    const removedMenu = draft.find((rm) => rm.id === itemId)
                    const removedMenuIndex = draft.findIndex((rm) => rm.id === itemId)

                    if (removedMenu) {
                        const parentMenuId = removedMenu.parent_id
                        draft.splice(removedMenuIndex, 1)
                        subMenu.forEach((s) => {
                            const updatedIndex = draft.findIndex((i) => i.id === s.id)
                            draft[updatedIndex].parent_id = parentMenuId
                        })
                    }
                })
            })

            setBulkSelectedItems([])
            setIsBulkSelect(false)
            const addedLevelsMenus = { ...menus, [selectedLang]: addLevels(menuCopied) }
            setMenus(addedLevelsMenus)
        }
    }

    // handle update label
    const updateLabel = (menuId, value) => {
        const updatedIndex = menus[selectedLang].findIndex((item) => item.id === menuId)
        let copiedMenu = cloneDeep(menus)
        copiedMenu[selectedLang][updatedIndex].name = value
        const addedLevelsMenus = { ...copiedMenu, [selectedLang]: addLevels(copiedMenu[selectedLang]) }
        setMenus(addedLevelsMenus)
    }

    // handle add menu to list
    const handleAddMenu = (addedMenus) => {
        const maxId = getMaxId(menus[selectedLang])
        let menuCopied = cloneDeep(menus)
        let id = maxId + 1
        addedMenus.forEach((item) => {
            menuCopied[selectedLang].push({ ...item, id, parent_id: null, prevMenuName: null, prevId: null, originalName: item.name })
            id += 1
        })
        const addedLevelsMenus = { ...menuCopied, [selectedLang]: addLevels(menuCopied[selectedLang]) }
        setMenus(addedLevelsMenus)
    }

    // handle select display location
    const handleDisplayLocation = (locationName) => {
        const exits = selectedDisplayLocation.some((item) => item === locationName)
        if (exits) {
            const filteredLocation = selectedDisplayLocation.filter((f) => f !== locationName)
            setSelectedDisplayLocation(filteredLocation)
        } else {
            setSelectedDisplayLocation(
                produce((draft) => {
                    draft.push(locationName)
                })
            )
        }
    }

    // handle save menu
    const handleSaveMenu = () => {
        router.post(route("admin.menus.store"), { display_location: selectedDisplayLocation, menus })
    }

    // handle menu to edit
    const handleSetMenuToEdit = (e) => {
        e.preventDefault()
        router.get(route("admin.menus.index", { edit_action: filteredMenu }))
    }

    useEffect(() => {
        setSelectedDisplayLocation(
            produce((draft) => {
                draft.push(edit_action)
            })
        )
    }, [edit_action])

    useEffect(() => {
        setSelectedLang(tempLang)
        setBulkSelectedItems([])
    }, [tempLang])

    return (
        <AdminLayouts>
            <Head title="Menus" />
            <div className="yoo-height-b30 yoo-height-lg-b30" />
            <div className="container-fluid">
                <div className="yoo-uikits-heading">
                    <h2 className="yoo-uikits-title">Menus</h2>
                </div>
                <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                <div className="manage-menus">
                    <form onSubmit={handleSetMenuToEdit}>
                        <label htmlFor="filtered_menu" className="mr-2">
                            Select a menu to edit:{" "}
                        </label>
                        <select id="filtered_menu" value={filteredMenu} className="mr-2" onChange={(e) => setFilteredMenu(e.target.value)} required>
                            <option value="">Select a menu</option>
                            <option value="main_menu">Main Menu</option>
                            <option value="footer_menu">Footer Menu</option>
                            <option value="services_menu">Services Menu</option>
                            <option value="resources_menu">Resources Menu</option>
                            <option value="useful_links">Useful Links</option>
                        </select>
                        <button className="btn btn-sm btn-secondary mr-2">Select</button>
                        <span>Do not forgot to save your changes!</span>
                    </form>
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        {Object.entries(languages).map(([code, language]) => (
                            <li className="nav-item" key={code}>
                                <button
                                    type="button"
                                    onClick={() => setTempLang(code)}
                                    className={`nav-link ${selectedLang === code && "active"}`}
                                    style={{ outline: "none" }}
                                >
                                    {language.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="row mt-5">
                    <div className="col-md-3">
                        <AccordionMenu addMenu={handleAddMenu} selectedLang={selectedLang} />
                    </div>
                    <div className="col-md-9">
                        <div className="menu-structure">
                            <h2>Menu structure</h2>
                            <div className="card">
                                <div className="card-header">
                                    <label htmlFor="" className="mr-3">
                                        Menu Name
                                    </label>
                                    <input
                                        type="text"
                                        value={
                                            edit_action === "main_menu"
                                                ? "Main Menu"
                                                : edit_action === "services_menu"
                                                ? "Services menu"
                                                : "Footer Menu"
                                        }
                                        disabled
                                    />
                                </div>
                                <div className="card-body">
                                    <div className="drag-instructions">
                                        <p>
                                            Drag the items into the order you prefer. Click the arrow on the right of the item to reveal additional
                                            configuration options.
                                        </p>
                                    </div>
                                    <div className="bulk-actions">
                                        <label className="bulk-select-button" htmlFor="bulk-select-switcher-top">
                                            <input
                                                type="checkbox"
                                                name="bulk-select-switcher-top"
                                                id="bulk-select-switcher-top"
                                                onChange={() => setIsBulkSelect(!isBulkSelect)}
                                                checked={isBulkSelect}
                                            />
                                            <span className="bulk-select-button-label">Bulk Select</span>
                                        </label>
                                    </div>
                                    <div className="menu-items">
                                        <DragDropContext onDragEnd={handleDragEnd}>
                                            <Droppable droppableId="menu-list">
                                                {(provided) => (
                                                    <ul className="menu-item-wrap" {...provided.droppableProps} ref={provided.innerRef}>
                                                        {menus[selectedLang].map((menu, index) => (
                                                            <Draggable key={index} draggableId={index.toString()} index={index}>
                                                                {(provided) => (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                    >
                                                                        <MenuItem
                                                                            key={index}
                                                                            index={index}
                                                                            outParent={outParent}
                                                                            underParent={underParent}
                                                                            handleBulkSelectedItem={handleBulkSelectedItem}
                                                                            menu={menu}
                                                                            updateLabel={updateLabel}
                                                                            removeMenu={(id) => handleRemoveMenu([id])}
                                                                            isBulkSelect={isBulkSelect}
                                                                        />
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                        {provided.placeholder}
                                                    </ul>
                                                )}
                                            </Droppable>
                                        </DragDropContext>
                                    </div>
                                    <div className="bulk-actions mt-4 d-flex align-items-center mb-3">
                                        <label className="bulk-select-button" htmlFor="bulk-select-switcher-bottom">
                                            <input
                                                type="checkbox"
                                                name="bulk-select-switcher-bottom"
                                                id="bulk-select-switcher-bottom"
                                                onChange={() => setIsBulkSelect(!isBulkSelect)}
                                                checked={isBulkSelect}
                                            />
                                            <span className="bulk-select-button-label">Bulk Select</span>
                                        </label>
                                        {bulkSelectedItems.length ? (
                                            <span onClick={handleRemoveMenu} className="text-danger" style={{ cursor: "pointer" }}>
                                                Remove Selected Items
                                            </span>
                                        ) : null}
                                    </div>
                                    <hr />
                                    <h2 className="mt-3">Menu Settings</h2>
                                    <div className="row">
                                        <div className="col-md-2">
                                            <p>Display location</p>
                                        </div>
                                        <div className="col-md-10">
                                            <div>
                                                <input
                                                    type="checkbox"
                                                    id="main-menu"
                                                    checked={selectedDisplayLocation.some((item) => item === "main_menu")}
                                                    onChange={() => handleDisplayLocation("main_menu")}
                                                    className="mr-2"
                                                />
                                                <label htmlFor="main-menu">Main Menu</label>
                                            </div>
                                            <div>
                                                <input
                                                    type="checkbox"
                                                    id="services-menu"
                                                    checked={selectedDisplayLocation.some((item) => item === "services_menu")}
                                                    onChange={() => handleDisplayLocation("services_menu")}
                                                    className="mr-2"
                                                />
                                                <label htmlFor="services-menu">Services Menu</label>
                                            </div>
                                            <div>
                                                <input
                                                    type="checkbox"
                                                    id="footer-menu"
                                                    checked={selectedDisplayLocation.some((item) => item === "footer_menu")}
                                                    onChange={() => handleDisplayLocation("footer_menu")}
                                                    className="mr-2"
                                                />
                                                <label htmlFor="footer-menu">Footer Menu</label>
                                            </div>
                                            <div>
                                                <input
                                                    type="checkbox"
                                                    id="footer-menu"
                                                    checked={selectedDisplayLocation.some((item) => item === "resources_menu")}
                                                    onChange={() => handleDisplayLocation("resources_menu")}
                                                    className="mr-2"
                                                />
                                                <label htmlFor="footer-menu">Resources Menu</label>
                                            </div>
                                            <div>
                                                <input
                                                    type="checkbox"
                                                    id="footer-menu"
                                                    checked={selectedDisplayLocation.some((item) => item === "useful_links")}
                                                    onChange={() => handleDisplayLocation("useful_links")}
                                                    className="mr-2"
                                                />
                                                <label htmlFor="footer-menu">Useful Links</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer d-flex justify-content-between align-items-center">
                                    <a href="" className="text-danger"></a>
                                    <button className="btn btn-sm btn-primary" onClick={handleSaveMenu}>
                                        Save Menu
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="yoo-height-b30 yoo-height-lg-b30" />
            </div>
        </AdminLayouts>
    )
}
