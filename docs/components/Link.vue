<template>
    <div class="flex justify-start items-center flex-wrap gap-3">
        <div v-for="link in links" class="w-60 dark:bg-gray-700 dark:bg-opacity-30  bg-gray-100 bg-opacity-20 rounded-md border-2 border-[--vp-custom-block-details-border] 
            flex justify-start items-center gap-3 px-2 overflow-hidden hover:border-blue-400 dark:hover:border-yellow-400 cursor-pointer group
            " @click="jump(link.link)">
            <img :src="link.avatar" class="w-14 h-14 rounded-full">
            <div class="flex flex-col py-2 justify-center items-start h-20">
                <div class="font-bold group-hover:text-blue-500 dark:group-hover:text-yellow-400">{{ link.name }}</div>
                <div class="text-xs max-h-10 text-gray-400 text-balance">{{ link.desc }}</div>
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
interface Link {
    name: string,
    link: string,
    avatar: string,
    desc?: string,
}
const props = defineProps({
    links: Array<Link>
})

const jump = (url: Link["link"]) => {
    window.open(url, '_blank');
}
</script>