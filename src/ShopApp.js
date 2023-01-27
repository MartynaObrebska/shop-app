import React from "react";
import Header from "./components/header/Header";
import Product from "./components/product/Product";
import AddedProduct from "./components/addedProduct/AddedProduct";
import ShoppingBasket from "./components/shoppingBasket/ShoppingBasket";
import fetchExchangeRates from "./utility/fetchEchangeRates";
import fetchProducts from "./utility/fetchProducts";
import Loader from "./components/Loader/Loader";

class ShopApp extends React.Component {
  state = {
    loading: true,
    amount: 1,
    currencies: [],
    products: [],
    categories: [],
    selectedProduct: {},
    selectedCategory: {},
    selectedCurrency: {},
    shoppingBasketActive: false,
    popUpActive: false,
  };

  static defaultProps = {
    currencies: [
      {
        id: 0,
        title: "PLN",
        rate: 1,
      },
      {
        id: 1,
        title: "EUR",
        rate: 0.22,
      },
      {
        id: 2,
        title: "USD",
        rate: 0.24,
      },
      {
        id: 3,
        title: "GBP",
        rate: 0.2,
      },
    ],
  };

  handleAmountChange = (e) => {
    this.setState({
      amount: e.target.value,
    });
  };

  handleBasketProductAmountChange = (e) => {
    const products = this.state.products;
    const basketProductToChange = products.find(
      (product) =>
        product.id === Number(e.target.getAttribute("data-selectedid"))
    );
    basketProductToChange.selected = Number(e.target.value);
    this.setState({
      ...this.state,
      products,
    });
  };

  // Selects

  handleCategorySelect = (e) => {
    this.setState({
      ...this.state,
      selectedCategory: this.state.categories[e.target.value],
      selectedProduct: this.state.products[0],
    });
  };

  handleProductSelect = (e) => {
    const selectedProduct = this.state.products.find(
      (product) => product.id === Number(e.target.value)
    );
    const amountCheck = () => {
      if (selectedProduct.stored) {
        return 1;
      } else return 0;
    };
    const amount = amountCheck();
    this.setState({
      ...this.state,
      selectedProduct,
      amount,
      shoppingBasketActive: false,
    });
  };

  handleCurrencySelect = (e) => {
    this.setState({
      ...this.state,
      selectedCurrency: this.state.currencies[e.target.value],
    });
  };

  // Buttons

  handleAmountChangeClick = (e) => {
    this.setState({
      ...this.state,
      amount: Number(e.currentTarget.value),
    });
  };

  handleBasketProductAmountChangeClick = (e) => {
    const products = this.state.products;
    const basketProductToChangeIndex = products.findIndex(
      (product) =>
        product.id === Number(e.currentTarget.getAttribute("data-selectedid"))
    );

    products[basketProductToChangeIndex].selected = Number(
      e.currentTarget.value
    );
    products[basketProductToChangeIndex].stored =
      e.currentTarget.getAttribute("id") === "plus"
        ? products[basketProductToChangeIndex].stored - 1
        : products[basketProductToChangeIndex].stored + 1;
    this.setState({
      ...this.state,
      products,
    });
  };

  handleAddToBasketButton = () => {
    const products = this.state.products;
    const productToChangeIndex = products.findIndex(
      (product) => product.id === this.state.selectedProduct.id
    );
    const productToChange = products[productToChangeIndex];
    const changedProduct = {
      ...productToChange,
      stored: productToChange.stored - this.state.amount,
      selected: Number(this.state.amount),
      activeBasket: true,
    };
    products[productToChangeIndex] = changedProduct;
    this.setState({
      ...this.state,
      products,
      popUpActive: true,
      selectedProduct: products.find(
        (product) => product.id === this.state.selectedProduct.id
      ),
    });
  };

  handleRemoveFromBasketButton = (e) => {
    const products = this.state.products;
    const basketProductToChangeIndex = products.findIndex(
      (product) =>
        product.id === Number(e.currentTarget.getAttribute("data-selectedid"))
    );
    const basketProductToChange = products[basketProductToChangeIndex];
    basketProductToChange.stored =
      basketProductToChange.stored + basketProductToChange.selected;
    basketProductToChange.selected = 0;
    basketProductToChange.activeBasket = false;
    this.setState({
      ...this.state,
      products,
    });
  };

  handleShoppingBasketButton = () => {
    this.setState({
      ...this.state,
      selectedCategory: this.state.categories[0],
      selectedProduct: this.state.products[0],
      shoppingBasketActive: true,
      popUpActive: false,
    });
  };

  handleAddedProductClose = () => {
    this.setState({
      ...this.state,
      popUpActive: false,
    });
  };

  handleStartPageClick = () => {
    this.setState({
      ...this.state,
      selectedCategory: this.state.categories[0],
      selectedProduct: this.state.products[0],
      shoppingBasketActive: false,
    });
  };

  componentDidMount = async () => {
    const exchangeRatesData = await fetchExchangeRates();
    const productsData = await fetchProducts();

    const rates = { PLN: 1, ...exchangeRatesData.rates };
    const currencies = Object.entries(rates).map((currencyInfo, index) => ({
      id: index,
      title: currencyInfo[0],
      rate: currencyInfo[1],
    }));
    const productsToMap = [{ title: "-", category: "all" }, ...productsData];
    const products = productsToMap.map((product, index) => ({
      id: index,
      category: product.category,
      title: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
      stored: Math.floor(Math.random() * 10) + 1,
      selected: 0,
      activeBasket: false,
    }));
    const categoriesNames = new Set([
      "all",
      ...productsData.map((product) => product.category),
    ]);
    const categories = [...categoriesNames].map((category, index) => ({
      id: index,
      title: category,
    }));

    this.setState({
      ...this.state,
      loading: false,
      products,
      currencies: currencies.length > 1 ? currencies : this.props.currencies,
      categories,
      selectedCurrency: currencies.length
        ? currencies[0]
        : this.props.currencies[0],
      selectedCategory: categories[0],
    });
  };

  render() {
    const {
      loading,
      selectedCurrency,
      amount,
      selectedProduct,
      currencies,
      products,
      categories,
      selectedCategory,
      shoppingBasketActive,
      popUpActive,
    } = this.state;
    const productsInCategory = () => {
      if (selectedCategory.title === "all") return products;
      else
        return [
          products[0],
          ...products.filter(
            (product) => product.category === selectedCategory.title
          ),
        ];
    };

    return (
      <>
        <div id="shop">
          <Header
            handleStartPageClick={this.handleStartPageClick}
            labelTitle1={"Category:"}
            value1={selectedCategory.id}
            handleOnChange1={this.handleCategorySelect}
            items1={categories}
            labelTitle2={"Product:"}
            value2={selectedProduct.id}
            handleOnChange2={this.handleProductSelect}
            items2={productsInCategory()}
            handleShoppingBasketButton={this.handleShoppingBasketButton}
          />
          {loading ? (
            <Loader />
          ) : (
            <Product
              selectedCurrency={selectedCurrency}
              selectedProduct={selectedProduct}
              currencies={currencies}
              amount={
                selectedProduct.activeBasket ? selectedProduct.selected : amount
              }
              handleAmountChange={
                selectedProduct.activeBasket
                  ? this.handleBasketProductAmountChange
                  : this.handleAmountChange
              }
              handleCurrencySelect={this.handleCurrencySelect}
              handleAmountChangeClick={
                selectedProduct.activeBasket
                  ? this.handleBasketProductAmountChangeClick
                  : this.handleAmountChangeClick
              }
              handleAddToBasketButton={this.handleAddToBasketButton}
              handleShoppingBasketButton={this.handleShoppingBasketButton}
            />
          )}
          <ShoppingBasket
            shoppingBasketActive={shoppingBasketActive}
            products={products}
            selectedCurrency={selectedCurrency}
            handleCurrencySelect={this.handleCurrencySelect}
            currencies={currencies}
            handleBasketProductAmountChange={
              this.handleBasketProductAmountChange
            }
            handleBasketProductAmountChangeClick={
              this.handleBasketProductAmountChangeClick
            }
            handleRemoveFromBasketButton={this.handleRemoveFromBasketButton}
          />
        </div>
        <AddedProduct
          selectedCurrency={selectedCurrency}
          selectedProduct={selectedProduct}
          currencies={currencies}
          amount={amount}
          handleBasketProductAmountChange={this.handleBasketProductAmountChange}
          handleCurrencySelect={this.handleCurrencySelect}
          handleBasketProductAmountChangeClick={
            this.handleBasketProductAmountChangeClick
          }
          popUpActive={popUpActive}
          handleShoppingBasketButton={this.handleShoppingBasketButton}
          handleAddedProductClose={this.handleAddedProductClose}
        />
      </>
    );
  }
}
export default ShopApp;
