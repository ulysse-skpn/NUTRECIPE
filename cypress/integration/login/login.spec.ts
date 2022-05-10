describe( 'Test login page' , () => {

    beforeEach( () => {
        cy.visit('http://localhost:8100/login')
    })


    it( 'Visits the register page' , () => {

        cy.contains('ion-router-link','Inscription').click()

        cy.url().should('include','/register')
    })


    it( 'Visits the forgot-password page' , () => {

        cy.contains('ion-router-link','Mot de passe oublié').click()

        cy.url().should('include','/forgot-password')
    })


    it( 'User fill the login form' , () => {

        cy.get('.email')
            .type('test@test.com')
            .should('have.value' , 'test@test.com')

        cy.get('.password')
            .type('wxcvbn')
            .should('have.value' , 'wxcvbn')
        
        cy.request( 'POST', 'http://127.0.0.1:3000/login' , {
            email:'test@test.com',
            password:'wxcvbn'
        }).then( (response) => {            
            const res = response.body
            expect(res).to.have.property('user')
            expect(res).to.have.property('expires_in')
            expect(res).to.have.property('access_token')
        })
    })
})