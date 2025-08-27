export default function BioneMeta(title, meta_title, meta_tags, meta_description, og_image, site_title) {
    document.title = title

    const metaKeywords = document.querySelector("meta[name='keywords']")
    if (metaKeywords) metaKeywords.content = meta_tags ?? ""

    const canonicalLink = document.querySelector("link[rel='canonical']")
    if (canonicalLink) canonicalLink.href = window.location.href

    const ogSiteName = document.querySelector("meta[property='og:site_name']")
    if (ogSiteName) ogSiteName.content = site_title ?? ""

    const ogImage = document.querySelector("meta[property='og:image']")
    if (ogImage) ogImage.content = og_image ?? ""

    const twitterTitle = document.querySelector("meta[name='twitter:title']")
    if (twitterTitle) twitterTitle.content = meta_title ?? ""

    const twitterDescription = document.querySelector("meta[name='twitter:description']")
    if (twitterDescription) twitterDescription.content = meta_description ?? ""

    const twitterImage = document.querySelector("meta[name='twitter:image']")
    if (twitterImage) twitterImage.content = og_image ?? ""
}
