import { slateBeforeEach, slateAfterEach } from '../support/e2e';

describe('Data Table Block: View Mode Tests', () => {
  beforeEach(slateBeforeEach);
  afterEach(slateAfterEach);

  it('Data Table Block: Add and save', () => {
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Data Table Test');
    cy.get('.documentFirstHeading').contains('Data Table Test');

    cy.getSlate().click();

    // Add data table block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Data Visualizations').click();
    cy.get('.content.active.data_visualizations .button.data_table')
      .contains('Data Table')
      .click({ force: true });

    // Save
    cy.get('#toolbar-save').click();

    cy.contains('Data Table Test');
  });
});