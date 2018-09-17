function renderFiles (api, opts) {

  const fs = require('fs')
  const routerPath = api.resolve('./src/router.js')
  opts.router = fs.existsSync(routerPath)

  console.log('\n[custom-tpl plugin tips]\n \t GeneratorAPI options:', opts)

  if (opts.replaceTemplates) {

    api.render('./templates/base')

    // let files = {
    //   // 这个logo直接删除
    //   // './src/assets/logo.png': '../templates/src/assets/logo.png'

    //   './src/App.vue': './templates/base/src/App.vue',
    // }

    if (opts.router) {
      // files['./src/router.js'] = './templates/sp/src/router.js'
      api.render('./templates/sp')
    }else{
    }

    // api.render(files, opts)

  }
}

function addDependencies (api) {
  api.extendPackage({
    dependencies: {
      "axios": "^0.18.0",
      "less-loader": "^2.2.3",
    },
    devDependencies: {

    }
  })
}

module.exports = (api, opts, rootOpts) => {

  addDependencies(api)

  renderFiles(api, opts)
}