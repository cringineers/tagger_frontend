import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { successNotification, errorNotification } from "../helpers/notification";
// react-select imports
import Select from "react-select";
import makeAnimated from "react-select/animated";
import requestAndSetImages from "../helpers/requestImages";

const animatedComponents = makeAnimated();

const Header = ({
  allTags,
  images,
  setImages,
  selectedTags,
  setSelectedTags,
  searchType,
  setSearchType,
}) => {
  const [selectableTags, setSelectableTags] = useState([]);

  // Load data on tag selector change
  useEffect(() => {
    // Make all tags selectable and return if no tags selected
    if (selectedTags.length === 0) {
      setSelectableTags(allTags);
      return;
    }

    // Disable tags from the same group
    if (searchType == 'all') {
      let tagMask = new Array(allTags.length).fill(true);
      selectedTags.forEach((selectedTag) => {
        tagMask = allTags.map(
          (tag, index) =>
            (tag.groupId != selectedTag.groupId ||
              tag.value === selectedTag.value) &&
            tagMask[index]
        );
      });
      setSelectableTags(allTags.filter((item, i) => tagMask[i]));
    }

    requestAndSetImages(images, setImages, selectedTags, 0, 10, searchType);
  }, [allTags, selectedTags, searchType]);

  const handleLogout = (e) => {};

  return (
    <div className="header">
      <a href="#" className="header-logo">
        <img src="logo.svg" alt="brand" />
      </a>

      <div className="header-search-type-selector">
        <Select
          defaultValue={{ value: "any", label: "Или" }}
          options={[
            { value: "any", label: "Или" },
            { value: "all", label: "И" },
          ]}
          onChange={setSearchType}
        />
      </div>

      <div className="header-tag-selector">
        <Select
          placeholder="Выберите тег"
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={selectableTags}
          onChange={setSelectedTags}
        />
      </div>

      <div className="header-logout">
        <Button
          type="submit"
          variant="contained"
          size="small"
          color="primary"
          onClick={handleLogout}
        >
          Выйти
        </Button>
      </div>
    </div>
  );
};

export default Header;
