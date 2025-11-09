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
    const priceText = product.price ? formatPrice(product.price) : "Giá đang cập nhật";
    if (product.stock && product.stock >0){
        let Html = `
        <div id="quantity" class="quantity-container">                
            <label for="quantity" class="quantity-label">Số lượng:</label>
                    <input 
                        type="number" 
                        name="quantity" 
                        id="quantityInput"
                        class="quantity-input" 
                        min="1" 
                        max= ${product.stock}
                        value="1"></input>   
                        
              <p style="text-align:center; color:#d9534f; font-weight:bold;">
                        ${priceText}
                    </p>
        </div>
        <button id="orderButton" class="order-button">Đặt hàng</button>`
        orderbox.innerHTML += Html
      
      // Handle order button and quantity input
      const orderButton = document.getElementById("orderButton");
      const quantityInput = document.getElementById("quantityInput");

      orderButton.addEventListener("click", async () => {
        const quantity = parseInt(quantityInput.value);
        if (isNaN(quantity) || quantity <= 0) {
          alert("Please enter a valid quantity");
          return;
        }

        // Send to backend
        try {
          const res = await fetch("http://localhost:5000/api/update-product", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: product.id, quantity: quantity }),
          });

          const data = await res.json();
          if (data.success) {
            alert(`Đặt hàng thành công! Bạn đã đặt ${quantity} sản phẩm`);
            // Optionally update UI
            product.stock -= quantity;
            quantityInput.max = product.stock;
          } else {
            alert(`Failed: ${data.error}`);
          }
        } catch (err) {
          console.error("Error sending request:", err);
          alert("Error sending request to backend: " + err.message);
        }
      });

    }
    else {
        let Html = `<h1 class="warning">Out of stock</h1>`
        orderbox.innerHTML += Html
    }
    
    document.getElementById("productName").textContent = product.name;
    document.getElementById("productMetadata").textContent = product.description;
    document.getElementById("productImage").src = product.image;
    document.getElementById("productImage").alt = product.name;

    const priceElement = document.getElementById("productPrice");
    if (priceElement) {
      if (product.price) {
        priceElement.textContent = formatPrice(product.price);
      } else {
        priceElement.textContent = "Giá đang cập nhật";
      }
    }

  } catch (error){
    console.error("Error loading product:", error);
    document.getElementById("productName").textContent = "Error ! Cannot find item" + id;
    document.getElementById("productMetadata").textContent = error;
  }

}

function formatPrice(price) {
  return Number(price).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND"
  });
}

loadProduct();