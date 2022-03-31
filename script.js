// const { fetchItem } = require("./helpers/fetchItem");

const elementItems = document.querySelector('.items');
// const buttonAdicionar = document.querySelector('.item_add');
const esvaziarCarrinho = document.querySelector('.empty-cart');
const lis = document.querySelector('.cart__items');

// tira os items do carrinho

esvaziarCarrinho.addEventListener('click', () => {
  const ol = document.querySelector('.cart__items'); // pega toda a estrutura html da ol dinamicamente.
  ol.innerHTML = ''; // excluindo a estrutura e esvaziando o carrinho.
  saveCartItems(lis.innerHTML);
  });

// criar elemento de imagem do produto

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

// carrinho Item Click Listener que remove um item clicado

function cartItemClickListener(event) {
  event.target.remove('computador');
  saveCartItems(lis.innerHTML);
}

// criar elemento de item de carrinho

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function listernosBotões() {
  const botoes = document.querySelectorAll('.item__add');
  botoes.forEach((botoa) => { 
    botoa.addEventListener('click', async (event) => {
      const elementHtml = event.target.parentNode.querySelector('.item__sku').innerHTML;
      const retunorHTML = await fetchItem(elementHtml);
      lis.appendChild(createCartItemElement(retunorHTML));
      saveCartItems(lis.innerHTML);
    });
  });
}

// criar elemento personalizado

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

// criar elemento de item de produto

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  // console.log(sku);
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
}
// obter Sku do item do produto
function getSkuFromProductItem(item) {
// return item.querySelector('span.item__sku').innerText;
}

 async function renderProducts() {
  const prodtos = await fetchProducts('computador');
  prodtos.results.forEach((element) => {
  elementItems.appendChild(createProductItemElement(element));
  });
}

window.onload = async () => {
await renderProducts();
await listernosBotões();
lis.innerHTML = getSavedCartItems();
lis.addEventListener('click', cartItemClickListener);
 };