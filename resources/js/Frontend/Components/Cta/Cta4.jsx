import Button from "../Button"

export default function Cta4({ data }) {
    const { title, action_text, action_url } = data
    return (
        <div className="container">
            <div className="cs_cta cs_style_4 text-center">
                {title && (
                    <h2
                        className="cs_cta_title cs_white_color cs_fs_120"
                        dangerouslySetInnerHTML={{
                            __html: title
                        }}
                    />
                )}
                {(action_url || action_text) && <Button href={action_url} btnText={action_text} btnClass="cs_btn cs_style_1 cs_type_4 cs_fs_18" />}
            </div>
        </div>
    )
}
