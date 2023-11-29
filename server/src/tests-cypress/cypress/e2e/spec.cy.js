describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/')
  })
})

describe('ProposalList API and front-end', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/applications');
  });

  it('renders ProposalList component with mock data', () => {
    cy.intercept('GET', '/proposals').as('getProposalList');

    cy.get('h1').should('exist').and('have.text', 'Thesis Applications');

    cy.get('.spinner-border').should('not.exist');

    cy.get('.card.mb-3').each((proposalListItem, index) => {
      const proposalTitle = proposalListItem.find('.card-title').first();
      const studentSubtitle = proposalListItem.find('.card-subtitle').first();
      const acceptButton = proposalListItem.find('button:contains("Accept")').first();
      const rejectButton = proposalListItem.find('button:contains("Refuse")').first();

      cy.wrap(proposalTitle).should('exist');
      cy.wrap(studentSubtitle).should('exist');
      cy.wrap(acceptButton).should('exist');
      cy.wrap(rejectButton).should('exist');
    });
  });

  it('handles API calls for proposal details', () => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.intercept('GET', 'applications/proposal/*').as('getProposalDetails');

    cy.get('.card-title').first().click();

    cy.wait('@getProposalDetails').should(({ request, response }) => {
      expect(request.url).to.include('/applications/proposal/');
    });
  });

  it('handles API calls for student details', () => {
    cy.clearCookies();
    cy.clearLocalStorage();

    cy.intercept('GET', 'applications/student/*').as('getStudentDetails');

    cy.get('.card-subtitle').first().click();

    cy.wait('@getStudentDetails').should(({ request, response }) => {
      expect(request.url).to.include('/applications/student/');
    });
  });
});


describe('ProposalList Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/applications');
  });

  it('renders the ProposalList component with mock data', () => {
    cy.get('h1').should('exist').and('have.text', 'Thesis Applications');
  });

  it('navigates to proposal details on title click', () => {
    cy.get('.card-title').first().click();

    cy.get('a').contains('Back').should('exist');

    cy.get('h1').should('exist');
    cy.get('.max-w-2xl').should('exist');
    cy.get('.grid-cols-1').should('exist');
    cy.get('.md\\:grid-cols-2').should('exist');

    cy.get('.text-indigo-600').should('exist');
    cy.contains('Co-supervisors:').should('exist');
    cy.contains('Type:').should('exist');
    cy.contains('Level:').should('exist');

    cy.get('.text-black').should('exist');
    cy.contains('Description:').should('exist');
    cy.contains('Notes:').should('exist');
    cy.contains('Expiration Date:').should('exist');
    cy.contains('Groups:').should('exist');
    cy.contains('Required Knowledge:').should('exist');

    cy.contains('Co-supervisors:').next().should('exist');
    cy.contains('Type:').next().should('exist');
    cy.contains('Level:').next().should('exist');
    cy.contains('Description:').next().should('exist');
    cy.contains('Notes:').next().should('exist');
    cy.contains('Expiration Date:').next().should('exist');
    cy.contains('Groups:').next().should('exist');
    cy.contains('Required Knowledge:').next().should('exist');
  });

  it('handles API calls for application action buttons', () => {
    cy.clearCookies();
    cy.clearLocalStorage();

    cy.intercept('POST', '/applications/accept-application/*').as('acceptApplication');

    cy.contains('button', 'Accept').as('acceptButton').click();

    cy.wait('@acceptApplication').its('request.url').should('match', /\/applications\/accept-application\//);

    cy.intercept('POST', '/applications/refuse-application/*').as('refuseApplication');

    cy.contains('button', 'Refuse').as('refuseButton').click();

    cy.wait('@refuseApplication').its('request.url').should('match', /\/applications\/refuse-application\//);
  });

  it('navigates to student details on student name click', () => {
    cy.get('.card-subtitle').first().click();

    cy.url().should('include', '/students/');

    cy.get('a').contains('Back').should('exist');

    cy.get('.card').should('exist');

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