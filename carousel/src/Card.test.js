import { render, fireEvent } from "@testing-library/react";
import Card from "./Card";
import TEST_IMAGES from "./_testCommon.js";

const title = "Test Title";

// Card Component Signature: Card({caption, src, currNum, totalNum})

it("Smoke: displays card with appropriate meta", function() {
  const caption = "Test Caption";
  const src = "testImage.png";
  const currNum = 1;
  const totalNum = 2;

  render(<Card
    caption={ caption }
    src= { src }
    currNum = { currNum }
    totalNum={ totalNum }/>);
});

it("SnapShot: displays same card as last time", function() {

  const caption = "Test Caption";
  const src = "testImage.png";
  const currNum = 1;
  const totalNum = 2;

  const { container } = render(<Card
    caption={ caption }
    src= { src }
    currNum = { currNum }
    totalNum={ totalNum }/>);

  expect(container).toMatchSnapshot();
});