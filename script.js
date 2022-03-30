// const { fetchItem } = require("./helpers/fetchItem");

const elementItems = document.querySelector('.items');
// const buttonAdicionar = document.querySelector('.item_add');
const botao = document.querySelector('.empty-cart');
const lis = document.querySelector('.cart__items');

botao.addEventListener('click', () => {
  const ol = document.querySelector('.cart__items');
  ol.innerHTML = '';
  
});

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function cartItemClickListener(event) {
  event.target.remove('computador');
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  e.addEventListener('click', (event) => {
    const elementHtml = event.target.parentNode.querySelector('.item__sku').innerHTML;
    const retunoHTML = fetchItem(elementHtml);
    lis.appendChild(createCartItemElement(retunoHTML));
  });
  return e;
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  console.log(sku);
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

window.onload = async () => {
  const prodtos = await fetchProducts();
  prodtos.results.forEach((element) => {
   elementItems.appendChild(createProductItemElement(element));
  });
  // console.log(prodtos.results);
 };
