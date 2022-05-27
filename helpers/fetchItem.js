const fetchItem = async (param) => {

  if (typeof param !== typeof '') {
    return new Error('You must provide an url');
  }

  const url = "https://api.mercadolibre.com/items/MLB1341706310"
  const result = await fetch(url)
  .then((response) => response.json())
  .then((data) => data);
  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
