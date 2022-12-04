



describe('Blog List', () => {
    beforeEach(() => {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Jon',
            username: 'jbird',
            password: 'safepass'
        }
        cy.request('POST', 'http://localhost:3003/api/users', user)
        cy.visit('http://localhost:3000')

    })

    it('Login form is shown', () => {
       
        cy.contains('Username')
        cy.contains('Password')
    })

    describe('Login ', () => {
        it('succeeds with correct credentials', () => {
            cy.get('#username').type('jbird')
            cy.get('#password').type('safepass')
            cy.contains('login').click()
            cy.contains('Jon logged in')
        })
        it('fails with wrong credentials', () => {
            cy.get('#username').type('jbird')
            cy.get('#password').type('wrongpass')
            cy.contains('login').click()
            cy.contains('Wrong credentials')
            cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })
    
    describe('When logged in', () => {
        beforeEach(() => {
            cy.login( {username: 'jbird', password: 'safepass'} )
        })

        it('A blog can be created', () => {
            cy.contains('create blog').click()
            cy.get('#title').type('Gerlo')
            cy.get('#author').type('Mange Forell')
            cy.get('#url').type('wonderbass.com')
            cy.get('#submitBlogForm').click()

            cy.contains('a new blog Gerlo by Mange Forell added')
        })

        describe('And there is a blog', () => {
            beforeEach(() => {
                cy.createBlog( {
                    title: 'Fortress',
                    author: 'Carl Love',
                    url: 'lovemagnet.com'
                } )
            })
            it('Liking blog adds one like to blog', () => {
                cy.contains('Fortress').contains('view').click()
                cy.get('#likeButton').click()
                cy.contains('likes 1')
            })
        })
    })
})