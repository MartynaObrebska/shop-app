import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./addedProduct.css";
import Item from "../listItems/item/Item";

const AddedProduct = (props) => {
  if (props.popUpActive) {
    const {
      selectedCurrency,
      selectedProduct,
      currencies,
      amount,
      handleBasketProductAmountChange,
      handleCurrencySelect,
      handleBasketProductAmountChangeClick,
      handleAddedProductClose,
      handleShoppingBasketButton,
    } = props;

    return (
      <div className="addedProductPopUp">
        <div className="content">
          <div className="popUpHeader">
            <h2>Item added to shopping basket!</h2>
            <button className="close" onClick={handleAddedProductClose}>
              <FontAwesomeIcon icon="xmark" />
            </button>
          </div>
          <Item
            selectedCurrency={selectedCurrency}
            selectedProduct={selectedProduct}
            currencies={currencies}
            amount={amount}
            handleAmountChange={handleBasketProductAmountChange}
            handleCurrencySelect={handleCurrencySelect}
            handleAmountChangeClick={handleBasketProductAmountChangeClick}
          />
          <div className="buttons">
            <button onClick={handleAddedProductClose}>Add more products</button>
            <button
              className="shoppingBasket"
              onClick={handleShoppingBasketButton}
            >
              <FontAwesomeIcon icon="shopping-basket" />
              Go to shopping basket
            </button>
          </div>
        </div>
        <div
          className="background"
          onClick={props.handleAddedProductClose}
        ></div>
      </div>
    );
  }
};

export default AddedProduct;
