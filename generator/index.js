function renderFiles (api, opts) {

  const fs = require('fs')

  // 通过preset的形式配置opts.router，这里则不需要
  const routerPath = api.resolve('./src/router.js')
  opts.router = opts.router || fs.existsSync(routerPath)

  const filesToDelete = [
    'src/assets/logo.png',
    'src/views/About.vue',
    'src/views/Home.vue',
  ]

  console.log('\n[custom-tpl plugin tips]\n \t GeneratorAPI options:', opts)

  if (opts.replaceTemplates) {

    // https://github.com/vuejs/vue-cli/issues/2470
    api.render(files => {
      Object.keys(files)
        .filter(name => filesToDelete.indexOf(name) > -1)
        .forEach(name => delete files[name])
    })

    api.render('./templates/base')

    if (opts.router) {
      // 替换掉路由文件
      api.render('./templates/sp')
    }else{
    }

  }
}

function addDependencies (api) {
  api.extendPackage({
    dependencies: {
      "axios": "^0.18.0",
    },
    devDependencies: {
      // "less": "^3.0.4",
      // "less-loader": "^4.1.0",
    }
  })
}

module.exports = (api, opts, rootOpts) => {

  addDependencies(api)

  renderFiles(api, opts)
}