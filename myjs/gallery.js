document.addEventListener("DOMContentLoaded", function() {
    let productsData = [];        // Store all products
    let itemsPerPage = 12;        // Number of items to show per batch
    let currentIndex = 0;         // Track how many items have been displayed

    const container = document.getElementById('product-list-container');
    const seeMoreBtn = document.getElementById('see-more-btn');

    if (!container) {
        console.error('Không tìm thấy #product-list-container. Sai rồi đại ca.');
        return;
    }

    fetch('/data/products.json')
        .then(response => response.json())
        .then(products => {
            productsData = products;
            // Show first batch
            renderProducts();
        })
        .catch(error => console.error('Lỗi rồi đại ca. Không tải được file products.json:', error));

    function renderProducts() {
        const slice = productsData.slice(currentIndex, currentIndex + itemsPerPage);
        slice.forEach(product => {
            let productHtml = `
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

        // Hide button if all products are displayed
        if (currentIndex >= productsData.length) {
            seeMoreBtn.style.display = 'none';
        }
    }

    seeMoreBtn.addEventListener('click', renderProducts);
});
