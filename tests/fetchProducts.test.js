require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  it('Verifica se a função `fetchProducts` tem o comportamento esperado', () => {
  // testa se fetchProducts é uma função.
  expect(typeof fetchProducts === 'function').toBe(true);
  });

  it('Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada;', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled()

  });

  it('Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador";', async () => {
    await fetchProducts('computador');
    const url = "https://api.mercadolibre.com/sites/MLB/search?q=computador"
    expect(fetch).toHaveBeenCalledWith(url)
  })

  it('Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.', async () => {
    const funct = await fetchProducts('computador');
    expect(funct).toEqual(computadorSearch)
  })

  it('Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    const chamada = await fetchProducts();
    expect(chamada).toEqual(new Error('You must provide an url'));
  })
 // fail('Teste vazio');
});
