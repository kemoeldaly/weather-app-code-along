<template>
    <div class="flex flex-col flex-1 items-center">
        <div 
        v-if="route.query.preview"
        class="text-black p-4 bg-slate-300 w-full text-center">
                <p>You are previewing this location, please click the "+" icon to track this city.
            </p>
        </div>
        <div>

            <div class="max-w-screen w-full py-12 flex justify-center bg-slate-500 shadow-lg">
                <div class="max-w-screen-md">
                    <div class="mx-8 text-white">
                        <h2 class="mb-4">Hourly Weather</h2>
                        <div class="flex gap-10 overflow-x-scroll">
                            <div
                                v-for="hourData in weatherData.hourly"
                                :key="hourData.dt"
                                class="flex flex-col gap-4 items-center"
                            >
                                <p class="whitespace-nowrap text-md">
                                    {{  new Date(
                                        hourData.currentTime).toLocaleTimeString("en-us", {
                                            hour: "numeric",
                                        }) }}
                                </p>
                                <img
                                class="w-auto h-[50px] object-cover"
                                :src="
                                `http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png
                                `"
                                alt="weather type"
                                />
                                <p class="text-xl">
                                    {{ Math.round(hourData.temp) }}&deg;
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- main tiles -->
        <div class="flex flex-col items-center text-white py-12">
            <h1 class="text-4xl mb-2">{{  route.params.city  }}</h1>
            <p class="text-8xl mb-8">
                {{  Math.round(weatherData.current.temp) }}&deg;
            </p>
            <p>
                Feels like {{  Math.round(weatherData.current.feels_like) }}&deg;
            </p>
            <p class="capitalize">
                {{ weatherData.current.weather[1].description }}
            </p>
            <img 
            class="w-[150px] h-auto"
            :src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
        />
        </div>
        <hr class="border-white border-opacity-10 border w-full">

        <div class="max-w-screen-md w-full py-12">
            <div class="max-8 text-white">
                <h2 class="mb-4">7 Day Forecast</h2>
                <div 
                v-for="day in weatherData.daily"
                :key="day.dt"
                class="flex items-center"
                >
                <p class="flex-1">
                   {{ new Date(day.dt * 1000).toLocaleDateString(
                    "en-us",
                    {
                        weekday:"long",
                    }
                   ) }}
                </p>
                <img 
                class="w-[150px] h-[50px] object-cover"
                src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`" alt="weather icon" >
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const getWeatherData = async () => {
    try {
        const weatherData = await axios.get(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.lat}&lon=${route.query.lon}&appid=62b67d25daaa97e799082e80492d6628&units=imperial`
        );

        console.log(weatherData)

        const localOffset = new Date().getTimezoneOffset() * 600000; 
        const utc = weatherData.data.current.dt * 1000 + localOffset;
        weatherData.data.currentTime = utc + 1000 * weatherData.data.timezone_offset;

        weatherData.data.hourly.forEach((hour) => {
            const utc = hour.dt * 1000 + localOffset;
            hour.currentTime = utc + 1000 * weatherData.data.timezone_offset
        })

        await new Promise((res) => setTimeout(res, 1000));

        return weatherData.data;
    } catch (err) {
        console.log(err)
    }
}

const weatherData = await getWeatherData();

// add Remove City functionality
</script>

