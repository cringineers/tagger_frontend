import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import requestAndSetImages from "../helpers/requestImages";

export default function NavPages({ props }) {
  let onNextClicked = () => {
    let newPage = props.state.page + 1;
    if (newPage >= props.state.max_page) {
      return;
    }

    console.log(props);

    requestAndSetImages(
      props.state,
      props.setState,
      props.selectedTags,
      newPage,
      10,
      props.searchType
    );
    console.log(`Next clicked! New page is ${props.state.page + 1}`);
  };

  let onPrevClicked = () => {
    let newPage = props.state.page - 1;
    if (newPage < 0) {
      return;
    }

    requestAndSetImages(
      props.state,
      props.setState,
      props.selectedTags,
      newPage,
      10,
      props.searchType
    );

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
