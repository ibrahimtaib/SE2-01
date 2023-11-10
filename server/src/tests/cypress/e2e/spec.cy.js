describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/')
  })
})

describe('ProposalList Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/'); 
  });

  it('renders the component with mock data', () => {
    // Verifica che il titolo dell'intestazione sia presente
    cy.get('h1').should('exist').and('have.text', 'Thesis Applications');

    // Verifica che il titolo di una proposta sia presente
    cy.get('h2').should('exist');
  });

  it('handles title click and navigation', () => {
    // Simula un clic su un titolo di proposta
    cy.get('h2').first().click();

    // Verifica che la navigazione sia avvenuta correttamente
    cy.url().should('include', '/proposal/');
    cy.get('h1').should('exist').and('have.text', 'Proposal Details');
    cy.get('h2').should('exist');
    cy.get('span').should('exist');
  });

  it('handles application action', () => {
    // Simula un clic su un pulsante "Accetta"
    cy.contains('button', 'Accetta').click();
  });
});
