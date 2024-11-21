let cart = [];

// Format angka ke Rupiah
function formatRupiah(number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
}

// Tambahkan produk ke keranjang
function addToCart(productId) {
  const productElement = document.querySelector(`.product[data-id='${productId}']`);
  const name = productElement.dataset.name;
  const price = parseInt(productElement.dataset.price);

  // Cari apakah produk sudah ada di keranjang
  const existingProduct = cart.find((item) => item.id === productId);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ id: productId, name, price, quantity: 1 });
  }

  updateCart();
}

// Perbarui tampilan keranjang
function updateCart() {
  const cartItemsElement = document.getElementById('cart-items');
  cartItemsElement.innerHTML = '';

  let totalPrice = 0;

  cart.forEach((item, index) => {
    totalPrice += item.price * item.quantity;

    cartItemsElement.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${formatRupiah(item.price)}</td>
        <td>
          <button onclick="changeQuantity(${index}, -1)">-</button>
          ${item.quantity}
          <button onclick="changeQuantity(${index}, 1)">+</button>
        </td>
        <td><button onclick="removeFromCart(${index})">Hapus</button></td>
      </tr>
    `;
  });

  document.getElementById('total-price').innerText = `Total: ${formatRupiah(totalPrice)}`;
}

// Ubah jumlah produk di keranjang
function changeQuantity(index, delta) {
  cart[index].quantity += delta;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  updateCart();
}

// Hapus produk dari keranjang
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Checkout
function checkout() {
  if (cart.length === 0) {
    alert('Keranjang kosong!');
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  alert(`Terima kasih telah berbelanja! Total pembayaran: ${formatRupiah(total)}`);
  cart = [];
  updateCart();
}
