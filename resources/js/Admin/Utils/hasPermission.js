import { usePage } from "@inertiajs/react"

export default function hasPermission(permission) {
    const { auth } = usePage().props
    const permissions = auth.permissions
    return permissions.includes(permission)
}
