import { showAlert } from "@/Admin/Utils/SweetAlert"
import translate from "@/utils/translate"
import { Icon } from "@iconify/react"
import { Link, router, usePage } from "@inertiajs/react"

export default function Sidebar() {
    // handle logout
    const handleLogout = () => {
        showAlert(`${translate("Are you sure")}?`, `${translate("You want to logout this session")}?`, `${translate("Logout")}!`, () => {
            router.post(route("logout"))
        })
    }

    return (
        <div className="cs_dashboard_left">
            <ul className="cs_dashboard_nav cs_mp0 cs_radius_5 cs_primary_color">
                <li className={route().current("user.dashboard") ? "active" : ""}>
                    <Link href={route("user.dashboard")}>
                        <Icon icon="fa6-solid:house" /> {translate("Dashboard")}
                    </Link>
                </li>
                <li className={route().current("user.orders") ? "active" : ""}>
                    <Link href={route("user.orders")}>
                        <Icon icon="fa6-solid:file-pen" /> {translate("My Orders")}
                    </Link>
                </li>
                <li className={route().current("user.review.index") ? "active" : ""}>
                    <Link href={route("user.review.index")}>
                        <Icon icon="fa6-solid:star" /> {translate("Reviews")}
                    </Link>
                </li>
                <li className={route().current("user.tickets.create") ? "active" : ""}>
                    <Link href={route("user.tickets.create")}>
                        <Icon icon="fa6-solid:headphones" /> {translate("Open Ticket")}
                    </Link>
                </li>
                <li className={route().current("user.tickets.index") ? "active" : ""}>
                    <Link href={route("user.tickets.index")}>
                        <Icon icon="fa6-solid:ticket" /> {translate("Support Ticket")}
                    </Link>
                </li>
                <li className={route().current("user.profile.edit") ? "active" : ""}>
                    <Link href={route("user.profile.edit")}>
                        <Icon icon="fa6-solid:gear" /> {translate("Profile Settings")}
                    </Link>
                </li>
                <li className={route().current("user.profile.change.password") ? "active" : ""}>
                    <Link href={route("user.profile.change.password")}>
                        <Icon icon="fa6-solid:lock" /> {translate("Change Password")}
                    </Link>
                </li>
                <li>
                    <a href="#" onClick={handleLogout}>
                        <Icon icon="fa6-solid:arrow-right-from-bracket" /> {translate("Logout")}
                    </a>
                </li>
            </ul>
        </div>
    )
}
