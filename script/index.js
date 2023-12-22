var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("slide");

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slideIndex++;

  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  if (slides[slideIndex - 1]) {
    slides[slideIndex - 1].style.display = "block";
  }

  setTimeout(showSlides, 2000);
}

const APP_URL_CATEGORIES = "https://fakestoreapi.com/products/categories/";
const APP_URL_PRODUCTS = "https://fakestoreapi.com/products?categories=";

async function fetchDataFromAPI(url) {
  try {
    const response = await fetch(url);
    const response_data = await response.json();
    return response_data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

fetchDataFromAPI(APP_URL_CATEGORIES).then(
  (categories) => {
    categories.map((catagory) => {
      fetch(APP_URL_PRODUCTS + catagory)
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          createProductCard(json);
        });
    });
  },
  (error) => {
    console.error("Error fetching results:", error);
  }
);

/*
fetch the data from API-catagory
Fetch the data based on catagory
Display the data
*/
function createProductCard(product) {
  const productCard = document.createElement("div");
  productCard.className = "product-card";

  const productImage = document.createElement("div");
  productImage.className = "product-image";
  const img = document.createElement("img");
  img.src =
    product.imageSrc ||
    "./assets/images/sample_products_images/smart_phone.webp";
  img.alt = "product image";
  productImage.appendChild(img);

  const productDetails = document.createElement("div");
  productDetails.className = "product-details";
  const productBrand = document.createElement("p");
  productBrand.className = "product-brand";
  productBrand.textContent = product.title || "Samsung Galaxy S22345";
  const productDiscount = document.createElement("p");
  productDiscount.className = "product-discount";
  productDiscount.textContent = product.discount || "Havells";

  productDetails.appendChild(productBrand);
  productDetails.appendChild(productDiscount);

  productCard.appendChild(productImage);
  productCard.appendChild(productDetails);

  return productCard;
}
