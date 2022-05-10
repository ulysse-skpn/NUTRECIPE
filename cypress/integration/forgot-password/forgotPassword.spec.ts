describe( 'Test forgot password page' , () => {

    beforeEach( () => {
        cy.visit('http://localhost:8100/forgot-password')
    })

    it.only( 'returns to login page' , () => {

        cy.get('.returnButton').click()

        cy.url().should('include','/login')
    })
})