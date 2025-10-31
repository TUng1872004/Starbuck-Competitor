document.addEventListener("DOMContentLoaded", function() {
    fetch('data/products.json') 
        .then(response => response.json()) 
        .then(products => { 
            
            const container = document.getElementById('product-list-container');
            if (!container) {
                console.error('Không tìm thấy #product-list-container. Sai rồi đại ca.');
                return;
            }


            products.forEach(product => {
                
                let productHtml = `
                    <div class="col-md-4">

                        <a href="product.html?id=${product.id}" style="text-decoration: none;">
                            <div class="container_main">
                                <img src="${product.image}" alt="${product.name}" class="image">
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
        })
        .catch(error => console.error('Lỗi rồi đại ca. Không tải được file products.json:', error));
});