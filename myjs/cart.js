let qrNavigation = null

fetch(
    './data/cart.json'
).then(
    data => data.json()
).then(
    data => {
        let totalPrice = 0
        const cartListElement = document.querySelector('tbody')
        for (const item of data){
            cartListElement.innerHTML += `
                <tr item-id="${item.id}">
                    <td><img src="${item.image}" class="cart_item_img"></td>
                    <td>${item.name}</td>
                    <td class="item-price" price="${item.price}">${item.price}₫</td>
                    <td><input type="number" value="${item.quantity}" min="1" class="qty_input"></td>
                    <td class="total-price">${item.price*item.quantity}₫</td>
                    <td><i class="fa fa-trash-o remove_item"></i></td>
                </tr>
            `
            totalPrice += item.price * item.quantity
        }
        document.querySelector('.summary-price').textContent = totalPrice + '₫'
        document.querySelectorAll('.qty_input').forEach(tr => {
            tr.addEventListener('change', function(){
                const row = this.closest('tr')
                const id = Number(row.getAttribute('item-id'))      
                totalPrice -= Number(row.querySelector('.total-price').textContent.slice(0,row.querySelector('.total-price').textContent.length-1))                
                const itemPrice = Number(row.querySelector('.item-price').getAttribute('price'))
                const newPrice = Number(this.value) * itemPrice
                const itemIndex = data.findIndex((item) => {
                    return item.id === id
                })                
                data[itemIndex].quantity = Number(this.value)
                row.querySelector('.total-price').textContent = newPrice + '₫'
                totalPrice += newPrice
                document.querySelector('.summary-price').textContent = totalPrice + '₫'
            })
        })
        document.querySelectorAll('.remove_item').forEach(btn => {
            btn.addEventListener('click', function() {
                
                const id = Number(this.closest('tr').getAttribute('item-id'));
                const itemIndex = data.findIndex((item) => {
                    return item.id === id
                })
                data = data.splice(itemIndex, 1)
                
                fetch("http://localhost:5000/api/remove-cart", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });
            });
        });
    }
)

qrNavigation = () => {
    fetch("http://localhost:5000/api/remove-cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
    })
    .then(
        _ => {
            window.location.href = '/checkout.html'
        }
    );
}