document.addEventListener("DOMContentLoaded", function() {
    let productsData = [];        // Store all products
    let filteredProducts = [];    // Store products after search filter
    let itemsPerPage = 12;        // Number of items to show per batch
    let currentIndex = 0;         // Track how many items have been displayed

    const container = document.getElementById('product-list-container');
    const seeMoreBtn = document.getElementById('see-more-btn');
    const searchInput = document.getElementById('searchInput');

    if (!container) {
        console.error('Không tìm thấy #product-list-container. Sai rồi đại ca.');
        return;
    }

    // Load products from JSON
    fetch('/data/products.json')
        .then(response => response.json())
        .then(products => {
            productsData = products;
            // Optional: sort by order descending
            productsData.sort((a, b) => (b.order || 0) - (a.order || 0));
            filteredProducts = productsData; // initially all
            renderProducts();
        })
        .catch(error => console.error('Lỗi rồi. Không tải được file products.json:', error));

    // Render products based on filteredProducts and currentIndex
    function renderProducts() {
        const slice = filteredProducts.slice(currentIndex, currentIndex + itemsPerPage);

        slice.forEach(product => {
            const productHtml = `
                <div class="col-md-3">
                    <a href="product.html?id=${product.id}" style="text-decoration: none;">
                        <div class="container_main">
                            <img src="${product.image}" alt="${product.name}" class="preview_item">
                            <div class="overlay">
                                <div class="text"><i class="fa fa-search" aria-hidden="true"></i></div>
                            </div>
                        </div>
                    </a>
                    <a href="product.html?id=${product.id}" style="text-decoration: none;">
                        <h4 style="text-align: center; padding-top: 10px; color: #303030;">
                            ${product.name}
                        </h4>
                    </a>
                </div>
            `;
            container.innerHTML += productHtml;
        });

        currentIndex += itemsPerPage;

        // Hide button if all filtered products are displayed
        seeMoreBtn.style.display = currentIndex >= filteredProducts.length ? 'none' : 'block';
    }

    // "See More" button
    seeMoreBtn.addEventListener('click', renderProducts);

    // Search functionality
    searchInput.addEventListener('input', () => {
        const keyword = searchInput.value.toLowerCase();

        // Filter products by name (you can also include description)
        filteredProducts = productsData.filter(p => p.name.toLowerCase().includes(keyword));

        // Reset container and pagination
        currentIndex = 0;
        container.innerHTML = "";
        renderProducts();
    });
});
