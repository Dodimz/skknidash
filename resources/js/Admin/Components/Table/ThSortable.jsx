import { IonIcon } from "@ionic/react";
import { arrowUp, arrowDown } from "ionicons/icons";

export default function ThSortable({ children, sort, onSorted, width, column }) {
    const changeSorting = () => {
        if (sort.column === column) {
            sort.order = sort.order === "asc" ? "desc" : "asc";
        } else {
            sort.column = column;
            sort.order = "asc";
        }
        onSorted();
    };

    return (
        <th className="cursor-pointer" onClick={changeSorting} style={{cursor: "pointer", width: width}}>
            {children}
            {sort.column === column && (
                <IonIcon
                    icon={sort.order === "asc" ? arrowUp : arrowDown}
                />
            )}
        </th>
    );
}
