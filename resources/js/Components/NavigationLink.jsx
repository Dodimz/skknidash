import { Link } from "@inertiajs/react"

export default function NavigationLink({ href, children, ...props }) {
    const baseUrl = window.location.origin
    const isInternalLink = href ? href.startsWith(baseUrl) : false
    return isInternalLink ? (
        <Link href={href} {...props}>
            {children}
        </Link>
    ) : (
        <a href={href} {...props}>
            {children}
        </a>
    )
}
