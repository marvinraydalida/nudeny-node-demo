<template>
    <div class = "card">
        <div class = "image-container">
            <img :src="this.url" alt="">
        </div>
        <h1>{{ title }}</h1>
    </div>
</template>

<script>
export default{
    props: ['url', 'title'],

}
</script>

<style scoped>
.card{
    width: 300px;
    height: 400px;
    padding: 20px;
    margin-bottom: 20px;
    box-sizing: border-box;
    background: rgb(255, 252, 234);
    border-radius: 15px;
    box-shadow: 1px 5px 5px 3px rgba(0,0,0,0.16);
    -webkit-box-shadow: 1px 5px 5px 3px rgba(0,0,0,0.16);
    -moz-box-shadow: 1px 5px 5px 3px rgba(0,0,0,0.16);
}

.image-container {
    width: 95%;
    height: 70%;
    margin: auto;
    border: 1px solid yellow;
}

.image-container img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.card h1 {
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
}
</style>