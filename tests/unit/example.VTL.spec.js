import '@testing-library/jest-dom'
import { fireEvent, prettyDOM, screen } from '@testing-library/vue'
import { renderWithEcosystem } from '../render'
import VuetifyDemoComponent from '@/components/modal/ModalLoginRegister.vue'
import Vue from 'vue'


describe('Vuetify, Vuex, Vue-Router', () => {


  it('should set [data-app] attribute on outer most div', () => {
    const { container } = renderWithEcosystem(VuetifyDemoComponent)

    expect(container).toHaveAttribute('data-app', 'true')
  })

  it('renders a Vuetify-powered component', async () => {
    const { getByText } = renderWithEcosystem(VuetifyDemoComponent)

    await fireEvent.click(getByText('login'))


    // TODO: this is working but not formatted exactly
    console.log(prettyDOM(getByText('login')))
    expect(getByText('login')).toBeVisible()
    //   .toMatchInlineSnapshot(`
    //   <a
    //     aria-selected="true"
    //     class="v-tab v-tab--active"
    //     href="#login"
    //     role="tab"
    //     tabindex="0"
    //   >
    //     login
    //     <i
    //       aria-hidden="true"
    //       class="v-icon notranslate mdi mdi-login theme--light"
    //     />
    //   </a>
    // `)
  })

  it('switches tabs and displays selected content', async () => {
    const transitionStub = () => ({
      // render: function (h) {
      render: function () {
        return this.$options._renderChildren
      }
    })
    const { getByRole } = renderWithEcosystem(
      VuetifyDemoComponent,
      {
        stubs: {
          // transition: false

          // TODO: the following will work to get the expected behavior, but:
          // [Vue warn]: Multiple root nodes returned from render function. Render function should return a single root node
          // Ignoring it for now...
          transition: transitionStub()
        }
      }
    )
    const loginContentId = 'content-login-form'
    const registerContentId = 'content-register-form'

    const loginFormTabButton = getByRole('tab', { name: 'login' })
    const registerFormTabButton = getByRole('tab', { name: 'register' })

    // all tab content is null until a tab is selected
    expect(screen.queryByTestId(loginContentId)).toBeNull()
    expect(screen.queryByTestId(registerContentId)).toBeNull()

    await fireEvent.click(loginFormTabButton)
    // this is imperative to get transitions to work
    await Vue.nextTick()

    expect(screen.queryByTestId(loginContentId)).toBeVisible()
    expect(screen.queryByTestId(registerContentId)).toBeNull()

    await fireEvent.click(registerFormTabButton)
    await Vue.nextTick()

    expect(screen.queryByTestId(registerContentId)).toBeVisible()
    expect(screen.queryByTestId(loginContentId)).not.toBeVisible()

    await fireEvent.click(loginFormTabButton)
    await Vue.nextTick()

    expect(screen.queryByTestId(loginContentId)).toBeVisible()
    expect(screen.queryByTestId(registerContentId)).not.toBeVisible()
  })
})