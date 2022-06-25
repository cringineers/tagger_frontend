import CardGrid from "./CardGrid";
import NavPages from "./NavPages";
import React, { useState, useEffect } from "react";

const imagesPerPage = 10;

function ImageGrid() {
  const [state, setState] = useState({ page: 0, data: [], max_page: 0 });

  useEffect(() => {
    fetch(
      process.env.REACT_APP_API_URL +
        "/images?" +
        new URLSearchParams({ page: 0, size: imagesPerPage }),
      {
        method: "GET",
        mode: "cors",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setState({
          page: 0,
          data: data.images,
          max_page: Math.ceil(data.count / imagesPerPage),
        });
      });
  }, []);

  return (
    <div className="album py-5 bg-light">
      <div className="container mx-auto" style={{ padding: "20px" }}>
        <CardGrid props={{ state: state, setState: setState }} />
      </div>
      <div style={{ padding: "20px" }}>
        <NavPages props={{ state: state, setState: setState }} />
      </div>
    </div>
  );
}

export default ImageGrid;
