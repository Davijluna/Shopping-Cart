const fetchProducts = async (id) => {
  try {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${id}`;
    const result = await fetch(url);
    // console.log(result);
    const data = await result.json();
    return data;
  } catch (error) {
    return new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
