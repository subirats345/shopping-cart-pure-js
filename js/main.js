import '../style.css'
import ProducstList from './data/mockupProducts';
import HtmlHandler from './htmlHandler';
import Product from './product';

// 1 - Clean and generate the HTML
const htmlHandler = new HtmlHandler;
const product = new Product;  
let modalHtml = '';

// 2 -  Check the local storage for cart persistence.
const localStorageCart = localStorage.getItem('cart');
const fromDomStringToArray = (domString) => domString.split(',').map((e) => Number(e));
let cart = localStorageCart != null ? fromDomStringToArray(localStorageCart) : new Array();
console.log('The cart on init ' + cart);

const addToCart = (id) => {
  if (cart.includes(id)) {
    console.log('Product already in the cart');
    return;
  } else {
    cart.push(id);
    console.log(`New product added. The cart is: ${cart}`)
    console.log('Cart updated on local storage')
    localStorage.setItem('cart', cart);
    createHtmlModalCards(cart);
  }
}


// Cart Modal

const cartNavButton = document.querySelector('#cart');
const cartModal = document.querySelector('#cart-modal');
const cartBadgeIndicator = document.querySelector('#cart-number-badge');

cartNavButton.addEventListener('click', cartToggle);

// createHtmlModalCards(cart);

function cartToggle() {
  if (cartModal.classList.contains('hidden')) {
    cartModal.classList.remove('hidden');
  } else {
    cartModal.classList.add('hidden');
  }
}

function createHtmlModalCards(cart) {
  cartModal.innerHTML = '';
  modalHtml = '';
  for (let i = 0; i < cart.length; i++) {
    const productToAdd = ProducstList.find(e => e.id.toString() == cart[i.toString()]);
    modalHtml += product.modalProductCard(productToAdd);
  }
  cartModal.insertAdjacentHTML('beforeend', modalHtml);
  addRemoveButtons();
}


// Remove from Cart

const addRemoveButtons = () => {
  const removeFromCart = document.querySelectorAll('#remove-product');
  removeFromCart.forEach((button) => {
    button.addEventListener('click', (e) => {
      console.log(`removing ${e.target.parentElement.getAttribute('key')}`);
      removeProductFromCart(e.target.parentElement.getAttribute('key'));
    })
  })
}

const removeProductFromCart = (id) => {
  const index = cart.indexOf(Number(id));
  console.log(index);
  console.log(`removing the product ${id} from the ${index} position`)
  cart.splice(index, 1);
  console.log(`And the cart is: ${cart}`)
  console.log(`Update the local storage`)
  localStorage.setItem('cart', cart)
  createHtmlModalCards(cart);
}

// Create the Modal the first time
cart.length >= 1 ? createHtmlModalCards(cart) : null;


// Icon on cart if isnt empty
const cartBadgeToggle = (cart) => {
  console.log('The length of the card ' + cart.length)
  cart.length >= 1 ? cartBadgeIndicator.classList.remove('hidden') : cartBadgeIndicator.classList.add('hidden');
}

cartBadgeToggle(cart);