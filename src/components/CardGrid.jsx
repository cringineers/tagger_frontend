import FileCard from "./FileCard";
import Row from "react-bootstrap/Row";

export default function FileGrid({ props }) {
  return (
    <Row xs={1} md={4} className="g-4">
      {props.state.data.map(function (item) {
        return (
          <FileCard
            key={item.id}
            name={item.name}
            tags={item.tags}
            style={{ padding: "10px" }}
          />
        );
      })}
    </Row>
  );
}
