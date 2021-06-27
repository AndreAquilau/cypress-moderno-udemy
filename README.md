## Cypress Moderno
 Curso de Cypress Moderno

### Test Basic With Cypress
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

### Hooks Cypress
Cypress também fornece ganchos (emprestados do Mocha).<br/>

##### A ordem de execução do gancho e do teste é a seguinte:

 * Todos os hooks before () rodam (uma vez)
 * Todos os ganchos beforeEach () são executados
 * Todos os ganchos afterEach () são executados
 * Todos os ganchos after () rodam (uma vez)

 ```ts
  before(() => {

  });

  beforeEach(() => {

  });

  afterEach(() => {

  });

  after(() => {

  });

  describe('test hooks', () => {

  });

  context('test hooks', () => {

  });

  it('description test hooks', () => {

  });

  it.skip('description test hooks', () => {

  });

  it.only('description test hooks', () => {

  });
 ```

 ### Test Advanced With Cypress
 ```ts
 describe('Segundo conjunto de casos de provas avancado', () => {
  //
  let example: ExampleJSON;

  before(() => {
    // fixture carrega o json com dados da pasta cypress/fixtures/exemplo.json
    // nao e nessesario colocar o tipo de arquivo
    cy.fixture('example').then((data: ExampleJSON) => {
      example = data as ExampleJSON;

      // adicionando url path da imagem
      cy.fixture(example.image).as('image');
    });
  });
  beforeEach(() => {
    // Acessando a pagina para realizamos os testes
    cy.visit('https://demoqa.com/automation-practice-form');
  });
  it('Nosso primeiro formulario usando Data', async () => {
    // capturando o input pelo id
    cy.get('#firstName').type(example.nome);
    cy.get('#lastName').type(example.apelido);
    cy.get('#userEmail').type(example.email);

    cy.get(`input[name="gender"][value="${example.sexo}"]`)
      .then($el => $el)
      .click({ force: true });

    cy.get('#userNumber').type(example.telefone);

    cy.get('#dateOfBirthInput').click();

    cy.get('.react-datepicker__month-select').should('be.visible');

    cy.get('.react-datepicker__month-select').select(example.fichaDeNacimento[0]);
    cy.get('.react-datepicker__year-select').select(example.fichaDeNacimento[1]);
    cy.get(`.react-datepicker__day--0${example.fichaDeNacimento[2]}`)
      .should('be.visible')
      .click()
      .wait(1500);

    cy.get('#dateOfBirthInput').should(
      'contain.value',
      example.fichaDeNacimento[0].slice(0, 3),
    );

    cy.get('#dateOfBirthInput').should('contain.value', example.fichaDeNacimento[1]);
    cy.get('#dateOfBirthInput').should('contain.value', example.fichaDeNacimento[2]);

    cy.get('.subjects-auto-complete__value-container').type(example.subjects);

    cy.get('.subjects-auto-complete__menu-list')
      .find('div')
      .each(($el, index, $list) => {
        if ($el.text() === example.subjects) {
          cy.get('.subjects-auto-complete__menu-list').find('div').eq(index).click();
        }
      });

    cy.get('.subjects-auto-complete__value-container').should(
      'contain.text',
      example.subjects,
    );

    cy.get('#currentAddress')
      .type(example.direccion)
      .should('have.value', example.direccion);

    cy.get('#hobbiesWrapper')
      .find('.custom-control-inline')
      .each(($el, index, $list) => {
        cy.get('#hobbiesWrapper')
          .find('.custom-control-label')
          .eq(index)
          .then($el2 => {
            example.hobbies.map(hobbie => {
              if ($el2.text() === hobbie) {
                cy.get('#hobbiesWrapper')
                  .find('input')
                  .eq(index)
                  .then($el3 => $el3)
                  .click({ force: true });
              }
              return hobbie;
            });
          });
      });

    cy.get('#stateCity-wrapper .css-yk16xz-control').type(example.estado);

    cy.get('.css-26l3qy-menu')
      .find('.css-11unzgr')
      .each(($el, index, $list) => {
        if ($el.text() === example.estado) {
          cy.get('.css-26l3qy-menu').find('.css-11unzgr').eq(index).click();
        }
      });
    cy.get('#stateCity-wrapper .css-1uccc91-singleValue').should(
      'contain.text',
      example.estado,
    );

    cy.get('#city .css-1hwfws3').type(example.cidade);

    cy.get('#city')
      .find('.css-26l3qy-menu')
      .each(($el, index, $list) => {
        if ($el.text() === example.cidade) {
          cy.get('#city').find('.css-26l3qy-menu').eq(index).click();
        }
      });

    cy.get('#city .css-1uccc91-singleValue').should('contain.text', example.cidade);

    cy.get('[class="btn btn-primary"]').check();
  });
});
 ```
