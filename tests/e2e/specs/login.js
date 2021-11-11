// TODO: test store clear by logging with high auth, logout, then login with base auth - check that page has no previous data
// TODO: test trying to access moderator, logging in as user, popping request permissions modal - once behavior implemented
describe('Login and redirect flows', () => {
  describe('Failed login', () => {
    beforeEach(() => {
      cy.server()
      cy.route({
        method: 'POST',
        url: '/api/v0/auth/login',
        status: 401,
        response: '{"error":"Login failed!"}', // json object stringified!
      });
    })
    it('from root - tries to access an authorized gated route, fails login in through pop-up then sees error message in pop-up', () => {
      cy.visit('/')
      cy.get("[data-testid='app-dialog-content']").should('not.exist')
      cy.get("[data-testid='hamburger-menu-toggle']").click()
      cy.get("[data-testid='user-page']").click()
      cy.get("[data-testid='app-dialog-content']").should('exist')
      cy.get("[data-testid='nav-drawer']").should('not.be.visible')
      cy.location('pathname').should('eq', '/')
      cy.get(".v-alert").should('not.exist')

      cy.get("[data-testid='login-username']").should('be.visible').type('baduser')
      cy.get("[data-testid='login-password']").should('be.visible').type('badpw')
      cy.get("[data-testid='login-submit']").click()

      cy.location('pathname').should('eq', '/')
      cy.get("[data-testid='nav-drawer']").should('not.be.visible')
      cy.get("[data-testid='login-button']").should('exist')
      cy.get("[data-testid='register-button']").should('exist')
      cy.get("[data-testid='logout-button']").should('not.exist')
      cy.get("[data-testid='app-dialog-content']").should('exist')
      cy.get(".v-alert").should('exist')
    })
    it('from login page - fails login', () => {
      cy.visit('/login')
      cy.get("[data-testid=login-username]")
        .should('be.visible')
        .type('baduser')
      cy.get("[data-testid='login-password']")
        .should('be.visible')
        .type('badpw')
      cy.get("[data-testid='login-submit']").click()

      cy.location('pathname').should('eq', '/login')
      cy.get("[data-testid='nav-drawer']").should('not.be.visible')
      cy.get("[data-testid='app-dialog-content']").should('not.exist')
      cy.get("[data-testid='login-button']").should('exist')
      cy.get("[data-testid='register-button']").should('exist')
      cy.get("[data-testid='logout-button']").should('not.exist')
      cy.get(".v-alert").should('exist')
    })
  })
  describe('Success from root', () => {
    beforeEach(() => {
      cy.server()
      cy.route('POST', '/api/v0/auth/login', () => {
        return { token: 'jwt-token', user: { username: 'foo', role: 'user' } }
      }).as('postLoginSuccess')
    })
    it('Visits the app root url in unauthenticated state', () => {
      cy.visit('/')
      cy.get("[data-testid='app-bar-context-title']").contains('Home')
      cy.get("[data-testid='app-dialog-content']").should('not.exist')
      cy.get("[data-testid='nav-drawer']").should('not.be.visible')
      cy.get("[data-testid='login-button']").should('exist')
      cy.get("[data-testid='register-button']").should('exist')
      cy.get("[data-testid='logout-button']").should('not.exist')
    })
    it('tries to access an authorized gated route, successfully logs in through pop-up then redirected to authorized gated route', () => {
      cy.visit('/')
      cy.get("[data-testid='app-dialog-content']").should('not.exist')
      cy.get("[data-testid='hamburger-menu-toggle']").click()
      cy.get("[data-testid='user-page']").click()
      cy.get("[data-testid='app-dialog-content']").should('exist')
      cy.get("[data-testid='nav-drawer']").should('not.be.visible')
      cy.location('pathname').should('eq', '/')
      cy.get("[data-testid='login-username']").should('be.visible').type('user')
      cy.get("[data-testid='login-password']").should('be.visible').type('pw')
      cy.get("[data-testid='login-submit']").click()
      cy.location('pathname').should('eq', '/user')
      cy.get("[data-testid='login-button']").should('not.exist')
      cy.get("[data-testid='register-button']").should('not.exist')
      cy.get("[data-testid='logout-button']").should('exist')
    })
    it('tries to access an unauthorized gated route, successfully logs in through pop-up then redirected to authorized gated route', () => {
      cy.visit('/')
      cy.get("[data-testid='app-dialog-content']").should('not.exist')
      cy.get("[data-testid='hamburger-menu-toggle']").click()
      cy.get("[data-testid='moderator-page']").click()
      cy.get("[data-testid='app-dialog-content']").should('exist')
      cy.get("[data-testid='nav-drawer']").should('not.be.visible')
      cy.location('pathname').should('eq', '/')
      cy.get("[data-testid='login-username']").should('be.visible').type('user')
      cy.get("[data-testid='login-password']").should('be.visible').type('pw')
      cy.get("[data-testid='login-submit']").click()
      cy.location('pathname').should('eq', '/user')
      cy.get("[data-testid='login-button']").should('not.exist')
      cy.get("[data-testid='register-button']").should('not.exist')
      cy.get("[data-testid='logout-button']").should('exist')
    })
  })
  describe('Success from Login page', () => {
    it('Visits the login page in unauthenticated state', () => {
      cy.server()
      cy.route('POST', '/api/v0/auth/login', () => {
        return { token: 'jwt-token', user: { username: 'foo', role: 'user' } }
      }).as('postLoginSuccess')

      cy.visit('/login')
      cy.get("[data-testid=login-username]")
        .should('be.visible')
        .type('user')

      cy.get("[data-testid='login-password']")
        .should('be.visible')
        .type('pw')

      cy.get("[data-testid='login-submit']").click()

      cy.location('pathname').should('eq', '/user')
      cy.get("[data-testid='login-button']").should('not.exist')
      cy.get("[data-testid='register-button']").should('not.exist')
      cy.get("[data-testid='logout-button']").should('exist')
    })
  })
})