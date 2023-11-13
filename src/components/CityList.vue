<template>
    <div v-for="city in myCities" :key="city.id" class="bg-slate-500">
        <City :city="city" @click="viewCity(city)" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios'
import City from './city.vue'
import { useRouter } from 'vue-router';

// TODO - add view city button functionality
const myCities = ref([])
const getCities = async () => {
    if (localStorage.getItem("myCities")) {
        myCities.value = JSON.parse(localStorage.getItem("myCities"))
    }

    const requests = []
    myCities.value.forEach((city) => {
        requests.push(
           axios.get(
            `https://api.openweathermap.org/data/3.0/onecall?lat=${city.coords.lat}&lon=${city.coords.lon}&appid=cea09b15f4257b62a7b344d701a1430e&units=imperial`
           ) 
        )
    })
// make a promise that waits until all requests are done
const weatherData = await Promise.all(requests)
console.log(weatherData);

weatherData.forEach((value, idx) => {
    myCities.value[idx].weather = value.data
})
}

await getCities();

const router = useRouter();
const viewCity = (city) => {
    router.push({
        name: "city",
        params: { state: city.state, city: city.city },
        query: {
            id: city.id,
            lat: city.coords.lat,
            lon: city.coords.lon,
        }
    })
}

</script>

