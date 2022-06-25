import CardGrid from "./CardGrid";
import NavPages from "./NavPages";
import React, { useState, useEffect } from "react";
import requestAndSetImages from "../helpers/requestImages";

const imagesPerPage = 10;

function ImageGrid({ images, setImages, selectedTags, searchType }) {
  useEffect(() => {
    requestAndSetImages(images, setImages, [], 0, imagesPerPage, null);
  }, []);

  return (
    <div className="album py-5 bg-light">
      <div className="container mx-auto" style={{ padding: "20px" }}>
        <CardGrid props={{ state: images, setState: setImages }} />
      </div>
      <div style={{ padding: "20px" }}>
        <NavPages
          props={{
            state: images,
            setState: setImages,
            selectedTags,
            searchType,
          }}
        />
      </div>
    </div>
  );
}

export default ImageGrid;
