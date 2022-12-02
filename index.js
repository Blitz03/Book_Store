let cartNoti = document.querySelector(".cart-noti");
let counter = 0;
let cartContainer = document.querySelector(".cart-container");
let emptyTitle = document.querySelector(".empty");
let quantities = document.querySelectorAll(".quantity");
for (let i = 0; i < quantities.length; i++) {
  let input = quantities[i];
  input.addEventListener("change", updateCartTotal);
};

let removeButtons = document.querySelectorAll(".remove");

for (let i = 0; i < removeButtons.length; i++) {
  let button = removeButtons[i];
  button.addEventListener("click", removeCartItem);
};

let addToCartButtons = document.querySelectorAll(".add-cart");

for (let i = 0; i < addToCartButtons.length; i++) {
  let button = addToCartButtons[i];
  button.addEventListener("click", addToCartClicked);
};



function addToCartClicked(event) {
  counter++;
  let button = event.target; 
  let sellingBox = button.parentElement.parentElement;
  let imgSrc = sellingBox.querySelector("img").src;
  let title = sellingBox.querySelector(".details h3").innerText;
  let price = sellingBox.querySelector(".price-review-span").innerText;
  addToCart(imgSrc, title, price)
  if (counter > 0) {
    cartContainer.style.display = "block";
    emptyTitle.style.display = "none";
  }
  updateCartTotal();
};

function addToCart(imgSrc, title, price) {
  let boxImgSrc = document.querySelectorAll(".cart-box .img img");
  let quantityInputs = document.querySelectorAll(".quantity");
  for (let i = 0; i < boxImgSrc.length; i++) {
    if (boxImgSrc[i].src === imgSrc) {
      counter--;
      quantityInputs[i].value++;
      return;
    };
  };
  let newBox = document.createElement("div");
  let cartContent = document.querySelector(".cart-content");
  newBox.classList.add("cart-box");
  let newBoxContent = `
  <div class="img">
  <img src="${imgSrc}" alt="">
</div>
<div class="cart-box-details">
  <h3>${title}</h3>
  <span>${price}</span>
  <div class="cart-box-rating">
    <i class="fa-solid fa-star"></i>
    <i class="fa-solid fa-star"></i>
    <i class="fa-solid fa-star"></i>
    <i class="fa-solid fa-star"></i>
    <i class="fa-regular fa-star-half-stroke"></i>
  </div>
  <input type="number" class="quantity" min="1" value="1">
</div>
<div class="remove-icon">
  <i class="fa-solid fa-square-minus remove"></i>
</div>
  `
  newBox.innerHTML = newBoxContent;
  cartContent.prepend(newBox);
  newBox.querySelector(".remove").addEventListener("click", removeCartItem);
  newBox.querySelector(".quantity").addEventListener("change", updateCartTotal);
  updateCartQuantity();
};


function removeCartItem(event) {
  counter--;
  let button = event.target;
  button.parentElement.parentElement.remove();
  if (counter <= 0) {
    cartContainer.style.display = "none";
    emptyTitle.style.display = "block";
  };
  updateCartTotal();
  updateCartQuantity();
};

function updateCartTotal() {
  let boxes = document.querySelectorAll(".cart-box");
  let total = 0;
  for (let i = 0; i < boxes.length; i++) {
    let box = boxes[i];
    let quantity = box.querySelector("input").value;
    let priceElement = box.querySelector("span").innerHTML.replace("$", "");
    let price = parseFloat(priceElement);
    total = total + (quantity * price);
  };
  document.querySelector(".cart-subtotal-number").innerText = "$" + total;
};

function updateCartQuantity() {
  cartNoti.innerText = counter;
};


const myScrollButton = document.querySelector(".scroll-button button");

window.addEventListener("scroll", () => {
  myScrollButton.style.cssText = "visibility: visible; opacity: 1;";
  if (window.scrollY < 60) {
  myScrollButton.style.cssText = "visibility: hidden; opacity: 0;";
  };
});

myScrollButton.addEventListener("click", () => {
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: "smooth",
  });
});