import { defineStore } from "pinia";
import { ref } from "vue";

export const useStoreBase = defineStore("base", () => {

    const test = ref(1);

    function addTest() {
        test.value++;
    }

    return {
        test,
        addTest
    }

});