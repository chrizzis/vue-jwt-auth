import { render as r } from '@testing-library/vue'
import { routes } from '@/router'
import { getDefaultStore } from '@/store'
import Vuetify from 'vuetify'

// Custom container to integrate Vuetify with Vue Testing Library.
// Vuetify requires you to wrap your app with a v-app component that provides
// a <div data-app="true"> node.
function renderWithVuetify(component, options, callback) {
  const root = document.createElement('div')
  root.setAttribute('data-app', 'true')

  return r(
    component,
    {
      container: document.body.appendChild(root),
      // for Vuetify components that use the $vuetify instance property
      vuetify: new Vuetify(),
      ...options,
    },
    callback,
  )
}

export const renderWithEcosystem = (ui, options) => {
  // VTL example uses POJO of entire store, but no examples for modules
  // const store = getDefaultStore(options)
  const store = getDefaultStore()

  // TODO: modules errors

  // store.modules.authentication.state.user = {}
  // store.modules.alert.state.type = ''
  // store.modules.alert.state.message = ''
  // store.modules.users.state.currentPage = 0
  // store.modules.catalog.state.fullyLoaded = false

  // return r(
  //   ui,
  //   {
  //     routes,
  //     store
  //   }
  // )
  return renderWithVuetify(
    ui,
    {
      // VTL example uses POJO for routes
      routes,
      store: {
        ...store,
        // ...options?.store || {}, // TODO: does this work?
      },
      ...options, // stubs, store, routes
    }
  )
}
