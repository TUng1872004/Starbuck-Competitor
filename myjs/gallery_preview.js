
document.addEventListener("DOMContentLoaded", function() {
    fetch('data/products.json')
        .then(response => response.json())
        .then(products => {
            const container = document.getElementById('product-preview-list'); 
            if (!container) {
                console.error('Không tìm thấy #product-preview-list. Sai rồi đại ca.');
                return;
            }

            const fLen = products.length;
            for (let i = 1; i < fLen && i < 4; i++) {
                container.innerHTML += `
                    <div class="col-md-4">
                        <div class="container_main">
                                <img src=${products[i].image} alt=${products[i].name} class="image">
                                <div class="overlay">
                                    <div class="text">
                                        <a href="product.html?id=${products[i].id}"><i class="fa fa-search" aria-hidden="true"></i></a>
                                    </div>
                                </div>
                        </div>
                    </div>`;
            }
        })
        .catch(err => console.error('Lỗi khi tải dữ liệu sản phẩm:', err));
});
