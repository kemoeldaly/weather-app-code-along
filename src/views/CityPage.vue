<template>
    <div>
        <Suspense>
            <AsyncCity />
            <template #fallback>
                Trembling with suspense...
            </template>

        </Suspense>
    </div>
</template>

<script setup>
import AsyncCity from '../components/AsyncCity.vue'
</script>