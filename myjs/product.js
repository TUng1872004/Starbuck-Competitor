function getProductId() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get("id"));
}


async function loadProduct() {
  const id = getProductId();

  if (!id) {
    document.getElementById("productName").textContent = "Sản phẩm không xác định";
    return;
  }
  
  try {
    const response = await fetch("data/products.json");
    const products = await response.json();

    const product = products.find(p => p.id === id);

    if (!product) {
      document.getElementById("productName").textContent = "Không tìm thấy sản phẩm";
      return;
    }    

    const orderbox = document.getElementById('product-box');

    if (product.stock && product.stock >0){
        let Html = `
        <div id="quantity" class="quantity-container">                
            <label for="quantity" class="quantity-label">Số lượng:</label>
                    <input 
                        type="number" 
                        name="quantity" 
                        class="quantity-input" 
                        min="1" 
                        max= ${product.stock}
                        value="1"></input>            
        </div>
        <button class="order-button">Đặt hàng</button>`
        orderbox.innerHTML += Html
    }
    else {
        let Html = `<h1 class="warning">Out of stock</h1>`
        orderbox.innerHTML += Html
    }
    
    document.getElementById("productName").textContent = product.name;
    document.getElementById("productMetadata").textContent = product.description;
    document.getElementById("productImage").src = product.image;
    document.getElementById("productImage").alt = product.name;

  } catch (error){
    console.error("Error loading product:", error);
    document.getElementById("productName").textContent = "Error ! Cannot find item" + id;
    document.getElementById("productMetadata").textContent = error;
  }

}

loadProduct();