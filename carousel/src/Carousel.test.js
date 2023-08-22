import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

const title = "Test Title";

/************* Basic Tests **************/

it("Smoke: displays initial card in carousel", function() {
  render(<Carousel photos={ TEST_IMAGES } title={ title } />);
});

it("SnapShot: displays same card as last time", function() {
  const { container } = render(
    <Carousel photos={ TEST_IMAGES } title={ title } />);
  expect(container).toMatchSnapshot();
});

it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect( // TODO: we should store these selectors as constants; this avoids typo fragility
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});

/************ End Basic Tests ************/

/********** Finite Carousel Tests ***********/

it("left arrow doesn't show on first image", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('bi-arrow-left-circle')
  ).not.toBeInTheDocument();
});

it("right arrow doesn't show on last image", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

   // move forward in the carousel to last image
   const rightArrow = container.querySelector(".bi-arrow-right-circle");
   fireEvent.click(rightArrow);
   fireEvent.click(rightArrow);

  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 3"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('bi-arrow-right-circle')
  ).not.toBeInTheDocument();
});

it("works when you click on the left arrow on 2nd image", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();

  // move backwards in the carousel
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the third
  expect(
    container.querySelector('img[alt="testing image 3"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
});

/*********** End Finite Carousel Tests ************/

/*********** Infinite Carousel Tests **************

it("works when you click on the right arrow on the last image", function() {
  // we want to test that when on the last image, clicking right
  // goes to the first image
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  // move forward in the carousel three times (back to first image)
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  // test to make sure the current image is image 1
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();

});

it("works when you click on the left arrow at first image (back to last)", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move back in the carousel
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 3"]')
  ).toBeInTheDocument();
});


*********** End Infinite Carousel Tests ************/
