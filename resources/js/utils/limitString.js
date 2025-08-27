export default function limitString(inputString, limit) {
    if (inputString.length <= limit) {
        return inputString;
    } else {
        return inputString.substring(0, limit - 3) + "...";
    }
}
