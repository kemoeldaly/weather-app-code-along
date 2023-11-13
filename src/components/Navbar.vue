<template>
    <header class="sticky top-0 bg-primary shadow-lg">
        <nav class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6">
            
              <RouterLink :to="{ name: 'home' }">
                <div class="flex items-center gap-3">
                  <Router><i class="fa-sharp fa-regular fa-sun fa-bounce fa-2xl" style="color: #f9e78b;"></i></Router>
                  <p class="text-2xl">The Local Weather</p>
                </div>
              </RouterLink>

              <div class="cursor-pointer flex gap-3 flex-1 justify-end">
                  <RouterLink to="{ name: 'dashboard'}"><i class="fa-sharp fa-solid fa-bars fa-beat fa-2xl" style="color: #111112;"></i></RouterLink>

                  
                    <i  class="cursor-pointer fa-solid fa-circle-info fa-flip fa-2xl" style="color: #111212"  @click="toggleModal"></i>

                  <i :class="'hover:text-secondary duration-150 cursor-pointer fa-solid fa-plus fa-fade fa-2xl'"
                  @click="addCity"
                  v-if="route.query"
                  style="color: #0c0d0d "
                  ></i>
                  <i class="fas fa-sign-out-alt text-xl duration-150 hover:text-secondary cursor-pointer"
                  @click="log_out" 
                  
                  ></i>
              </div>
               <Modal
              :modalActive="modalActive"
              @close-modal="toggleModal"
              
              >
              <div class="text-black">
                <h1 class="text-2xl mb-1">About:</h1>
                <p class="mb-4">
                  The Local Weather allows you to track the current and future weather of cities of youyr choice.
                </p>
                <h2 class="text-2xl">How it works:</h2>
                <ol class="list-decimal list-inside mb-4">
                  <li>
                    Search for your city by entering the name into the search bar.
                  </li>
                  <li>
                    Select a city within the results, this will take you to the current weather for that location.
                  </li>
                  <li>
                    Track the city by clicking the "+" icon in the top right corner. This will save the city to view later.
                  </li>
                </ol>
                <h2 class="text-2xl">Removing Cities</h2>
                <p>If you don't wangt to continue tracking a location, select the city from the dashboard. At the bottom of the page, select the "Remove city" icon.</p>
              </div>
              </Modal>
        </nav>
    </header>
</template>

<script setup>
import { ref } from "vue";
import Modal from './Modal.vue'
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { uid } from "uid";
import { useAuth0} from "@auth0/auth0-vue"

// instabtiate router
const route = useRoute();
const router = useRouter();

// add city function
const myCities = ref([])
const addCity = () => {
  if (localStorage.getItem("myCities")) {
    myCities.value = JSON.parse(localStorage.getItem("myCities"))
  }

  const location = {
    id: uid(),
    // we establish these params in router/index.js
    state: route.params.state,
    city: route.params.city,
    coords: {
      lat: route.query.lat,
      lon: route.query.lon
    }

  }

  myCities.value.push(location);
  localStorage.setItem(
    "myCities", JSON.stringify(myCities.value)
  )

  // creates an object that includes a route request
  let query = Object.assign({}, route.query)
  // remove the preview query param from the URL
  delete query.preview;
  // add ID attribute to our location
  query.id = location.id;
  router.replace( {query} )

  console.log(localStorage.getItem("myCities"))
}

const modalActive = ref(null);
const toggleModal = () => {
    modalActive.value = !modalActive.value
}

// Logout function
const { isAuthenticated, logout } = useAuth0();
const log_out = () => {
  logout({ returnTo: window.location.origin });
}

</script>

