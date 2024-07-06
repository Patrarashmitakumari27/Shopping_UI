let productDiv = document.querySelector(".card-group");
let buttonDiv = document.querySelector(".btn-group");
let allData = [];

function fetchProduct() {
    productDiv.innerHTML = "";
    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
        .then(response => response.json())
        .then(data => {
            allData = data.categories;
            let menCategory = allData.filter(category => category.category_name === "Men");
            displayProducts(menCategory);
            document.querySelector(`.filter-btn[data-category="Men"]`).classList.add('active');
        });
}

function truncateTitle(title, maxLength) {
    return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
}

function displayProducts(categories) {
    productDiv.innerHTML = "";
    categories.forEach(category => {
        category.category_products.forEach(product => {
            let discountPercentage = Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100);
            let truncatedTitle = truncateTitle(product.title, 16);
            productDiv.innerHTML +=
                `<div class="card-1">
                    <div class="imgs">
                        <img src=${product.image} alt="${product.title}" class="img-1"/>
                         ${product.badge_text ? `<div class="badge">${product.badge_text}</div>` : ''}
                    </div>
                    <div class="cont">
                        <div class="cont-1">
                            <p class="h-1">${truncatedTitle}</p>
                            <p class="p-1"><span class="s-1"> &#8226;</span> ${product.vendor}</p>
                        </div>
                        <div class="cont-2">
                            <p class="h-2">Rs ${product.price}</p>
                            <p class="p-2">${product.compare_at_price}</p>
                            <p class="p-3">${discountPercentage}% Off</p>
                        </div>
                        <button class="btn">Add to Cart</button>
                    </div>
                </div>`;
        });
    });
}

function filterProducts(categoryName) {
    let filteredCategories = allData.filter(category => category.category_name === categoryName);
    displayProducts(filteredCategories);
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.classList.remove('active');
    });
    document.querySelector(`.filter-btn[data-category="${categoryName}"]`).classList.add('active');
}

document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => filterProducts(button.dataset.category));
});

fetchProduct();
