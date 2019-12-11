describe('Route form setup', function() {
    it('Load the app', function() {
      cy.visit('http://localhost:3000')
    })
    it('Get routes currently in service', function() {
        // Routes in service returned from fetch
        cy.get('option').should('have.class', 'RouteOption')
    })
    it(`'View routes' button is disabled`, function() {
        cy.get('button').should('be.disabled')
    })
})

describe('Fill out form and go to routing page', function() {
    it('Fill out form', function() {
        cy.visit('http://localhost:3000')
        cy.wait(500)

        cy.get('select')
          .find('option')
          .contains('METRO')
          .as('selectOption')
          .then( () => {
            cy.get('select')
            .select(`${this.selectOption.text()}`)
          })
        cy.get('.MuiIconButton-label > input').first().check()

        cy.get('button').should('not.be.disabled').click()
    })
})

describe('Display bus route data', function() {

    it(`'Back' button is enabled`, function() {
        cy.wait(500)
        cy.get('button').should('not.be.disabled')
    })
    it('Displays route data', function() {
        // Routes in service returned from fetch
        cy.get('h3').siblings('div').should('not.be.empty')
    })
})


