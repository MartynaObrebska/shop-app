import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./loader.css";
const Loader = () => (
  <div className="loader">
    <FontAwesomeIcon icon="spinner" spin />
    <p>Loading...</p>
  </div>
);

export default Loader;
