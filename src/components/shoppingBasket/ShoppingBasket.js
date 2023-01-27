import "./shoppingBasket.css";
import ListItems from "../listItems/ListItems";
import Summary from "./summary/Summary";

const ShoppingBasket = (props) => {
  const {
    products,
    handleBasketProductAmountChange,
    currencies,
    selectedCurrency,
    handleCurrencySelect,
    handleBasketProductAmountChangeClick,
    shoppingBasketActive,
    handleRemoveFromBasketButton,
  } = props;
  const basketProducts = products.filter((product) => product.activeBasket);
  if (shoppingBasketActive) {
    return (
      <div className="shoppingBasket">
        <h2>Your shopping basket:</h2>
        <ListItems
          products={basketProducts}
          handleAmountChange={handleBasketProductAmountChange}
          handleAmountChangeClick={handleBasketProductAmountChangeClick}
          selectedCurrency={selectedCurrency}
          currencies={currencies}
          handleCurrencySelect={handleCurrencySelect}
          handleRemoveFromBasketButton={handleRemoveFromBasketButton}
        />
        {basketProducts.length > 0 && (
          <Summary
            shoppingBasketActive={shoppingBasketActive}
            products={basketProducts}
            selectedCurrency={selectedCurrency}
            handleCurrencySelect={handleCurrencySelect}
            currencies={currencies}
          />
        )}
      </div>
    );
  }
};

export default ShoppingBasket;
