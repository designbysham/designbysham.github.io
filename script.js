/*MENU BUTTON*/
    // script.js
document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("menu-button");
    const menuOverlay = document.getElementById("menu-overlay");
    const closeMenuButton = document.getElementById("close-menu");
    // Open the full-screen menu when the menu button is clicked
    menuButton.addEventListener("click", function () {
        menuOverlay.classList.remove("hidden");
    });
    // Close the full-screen menu when the close button is clicked
    closeMenuButton.addEventListener("click", function () {
        menuOverlay.classList.add("hidden");
    });
})
const stripe = Stripe('pk_test_51NppkRIrrzXCgiDEIVn0fy76XfWnVud2XS0k4uDiE2PUTisXpstf4ZoIrdQoz5yAOtOhRegimG3pOtoko1KgB2OC003M5pww7K');
const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
addToCartButtons.forEach(button => {
  button.addEventListener('click', async () => {
    // Create a Payment Intent on your server and get the client secret.
    const response = await fetch('/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product: 'Product Name', // Replace with the actual product name
        price: 1999, // Replace with the actual price in cents
      }),
    });
    const data = await response.json();
    // Use the client secret to confirm the payment.
    const { error } = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: cardElement, // Replace with your card element (Stripe Elements or custom)
      },
    });
    if (error) {
      // Handle payment error
      console.error(error.message);
    } else {
      // Payment succeeded, you can display a success message
      console.log("Payment successful!");
    }
  });
});
/*PRODUCTS*/
// Assuming you have a container in your HTML where you want to display products.
const container = document.getElementById('product-container');
// Fetch and parse the CSV file.
fetch('product_images/products.csv')
  .then(response => response.text())
  .then(csv => {
    // Parse the CSV data.
    const products = Papa.parse(csv, { header: true }).data;
    // Loop through the products array and create HTML elements for each product.
    products.forEach(product => {
      // Create a div element for each product.
      const productDiv = document.createElement('div');
      productDiv.classList.add('product');
      // Create an image element and set its source.
      const image = document.createElement('img');
      image.src = product['image_url']; // Use the 'image_url' column.
      image.classList.add('product-image');
      // Create a paragraph for the product name.
      const namePara = document.createElement('p');
      namePara.textContent = product['PRODUCT_NAME']; // Use the 'PRODUCT_NAME' column.
      namePara.classList.add('product-name');
      // Create a paragraph for the product price.
      const pricePara = document.createElement('p');
      pricePara.textContent = product['PRODUCT_PRICE']; // Use the 'PRODUCT_PRICE' column.
      pricePara.classList.add('product-price');
      // Create an "Add to Cart" button.
      // Create an "Add to Cart" button.
      const addToCartButton = document.createElement('button');
      addToCartButton.textContent = 'Add to Cart';
      addToCartButton.classList.add('add-to-cart');
      // Give it an ID.
      addToCartButton.id = 'add-to-cart-button-1';
      // Append the elements to the productDiv.
      productDiv.appendChild(image);
      productDiv.appendChild(namePara);
      productDiv.appendChild(pricePara);
      productDiv.appendChild(addToCartButton);
      // Append the productDiv to the container in your HTML.
      container.appendChild(productDiv);
    });
  })
  .catch(error => {
    console.error('Error fetching or parsing CSV file:', error);
  });
// Assuming you have a container in your HTML where you want to display products.
const container2 = document.getElementById('product-container');
// Create an empty cart object to store selected products.
const cart = [];
// Fetch and parse the CSV file...
// (Your previous code here)
// Add event listeners to "Add to Cart" buttons.
container2.addEventListener('click', event => {
  const targetButton = event.target;

  // Check if the clicked element is an "Add to Cart" button.
  if (targetButton.classList.contains('add-to-cart-button')) {
    // Get the product details associated with the clicked button.
    const productDiv = targetButton.closest('.product');
    const productName = productDiv.querySelector('.product-name').textContent;
    const productPrice = productDiv.querySelector('.product-price').textContent;
    const productImage = productDiv.querySelector('.product-image').src;

    // Create a product object.
    const product = {
      name: productName,
      price: productPrice,
      image: productImage,
    };

    // Add the product to the cart.
    cart.push(product);

    // You can now update the cart display or perform other actions.
    // For example, you can display the number of items in the cart.
    const cartCount = document.getElementById('cart-number');
    cartCount.textContent = cart.length;
  }
});
