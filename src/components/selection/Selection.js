import "./selection.css";
import Options from "./options/Options";

const Selection = (props) => {
  const { items, labelTitle, value, handleOnChange } = props;
  return (
    <div className="selection">
      {labelTitle && <label>{labelTitle}</label>}
      <select value={value} onChange={handleOnChange}>
        {items.length > 1 && <Options items={items} />}
      </select>
    </div>
  );
};

export default Selection;
