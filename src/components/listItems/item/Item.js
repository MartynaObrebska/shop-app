import "./item.css";
import Counter from "../../counter/Counter";

const Item = (props) => {
  const {
    selectedCurrency,
    selectedProduct,
    currencies,
    handleAmountChange,
    handleAmountChangeClick,
    handleAddToBasketButton,
    handleRemoveFromBasketButton,
  } = props;
  const { title, image, price } = selectedProduct;

  return (
    <div className="item">
      <img alt={title} src={image}></img>
      <h3>{title}</h3>
      <Counter
        amount={selectedProduct.selected}
        price={price}
        selectedCurrency={selectedCurrency}
        currencies={currencies}
        selectedProduct={selectedProduct}
        handleAmountChange={handleAmountChange}
        handleAmountChangeClick={handleAmountChangeClick}
        handleAddToBasketButton={handleAddToBasketButton}
        handleRemoveFromBasketButton={handleRemoveFromBasketButton}
      />
    </div>
  );
};
export default Item;
