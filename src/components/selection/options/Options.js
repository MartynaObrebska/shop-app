const Options = (props) =>
  props.items.map((item) => (
    <option key={item.id} value={item.id}>
      {item.title}
    </option>
  ));

export default Options;
