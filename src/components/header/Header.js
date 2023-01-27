import "./header.css";
import Selection from "../selection/Selection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = (props) => {
  return (
    <div className="header">
      <h1 onClick={props.handleStartPageClick}>Shop App</h1>
      <div className="menu">
        <div className="selections">
          <Selection
            labelTitle={props.labelTitle1}
            value={props.value1}
            handleOnChange={props.handleOnChange1}
            items={props.items1}
          />
          <Selection
            labelTitle={props.labelTitle2}
            value={props.value2}
            handleOnChange={props.handleOnChange2}
            items={props.items2}
          />
        </div>
        <button
          className="shoppingBasketBtn"
          onClick={props.handleShoppingBasketButton}
        >
          <FontAwesomeIcon icon="shopping-basket" />
        </button>
      </div>
    </div>
  );
};

export default Header;
