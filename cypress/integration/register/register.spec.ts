describe( 'Test register page' , () => {

    const password = Cypress.env('password')

    beforeEach( () => {
        cy.visit('http://localhost:8100/register')
    })

    it.only( 'returns to login page' , () => {

        cy.get('.returnButton').click()

        cy.url().should('include','/login')
    })

    it( 'User fill the register form' , () => {

        cy.get('.lastName')
            .type('sekpon')
            .should('have.value' , 'sekpon')

        cy.get('.firstName')
            .type('ulysse')
            .should('have.value' , 'ulysse')

        cy.get('.tel')
            .type('0627410018')
            .should('have.value','0627410018')

        cy.get('.email')
            .type('test@test.com')
            .should('have.value' , 'test@test.com')

        cy.get('.password')
            .type('wxcvbn')
            .should('have.value' , 'wxcvbn')

        cy.get('.passwordControl')
            .type('wxcvbn')
            .should('have.value' , 'wxcvbn')

        cy.request( 'POST', 'http://127.0.0.1:3000/register' , {
            last_name:'sekpon',
            first_name:'ulysse',
            phone_number:'0627410018',
            email:'test@test.com',
            password: password,
            role:"user",
            receiveEmail:true,
            receiveNotification:true,
        })
    })
})