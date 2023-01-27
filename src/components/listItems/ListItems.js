import Item from "./item/Item";

const ListItems = (props) => {
  const items = props.products.map((product) => (
    <Item
      key={product.id}
      amount={product.selected}
      selectedCurrency={props.selectedCurrency}
      selectedProduct={product}
      handleCurrencySelect={props.handleCurrencySelect}
      currencies={props.currencies}
      handleAmountChange={props.handleAmountChange}
      handleAmountChangeClick={props.handleAmountChangeClick}
      handleRemoveFromBasketButton={props.handleRemoveFromBasketButton}
    />
  ));
  return items.length > 0 ? (
    <ul>{items}</ul>
  ) : (
    <p>Your shopping basket is empty.</p>
  );
};

export default ListItems;
