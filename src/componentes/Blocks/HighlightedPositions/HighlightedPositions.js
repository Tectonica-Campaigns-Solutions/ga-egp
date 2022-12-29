import React from "react";
import CardPosition from "../../Global/CardPosition/CardPosition";
import { isArray } from "../../../utils";
import EGPSlider from "../../Global/EGPSlider/EGPSlider";

import "./index.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function HighlightedPositions({ block }) {
  console.log(block);

  return (
    <div className="highlighted-positions">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <h3>{block.pretitle}</h3>
            <h2>{block.title}</h2>
            <div
              className="description"
              dangerouslySetInnerHTML={{ __html: block.description }}
            />
          </div>

          {isArray(block.positions) && (
            <div className="col-lg-8">
              <div className="row h-100">
                <EGPSlider>
                  {block.positions.map((item) => (
                    <CardPosition position={item} />
                  ))}
                  {block.positions.map((item) => (
                    <CardPosition position={item} />
                  ))}
                  {block.positions.map((item) => (
                    <CardPosition position={item} />
                  ))}
                  {block.positions.map((item) => (
                    <CardPosition position={item} />
                  ))}
                  {block.positions.map((item) => (
                    <CardPosition position={item} />
                  ))}
                </EGPSlider>
              </div>
            </div>
          )}

          {/* Testing */}
          <div>
            <h1>Testing new lib</h1>

            <div>
              <Swiper
                pagination={{
                  type: "fraction",
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
              >
                <SwiperSlide>Slide 1</SwiperSlide>
                <SwiperSlide>Slide 2</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
                <SwiperSlide>Slide 5</SwiperSlide>
                <SwiperSlide>Slide 6</SwiperSlide>
                <SwiperSlide>Slide 7</SwiperSlide>
                <SwiperSlide>Slide 8</SwiperSlide>
                <SwiperSlide>Slide 9</SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HighlightedPositions;
