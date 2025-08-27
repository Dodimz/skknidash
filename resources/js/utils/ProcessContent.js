export default function ProcessContent(html) {
    const div = document.createElement('div');
    div.innerHTML = html; // Directly set the raw HTML

    // Find all <oembed> tags and replace them with <iframe>
    const embeds = div.querySelectorAll('oembed');
    embeds.forEach((embed) => {
        const url = embed.getAttribute('url') || embed.getAttribute('src'); // Extract URL
        if (url) {
            const iframe = document.createElement('iframe');
            iframe.setAttribute('src', url);
            iframe.setAttribute('width', '100%');
            iframe.setAttribute('height', '400');
            iframe.setAttribute('frameBorder', '0');
            iframe.setAttribute(
                'allow',
                'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            );
            iframe.setAttribute('allowFullScreen', true);
            embed.parentNode.replaceChild(iframe, embed); // Replace <oembed> with <iframe>
        }
    });

    return div.innerHTML; // Return the processed HTML
}
