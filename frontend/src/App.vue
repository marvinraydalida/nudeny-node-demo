<template>
  <div class="modal-backdrop" v-show="isModalShown">
    <div class="modal-container">
      <form action="" enctype="multipart/form-data" ref="form">
        <input type="text" name="title" placeholder="title" />
        <input type="file" name="files" />
        <button @:click="upload">Upload</button>
      </form>
    </div>
  </div>

  <div class="card-container">
    <Card v-for="(card, index) in cards" :url="card.url" :title="card.title" :key="index" />
  </div>

  <div id="upload-button" @click="toggleModal">
    <h1>🚀</h1>
  </div>

  <div v-if="isSuccess" id="toast" class="success" @click="toggleToast" v-show="isToastShown">
    <h1>Uploaded successfully 🎉</h1>
  </div>
  <div v-else="isSuccess" id="toast" class="failed" @click="toggleToast" v-show="isToastShown">
    <h1>Upload failed ❌</h1>
  </div>
</template>

<script>
import Card from './components/Card.vue'

export default {
  data() {
    return {
      cards: [],
      isModalShown: false,
      isToastShown: false,
      isSuccess: false
    }
  },
  components: {
    Card
  },
  methods: {
    toggleModal() {
      this.isModalShown = !this.isModalShown;
      if(this.isToastShown) {
        this.toggleToast()
      }
    },
    toggleToast() {
      this.isToastShown =  !this.isToastShown;
    },
    upload(event) {
      event.preventDefault();
      console.log(this.$refs.form);

      const formData = new FormData(this.$refs.form);

      fetch('http://localhost:3000/upload/', {
        method: "POST",
        body: formData
      })
        .then((response) => response.json())
        .then((data) => {
          this.cards = [...data]
          this.toggleToast()
          this.isSuccess = true
          console.dir(this.cards)
        })
        .catch((error) => {
          this.isSuccess = false
          this.toggleToast()
        })

        this.toggleModal()
    }
  }
}
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}

#upload-button {
  width: 100px;
  height: 100px;
  background-color: rgb(51, 235, 51);
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 5px 5px 3px rgba(0, 0, 0, 0.16);
  -webkit-box-shadow: 1px 5px 5px 3px rgba(0, 0, 0, 0.16);
  -moz-box-shadow: 1px 5px 5px 3px rgba(0, 0, 0, 0.16);
  cursor: pointer;
  transition: all 250ms ease-in-out;
  position: absolute;
  bottom: 20px;
  right: 20px;
}

#upload-button:hover {
  transform: scale(1.1);
}

#upload-button:hover::before {
  opacity: 1;
}

#upload-button:active {
  transform: scale(.9);
  background-color: rgb(35, 156, 35);
}

#upload-button::before {
  content: "Upload";
  position: absolute;
  transform: translateY(-75px);
  background-color: rgba(0, 0, 0, 0.863);
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  padding: 10px;
  border-radius: 5px;
  opacity: 0;
  transition: all 500ms ease-in-out;
}

#toast {
  width: 300px;
  padding: 10px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: .7rem;
  border-radius: 10px;
  position: absolute;
  bottom: 20px;
  left: 20px;
  cursor: pointer;
  text-align: center;
}

#toast.success{
  background-color: rgb(51, 235, 51);
}
#toast.failed {
  color: white !important;
  background-color: rgb(230, 41, 41);
}

.modal-backdrop {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.438);
}

.modal-container {
  width: 20vw;
  height: 40vh;
  background-color: white;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-container form {
  display: flex;
  flex-direction: column;
}


.modal-container form input {
  margin-bottom: 10px;
}

.modal-container form input[type="text"] {
  padding: 5px;
}

.modal-container form button {
  padding: 10px;
  background-color: greenyellow;
}

.card-container {
  width: 90vw;
  padding: 20px;
  margin: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>
