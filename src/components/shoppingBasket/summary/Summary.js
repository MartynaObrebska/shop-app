import Counter from "../../counter/Counter";
import "./summary.css";

const Summary = (props) => {
  const {
    products,
    selectedCurrency,
    handleCurrencySelect,
    currencies,
    shoppingBasketActive,
  } = props;

  const prices = products.map((product) => product.price * product.selected);
  const total = [...prices].reduce((acc, val) => acc + val, 0);
  return (
    <h2 className="summary">
      <Counter
        shoppingBasketActive={shoppingBasketActive}
        amount="1"
        price={total}
        selectedCurrency={selectedCurrency}
        handleCurrencySelect={handleCurrencySelect}
        currencies={currencies}
        labelName="Total price:"
      />
    </h2>
  );
};

export default Summary;
