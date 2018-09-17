<template>
  <div id="app">
    <%_ if (rootOptions.router) { _%>
    <router-view/>
    <%_ } else { _%>
    <hello/>
    <%_ } _%>
  </div>
</template>

<script>
<%_ if (!rootOptions.router) { _%>
import hello from './views/Hello'
<%_ } _%>

export default {
  name: 'App',
  <%_ if (!rootOptions.router) { _%>
  components: {
    hello
  },
  <%_ } _%>
}
</script>

<style>

</style>
