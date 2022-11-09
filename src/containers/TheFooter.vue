<template>
  <CFooter :fixed="false">
    <div>
      <a class="footer_color" href="#" target="_blank">conapdis</a>
      <span class="ml-1">&copy; {{new Date().getFullYear()}}</span>
    </div>
    <div class="ml-auto">
      <span class="mr-1">Powered by</span>
      <a class="footer_color" href="#" target="_blank">@rrau Technology HDD</a>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: 'TheFooter'

}
</script>
<style scoped>
  .footer_color{
    color:#EFAF30;
  }
</style>
