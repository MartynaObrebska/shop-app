import "./amount.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Amount = (props) => {
  const {
    amount,
    selectedProduct,
    handleAmountChange,
    handleAmountChangeClick,
  } = props;
  const minusValue = (Number(amount) - 1).toString();
  const plusValue = (Number(amount) + 1).toString();

  const handleDisabled = () => {
    if (selectedProduct.activeBasket) {
      return !selectedProduct.stored;
    }
    return selectedProduct.stored <= Number(amount);
  };

  return (
    <div className="amount">
      <button
        id="minus"
        value={minusValue}
        onClick={handleAmountChangeClick}
        disabled={!Number(amount)}
        className={!Number(amount) ? "disabled" : ""}
        data-selectedid={selectedProduct.id}
      >
        <FontAwesomeIcon icon="minus" value={minusValue} />
      </button>
      <input
        type="number"
        value={amount}
        onChange={handleAmountChange}
        data-productid={selectedProduct.id}
      />
      <button
        id="plus"
        value={plusValue}
        onClick={handleAmountChangeClick}
        disabled={handleDisabled()}
        className={handleDisabled() ? "disabled" : ""}
        data-selectedid={selectedProduct.id}
      >
        <FontAwesomeIcon icon="plus" value={plusValue} />
      </button>
    </div>
  );
};
export default Amount;
