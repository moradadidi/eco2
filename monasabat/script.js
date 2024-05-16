
let login = document.getElementById('login')
let sign_up = document.getElementById('sign_up')
let logo = document.getElementById('logo')

login.addEventListener("click",()=>{
    window.location.href = `login.html`;
  })

  sign_up.addEventListener("click",()=>{
    window.location.href = `sign_up.html`;
  })

  logo.addEventListener("click",()=>{
    window.location.href = `index.html`;
  })

  // Function to add item to the cart
function addToCart(name, price, image) {
  // Retrieve cart items from storage or initialize an empty array
  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  // Push the new item to the cart array
  cartItems.push({ name, price, image });

  // Store the updated cart items back to storage
  localStorage.setItem('cart', JSON.stringify(cartItems));

  // Optionally, update the cart display immediately
  updateCartDisplay();

  // Optionally, provide feedback to the user
  alert(`${name} added to cart!`);
}

// Function to update the cart display on the cart page
function updateCartDisplay() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const cartList = document.getElementById('cart-items');

  // Check if the cartList element exists before manipulating it
  if (!cartList) {
    console.error("Cart list element not found.");
    return;
  }

  // Clear the existing cart items
  cartList.innerHTML = '';

  // Iterate over each item in the cart and create HTML elements for display
  cartItems.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="item-details">
          <h3>${item.name}</h3>
          <p>${item.price}</p>
        </div>
        <button class="remove-btn">Remove</button>
      </div>
    `;
    cartList.appendChild(li);
  });

  // Calculate and display the total price
  const totalPrice = cartItems.reduce((total, item) => total + parseFloat(item.price), 0);
  document.getElementById('total-price').innerText = `Total: $${totalPrice.toFixed(2)}`;
}

// Add event listener to all "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const name = button.parentNode.querySelector('h3').innerText;
    const price = button.getAttribute('data-price');
    const image = button.getAttribute('data-image');
    addToCart(name, price, image);
  });
});

// Function to handle removing items from the cart
document.addEventListener('click', event => {
  if (event.target.classList.contains('remove-btn')) {
    const itemName = event.target.parentNode.querySelector('h3').innerText;
    removeItemFromCart(itemName);
  }
});

// Function to remove item from the cart
function removeItemFromCart(itemName) {
  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cartItems = cartItems.filter(item => item.name !== itemName);
  localStorage.setItem('cart', JSON.stringify(cartItems));
  updateCartDisplay();
}

// Optionally, call updateCartDisplay when the cart page loads to display any existing items
updateCartDisplay();
