const AddToBasketBtn = (props) => {
  if (props.selectedProduct.activeBasket) {
    return <p>Item already in the basket!</p>;
  }
  return (
    <button
      id="add"
      onClick={props.handleAddToBasketButton}
      disabled={props.amount ? false : true}
      className={props.amount ? "" : "disabled"}
    >
      Add
    </button>
  );
};

export default AddToBasketBtn;
