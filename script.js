// const { fetchProducts } = require("./helpers/fetchProducts");


function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
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

function cartItemClickListener(event) {

}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

window.onload = async () => {

  // Faz os itens aparecerem na tela
  const products = await fetchProducts();

  const sectionItems = document.querySelector('.items');

  for (let index = 0; index < products.length; index += 1) {
    const section = createProductItemElement({
      sku: products[index].id,
      name: products[index].title,
      image: products[index].thumbnail
    });

    sectionItems.appendChild(section);

  }

  // Ao clicar em "Adicionar ao carrinho" add ao carrinho o item clicado.
  document.addEventListener('click', async (id = 'MLB1341706310') => {
    if (id.target.className === 'item__add') {
      console.log('Clicouuuuu em um produto');
      const Url = `https://api.mercadolibre.com/sites/MLB/search?q=${id}`;
      const Request = await fetch(Url);
      const Response = await Request.json();
      const Result = Response.results;

      const SectionCart = document.querySelector('.cart__items')
      SectionCart.appendChild(createCartItemElement(Response));

      return Result;
    }
  })

  // Botão para esvaziar o carrinho.
  const ClearCart = document.querySelector('.empty-cart')
  ClearCart.addEventListener('click', () => {
    console.log('clicou em esvaziar carrinho')
    const shoppingCart = document.querySelector('.cart__items')
    shoppingCart.innerHTML = "";
  })

};




