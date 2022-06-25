import axios from "axios";

export default function requestAndSetImages(
  images,
  setImages,
  tags,
  page,
  size,
  searchType
) {
  let apiPath = "";

  if (tags.length == 0) {
    apiPath = "/api/images";
  } else {
    const tagstring = tags.map((item) => `tags=${item.value}`).join("&");
    apiPath = `/api/images/search?${tagstring}`;
  }

  let params = {
    page: page,
    size: size,
  };

  if (searchType !== null) {
    params.type = searchType;
  }

  axios
    .get(apiPath, {
      params: params,
    })
    .then((res) => {
      console.log(res);
      setImages({
        page: page,
        data: res.data.images,
        max_page: Math.ceil(res.data.count / size),
      });
    })
    .catch(function (error) {
      console.log(error);
      errorNotification("Что-то пошло не так!");
    });
}
