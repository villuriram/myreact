import React, { Component } from 'react';
import {storeProducts,detailProduct} from './data';

const ProductContext = React.createContext();

//Provider

//Consumer

class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct:detailProduct,
        cart: []
    }

    componentDidMount() {
        this.setProducts();
    }

    setProducts = () => {
        let tempProducts = [];
        storeProducts.forEach(item =>{
            const singleItem = {...item};
            tempProducts = [...tempProducts, singleItem];
        });
        this.setState(()=>{
            return {products:tempProducts};
        });
    };

    getItem = (id) => {
        return this.state.products.find(item => id === item.id);
    };

    addToCart = (id) =>{
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;
        this.setState(
            () => {
            return {product:tempProducts,
            cart: [...this.state.cart, product]};
        },
            () => {console.log(this.state)}
        );
    };

    handleDetail = (id) =>{
        const product = this.getItem(id);
        this.setState(() => {
            return { detailProduct:product};
        });
    };

    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleDetail:this.handleDetail,
                addToCart:this.addToCart
            }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};