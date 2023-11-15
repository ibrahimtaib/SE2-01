describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/')
  })
})

describe('ProposalList Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/applications');
  });

  it('renders the ProposalList component with mock data', () => {
    cy.get('h1').should('exist').and('have.text', 'Thesis Applications');
    cy.get('h2').should('exist').and('be.visible');
  });

  it('navigates to proposal details on title click', () => {
    cy.get('h2').first().click();
  
    cy.get('a').contains('Back').should('exist');

    cy.get('h1').contains('Proposal Details').should('exist');

    cy.get('.max-w-2xl').should('exist');

    cy.get('.grid-cols-1').should('exist');
    cy.get('.md\\:grid-cols-2').should('exist');

    cy.get('.text-indigo-600').should('exist');
    cy.contains('Title:').should('exist');
    cy.contains('Supervisor:').should('exist');
    cy.contains('Co-supervisors:').should('exist');
    cy.contains('Type:').should('exist');
    cy.contains('Level:').should('exist');

    cy.get('.text-black').should('exist');
    cy.contains('Description:').should('exist');
    cy.contains('Notes:').should('exist');
    cy.contains('Expiration Date:').should('exist');
    cy.contains('Groups:').should('exist');
    cy.contains('Required Knowledge:').should('exist');

    cy.contains('Title:').next().should('exist');
    cy.contains('Supervisor:').next().should('exist');
    cy.contains('Co-supervisors:').next().should('exist');
    cy.contains('Type:').next().should('exist');
    cy.contains('Level:').next().should('exist');
    cy.contains('Description:').next().should('exist');
    cy.contains('Notes:').next().should('exist');
    cy.contains('Expiration Date:').next().should('exist');
    cy.contains('Groups:').next().should('exist');
    cy.contains('Required Knowledge:').next().should('exist');
  });
  
  it('handles application action on button click', () => {
    cy.intercept('POST', 'application/*', { statusCode: 200 }).as('postApplication');
    cy.contains('button', 'Accetta').click();
    cy.contains('button', 'Rifiuta').click();
  });

  it('navigates to student details on student name click', () => {
    cy.get('.font-semibold.text-black').first().click();

    cy.url().should('include', '/applications/student/');
 
    cy.url().should('include', '/applications/student/');

    cy.get('a').contains('Back').should('exist');

    cy.get('h1').contains('Student Details').should('exist');

    cy.get('.card').should('exist');

    cy.contains('Name:').should('exist');
    cy.contains('Email:').should('exist');
    cy.contains('Gender:').should('exist');
    cy.contains('Nationality:').should('exist');
    cy.contains('Degree:').should('exist');
    cy.contains('Degree Code:').should('exist');
    cy.contains('Enrollment Year:').should('exist');

    cy.get('.table').should('exist');

    cy.get('.table th').contains('Course Code').should('exist');
    cy.get('.table th').contains('Course Title').should('exist');
    cy.get('.table th').contains('CFU').should('exist');
    cy.get('.table th').contains('Grade').should('exist');
    cy.get('.table th').contains('Date').should('exist');

    cy.get('.table tbody tr').should('have.length.greaterThan', 0);
  });

});

describe('ProposalList API and front-end', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/applications');
  });

  it('renders ProposalList component with mock data', () => {
    cy.intercept('GET', '/proposals').as('getProposalList');

    cy.get('h1').should('exist').and('have.text', 'Thesis Applications');

    cy.get('.text-center mt-5').should('not.exist');

    cy.get('.border.rounded.p-4.bg-white.shadow-md').should('have.length.greaterThan', 0);

    cy.get('.border.rounded.p-4.bg-white.shadow-md').each((proposalListItem, index) => {
      cy.wrap(proposalListItem).find('h2').should('exist');
      cy.wrap(proposalListItem).find('.font-semibold.text-black').should('exist');
      cy.wrap(proposalListItem).find('.text-sm.text-gray-600').should('exist');
      cy.wrap(proposalListItem).find('Button').should('exist');
    });
  });

  it('handles API calls for proposal details', () => {
    cy.clearCookies(); 
    cy.clearLocalStorage(); 
    cy.intercept('GET', 'applications/proposal/*').as('getProposalDetails');
  
    cy.get('h2').first().click();
  
    cy.wait('@getProposalDetails').should(({ request, response }) => {
      expect(request.url).to.include('/applications/proposal/');
    });
  });
  
  it('handles API calls for student details', () => {
    cy.clearCookies(); 
    cy.clearLocalStorage(); 
  
    cy.intercept('GET', 'applications/student/*').as('getStudentDetails');
  
    cy.get('.font-semibold.text-black').first().click();
    
    cy.wait('@getStudentDetails').should(({ request, response }) => {
      expect(request.url).to.include('/applications/student/');
    });
  });
  
});