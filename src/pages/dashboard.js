import { useState, useEffect } from "react";
import {
  successNotification,
  errorNotification,
} from "../components/notification";
import Header from "../components/header";
import ImageGrid from "../components/ImageGrid";
// axios
import axiosRequest from "../api";

const Dashboard = () => {
  const [allTags, setAllTags] = useState([]);
  const [searchType, setSearchType] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [images, setImages] = useState({ page: 0, data: [], max_page: 0 });

  // Load tags when dashboard loads
  useEffect(() => {
    const process_tags = (tags) => {
      return tags
        .map((item) =>
          item["tags"]
            .map((tag, index) => {
              if (!item["group"]["binary"] || index === 1)
                return {
                  value: tag["id"],
                  label: tag["name"],
                  groupId: item["group"]["id"],
                };
              else return {};
            })
            .filter((tag) => Object.keys(tag).length != 0)
        )
        .flat();
    };

    axiosRequest
      .get("/api/tag_groups")
      .then((res) => setAllTags(process_tags(res.data)))
      .catch(function (error) {
        errorNotification("Что-то пошло не так!");
        console.log(error.response);
      });
  }, []);

  return (
    <div className="dashboard-container">
      <Header
        allTags={allTags}
        images={images}
        setImages={setImages}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        searchType={searchType}
        setSearchType={setSearchType}
      />
      <ImageGrid
        images={images}
        setImages={setImages}
        selectedTags={selectedTags}
        searchType={searchType}
      />
    </div>
  );
};

export default Dashboard;
