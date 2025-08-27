import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation } from "swiper/modules"

export default function Partner1({ data }) {
    const { section_title, partner_list, pagination_style } = data
    return (
        <div className="container">
            {section_title && (
                <>
                    <p
                        className="text-center cs_primary_color cs_fs_18 cs_medium mb-0"
                        dangerouslySetInnerHTML={{
                            __html: section_title
                        }}
                    />
                    <div className="cs_height_65 cs_height_lg_50" />
                </>
            )}

            <Swiper
                slidesPerView={2}
                spaceBetween={24}
                pagination={{
                    clickable: true
                }}
                speed={800}
                loop={true}
                modules={[Pagination, Navigation]}
                navigation={{
                    nextEl: ".cs_right_arrow",
                    prevEl: ".cs_left_arrow",
                    disabledClass: "swiper-button-disabled"
                }}
                className={`mySwiper${pagination_style === "pagination_0" || !pagination_style ? " cs_swiper_pagination_wrap_0" : ""}${
                    pagination_style === "pagination_1" ? " cs_swiper_pagination_wrap_1" : ""
                }${pagination_style === "pagination_2" ? " cs_swiper_pagination_wrap_2" : ""}${
                    pagination_style === "pagination_3" ? " cs_swiper_pagination_wrap_3" : ""
                }`}
                breakpoints={{
                    575: {
                        slidesPerView: 3,
                        spaceBetween: 24
                    },
                    991: {
                        slidesPerView: 4
                    },
                    1199: {
                        slidesPerView: 5
                    }
                }}
            >
                {partner_list?.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="cs_brand cs_style_1 text-center">
                            {item.partner_image_url && <img src={item.partner_image_url} alt="Brand" />}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
