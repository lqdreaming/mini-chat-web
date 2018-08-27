<template>
    <div>
        <div id="method1">
            <p>{{ count
                < 0 ? '+' : '-'}} {{count + 1}}</p>
                    <button @click='count ++'>增加</button>
                    <button @click='count --'>减少</button>
        </div>
        <div id="method2">
            <input type="text" v-model='message'>
            <h1>{{ message.split('').reverse().join('') }}</h1>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            count: 0,
            message: ""
        }
    }
}
</script>