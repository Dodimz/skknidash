import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import { CKEditor } from "@ckeditor/ckeditor5-react"

export default function Editor({ onChange, value = "" }) {
    function uploadAdapter(loader) {
        return {
            upload: () => {
                return new Promise((resolve, reject) => {
                    const body = new FormData()
                    loader.file.then((file) => {
                        body.append("files", file)
                        axios
                            .post(route("admin.editor.image.upload"), body)
                            .then((res) => {
                                resolve({
                                    default: res.data
                                })
                            })
                            .catch((err) => {
                                reject(err)
                            })
                    })
                })
            }
        }
    }
    function uploadPlugin(editor) {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
            return uploadAdapter(loader)
        }
    }

    const editorConfiguration = {
        // Other configuration options...
        extraPlugins: [uploadPlugin]
    }
    return (
        <CKEditor
            editor={ClassicEditor}
            config={editorConfiguration}
            data={value}
            onChange={(event, editor) => {
                const data = editor.getData()
                onChange(data)
            }}
        />
    )
}
