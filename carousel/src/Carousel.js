import { useState } from "react";
import "./Carousel.css";
import Card from "./Card";


/** Carousel: displays images and arrows to navigate through them
 *
 * Props:
 * - photos: array of {src, caption} objects
 * - title: string describing the collection of images
 *
 * State:
 * - currCardIdx: integer for current card index
 *
 * App --> Carousel --> Card
 */
 function Carousel({ photos, title }) {
  const [currCardIdx, setCurrCardIdx] = useState(0);

  const currCard = photos[currCardIdx];
  const total = photos.length;

  //Increments currCardIdx state by 1
  function goForward() {
    setCurrCardIdx(currCardIdx + 1)
    // logic for infinite carousel
    // Increments currCardIdx state by 1 until reaches end, then returns to 0
    // if (currCardIdx < photos.length - 1) {
    //   setCurrCardIdx(currCardIdx + 1);
    // } else {
    //   setCurrCardIdx(0);
    // }
  }

  //Decrements currCardIdx state by 1
  function goBackward() {
    setCurrCardIdx(currCardIdx - 1)

    // logic for infinite carousel
    // Decrements currCardIdx state by 1 until reaches start, then returns to 0
    // if (currCardIdx === 0) {
    //   setCurrCardIdx(photos.length - 1);
    // } else {
    //   setCurrCardIdx(currCardIdx - 1);
    // }
  }

  return (
    <div className="Carousel">
      <h1>{title}</h1>
      <div className="Carousel-main">
        { currCardIdx === 0 ? null : <i
          className="bi bi-arrow-left-circle"
          onClick={goBackward} //
        /> }
        <Card
          caption={currCard.caption}
          src={currCard.src}
          currNum={currCardIdx + 1}
          totalNum={total}
        />
        { currCardIdx === photos.length - 1 ? null : <i
          className="bi bi-arrow-right-circle"
          onClick={goForward}
        /> }
      </div>
    </div>
  );
}

export default Carousel;
