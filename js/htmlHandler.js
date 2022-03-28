import ProductsList from './data/mockupProducts';
import Product from './product';

const product = new Product;

class HtmlHandler {
    constructor() {
        this.cleanHTML();
        this.createHTMLCards();
        this.addTheListeners();
    }

    html = '';

    cleanHTML = () => {
        // Select all elements inside products-area
        const storeArea = document.querySelectorAll('#products-area > div');
        // Remove all elements from the storeArea
        storeArea.forEach((item) => item.remove());
    }

    createHTMLCards() {
        ProductsList.forEach(product => this.html += product.productCard());
        // Create a new div element after the header
        const headerArea = document.querySelector('#products-area > nav');
        headerArea.insertAdjacentHTML('afterend', this.html);
    }

    // Add a product to the cart
    addTheListeners() {
        const cartButton = document.querySelectorAll('.cart-button');

        cartButton.forEach((button) => {
            button.addEventListener('click', (e) => {
                const productId = e.target.parentElement.parentElement.getAttribute('key');
                console.log(`${productId} clicked`);
                // addToCart(productId);
            })
        })
    }

}

export default HtmlHandler;