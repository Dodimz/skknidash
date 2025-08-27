export default function humanReadableSize(sizeBytes) {
    const units = ["bytes", "KB", "MB", "GB", "TB"]
    if (sizeBytes === 0) return "0 bytes"

    const index = Math.floor(Math.log(sizeBytes) / Math.log(1024))
    const size = sizeBytes / Math.pow(1024, index)

    return size.toFixed(2) + " " + units[index]
}
