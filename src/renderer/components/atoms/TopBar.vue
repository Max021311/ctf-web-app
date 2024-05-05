<template>
  <nav
    class="bg-gray-900 z-0 px-2 flex gap-4 items-center w-screen h-12"
  >
    <NavBarMenu class='hidden md:flex gap-2' />
    <div class='ml-auto md:hidden block'>
      <div
        class='hover:opacity-50'
        @click='showMenu = !showMenu'
      >
        <MenuIcon />
      </div>
      <div
        v-if='showMenu'
        :class="`transition top-0 transform origin-top-right absolute inset-x-0 ${ showMenu ? 'block duration-100 ease-in-out opacity-100 scale-100' : 'hidden duration-150 ease-out opacity-0 scale-95'}`"
      >
        <Card classes='bg-gray-900'>
          <div class='flex justify-end'>
            <div class='hover:opacity-50' @click='showMenu = !showMenu'>
              <XCircleIcon />
            </div>
          </div>
          <NavBarMenu/>
        </Card>
      </div>
    </div>
  </nav>
</template>

<script>
import NavBarMenu from './nav-bar-menu.vue'
import MenuIcon from './../icons/menu.vue'
import XCircleIcon from './../icons/x-circle.vue'
import Card from './card.vue'

export default {
  components: {
    NavBarMenu,
    MenuIcon,
    Card,
    XCircleIcon
  },
  data () {
    return {
      showMenu: false
    }
  }
}
</script>
