# cypress-moderno-udemy
 Curso de Cypress Moderno

#### Test Basic With Cypress
```ts
describe('Primeiro conjunto de testes', () => {
  // Before Initialize
  beforeEach(() => {
    // Acessando a pagina web
    cy.visit('/');
    cy.wait(3000);
  });

  // Caso 1
  it.skip('Contabilizar a quantidade de elementos na sessao da pagina principal', () => {
    // Verificar a quantidade de elementos disponivel
    cy.get('#homefeatured .product-container').should('have.length', 7);

    // Obter o elemento homefeatured .product-container com um apelido Alias @Produto
    // Alias pre-fix @alias   Declare .as('Produto') use cy.get('@Produto')
    cy.get('#homefeatured .product-container').as('ProdutosPopulares');

    // Verificando novamente a quantidade de elementos utilizando as
    cy.get('@ProdutosPopulares').should('have.length', 7);
  });

  // Caso 2 List
  it.skip('Agregar elemento do tipo "blouse" ao carrinho de compra na pagina principal', () => {
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

  // Caso3 Hove && Dropdowns
  it.skip('Verificando se no drop down de womem, tem os elementos necessarios', () => {
    // Flutuando Sobre Os Elementos
    cy.get('#block_top_menu > ul > li:nth-child(1) > ul').invoke(
      // Acao
      'attr',
      // nome do tributo
      'style',
      // new value atributo
      'display: block',
    );

    // Verificar se os elementos do drop down estao visiveis
    cy.get('a[title="Tops"]').should('be.visible');
    cy.get('a[title="T-shirts"]').should('be.visible');
    cy.get('a[title="Blouses"]').should('be.visible');
    cy.get('a[title="Dresses"]').should('be.visible');
    // O '^=' significa para proucurar a palavra que se inicie com seria tipo like "andre%"
    cy.get('a[title^="Casual"]').should('be.visible');
    cy.get('a[title^="Evening"]').should('be.visible');
    cy.get('a[title^="Summer"]').should('be.visible');
  });

  // Caso 4 -> Input Checkbox
  it.skip('Verificar se os checkboxes estao funcionando', () => {
    cy.get('.sf-menu > :nth-child(2) > .sf-with-ul').as('MenuDresses');
    cy.get('@MenuDresses').click();

    // Capturando Container com li
    cy.get(
      '[class="nomargin hiddable col-lg-6"]:has(a[href*="categories-casual_dresses"]) input',
    )
      // Faz um checked em um input do type check
      .check()
      // Verifica se o input esta como checado
      .should('be.checked');

    cy.get(
      '[class="nomargin hiddable col-lg-6"]:has(a[href*="categories-evening_dresses"]) input',
    )
      // Verifica se o input nao esta checado
      .should('not.checked');

    cy.get(
      '[class="nomargin hiddable col-lg-6"]:has(a[href*="categories-summer_dresses"]) input',
    ).should('not.checked');
  });

  // Caso 5 -> Input Select
  it.skip('Verificar se os dropdowns do array estao funcionando', () => {
    // Verificando input do type select
    cy.get('.sf-menu > :nth-child(2) > .sf-with-ul').as('MenuDresses');
    cy.get('@MenuDresses').click();

    cy.wait(5000);
    // Select -> para selecionar um item em um input select
    cy.get('#selectProductSort').select('In stock').should('have.value', 'quantity:desc');
  });

  // Caso 6
  it('Criando uma compre do zero', () => {
    cy.get('#search_query_top').type('Blouse');
    cy.get('#searchbox > .btn').click();

    cy.get(
      '.product-container:has(.product-name[title="Blouse"]) .ajax_add_to_cart_button',
    ).click();

    cy.get('.button-medium[title="Proceed to checkout"]').click();

    // Verificar texto modo 1
    cy.get('tr[id^="product"]')
      .find('.product-name > a')
      .should('contain.text', 'Blouse');

    // Verificar texto mode 2
    cy.get('tr[id^="product"]')
      .find('.price')
      .then($el => {
        expect($el, 'Preço Contêm 27.00').contain.text('27.00');
      });

    cy.get('.cart_navigation > .button').click();

    // Login
    cy.get('#email').type('andreaquilau@gmail.com');
    cy.get('#passwd').type('123456');
    cy.get('#SubmitLogin').click();
    cy.get('.cart_navigation > .button').click();
    cy.get('#cgv').check().should('be.checked');
    cy.get('.cart_navigation > .button').click();
    cy.get('.bankwire').click();
    cy.get('.cart_navigation > .button').click();
    cy.get('.cheque-indent > .dark').should(
      'contain.text',
      'Your order on My Store is complete.',
    );
  });
});
```
