# vue-jwt-auth

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Deploy to Github
## config:
- create `gh-pages` branch and set up page in GitHub
- `deploy.sh` (remember to set correct master|main|gh-pages branches and repo)
- `public/404.html`
- `public/index.html`
- `vue.config.js`:`publicPath` (set repo)
- `package.json`:`yarn deploy`
- `.env`:`APP_BASE_URL` - TODO: (not implemented) can be set to localhost to test localserver|remoteclient integration
```
yarn deploy
```
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
