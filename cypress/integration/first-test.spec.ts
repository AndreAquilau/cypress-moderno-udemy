describe('Primeiro conjunto de testes', () => {
  beforeEach(() => {
    // Acessando a pagina web
    cy.visit('/');
  });

  it('Contabilizar a quantidade de elementos na sessao da pagina principal', () => {
    // Verificar a quantidade de elementos disponivel
    cy.get('#homefeatured .product-container').should('have.length', 7);

    // Obter o elemento homefeatured .product-container com um apelido Alias @Produto
    // Alias pre-fix @alias   Declare .as('Produto') use cy.get('@Produto')
    cy.get('#homefeatured .product-container').as('ProdutosPopulares');

    // Verificando novamente a quantidade de elementos utilizando as
    cy.get('@ProdutosPopulares').should('have.length', 7);
  });

  it('Agregar elemento do tipo "blouse" ao carrinho de compra na pagina principal', () => {
    // Obter o elemento homefeatured .product-container
    cy.get('#homefeatured .product-container').as('ProdutosPopulares');
    let price: string;
    // Iterando para encontrar um produto com nome X
    cy.get('@ProdutosPopulares')
      .find('.product-name')
      .each(($el, index, $list) => {
        cy.get('@ProdutosPopulares')
          .eq(index)
          .find('.price')
          // Then Pega todo o elemento anterior e passa como parametro
          .then($el1 => {
            // el.text() -> retorna o texto dentro do elemento
            price = $el1.text();
            // Print na linha do tempo do cypress
            cy.log(price);
            // attr('id', 'name', 'value') = getAtribute.value acessa o valor do atributo
            if ($el.attr('title') === 'Printed Dress' && price.includes('26.00')) {
              // Visualizar no console
              cy.log('Se a encontrado el elemento buscando');
              // Eq so pode ser usada dentro de um iterador = array | list
              // cy.get().eq(index).contains('value').click()
              cy.get('@ProdutosPopulares').eq(index).contains('Add to cart').click();
            }
          });
      });
    cy.get('h2 > .ajax_cart_product_txt')
      // Verifica texto dentro do elemento
      .should('contain.text', 'There is 1 item in your cart.')
      // Verifica se e visivel
      .should('be.visible');
  });
});
