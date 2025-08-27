export default function getMaxId(arr) {
    let maxId = -1

    for (const item of arr) {
        if (item.id > maxId) {
            maxId = item.id
        }
    }

    return maxId
}
