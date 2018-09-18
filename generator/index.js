function renderFiles (api, opts) {

  const fs = require('fs')
  const routerPath = api.resolve('./src/router.js')
  opts.router = fs.existsSync(routerPath)

  console.log('\n[custom-tpl plugin tips]\n \t GeneratorAPI options:', opts)

  if (opts.replaceTemplates) {

    api.render('./templates/base')

    // 删除默认的几个文件
    fs.unlink('./src/assets/logo.png')
    fs.unlink('./src/views/About.vue')
    fs.unlink('./src/views/Home.vue')
    
    if (opts.router) {
      // files['./src/router.js'] = './templates/sp/src/router.js'
      api.render('./templates/sp')
    }else{
    }

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