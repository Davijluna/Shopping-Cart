const fetchItem = async (id) => { 
  try {
    const url = `https://api.mercadolibre.com/items/${id}`; 
    const resulfechItem = await fetch(url); // requisição API
    const datafechItem = await resulfechItem.json();
    return datafechItem;
  } catch (error) {
    return new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
