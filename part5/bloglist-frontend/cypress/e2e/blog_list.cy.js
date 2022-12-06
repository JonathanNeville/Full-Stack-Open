





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
            it('Logged in user can remove blog', () => {
                cy.contains('Fortress').contains('view').click()
                cy.get('#removeButton').click()
                cy.get('html').should('not.contain', 'Fortress')

            })
            
        })
        describe('And there is more than one blog', () => {
            beforeEach(() => {
                cy.createBlog({
                    title: 'Blog one',
                    author: 'Gordon Mayflower',
                    url: 'fruits.com'
                })
                cy.createBlog({
                    title: 'Blog two',
                    author: 'Gordon Mayflower',
                    url: 'fruits.com'
                })
            })

            it('Blog with most likes is displayed first', () => {
                cy.contains('Blog one').contains('view').click()
                cy.contains('Blog two').contains('view').click()
                cy.contains('.expandedBlog', 'Blog one').contains('like').click()
                cy.get('.expandedBlog').eq(0).should('contain', 'Blog one')
                cy.get('.expandedBlog').eq(1).should('contain', 'Blog two')
                cy.contains('.expandedBlog', 'Blog two').contains('like').click()
                cy.contains('.expandedBlog', 'Blog two').contains('like').click()
                cy.wait(5000)
                cy.get('.expandedBlog').eq(0).should('contain', 'Blog two')
                cy.get('.expandedBlog').eq(1).should('contain', 'Blog one')
            })
        })
    })
})