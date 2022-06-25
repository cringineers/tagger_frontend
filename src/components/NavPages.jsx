import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

export default function NavPages({ props }) {
  let onNextClicked = () => {
    let newPage = props.state.page + 1;
    if (newPage >= props.state.max_page) {
      return;
    }
    fetch(
      process.env.REACT_APP_API_URL +
        "/images?" +
        new URLSearchParams({ page: newPage, size: 10 }),
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
        props.setState({
          page: newPage,
          data: data.images,
          max_page: props.state.max_page,
        });
      });

    console.log(`Next clicked! New page is ${props.state.page + 1}`);
  };

  let onPrevClicked = () => {
    let newPage = props.state.page - 1;
    if (newPage < 0) {
      return;
    }

    fetch(
      process.env.REACT_APP_API_URL +
        "/images?" +
        new URLSearchParams({ page: newPage, size: 10 }),
      {
        method: "GET",
        mode: "cors",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        props.setState({
          page: newPage,
          data: data.images,
          max_page: props.state.max_page,
        });
      });

    console.log(`Prev clicked! New page is ${newPage}`);
  };

  return (
    <ButtonGroup aria-label="Basic example">
      <Button onClick={onPrevClicked} variant="dark">
        Назад
      </Button>
      <Button onClick={onNextClicked} variant="dark">
        Вперёд
      </Button>
    </ButtonGroup>
  );
}
