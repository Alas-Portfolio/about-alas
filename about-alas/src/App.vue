<template>
  
  <div class="container">
    <nav class="navbar">
      <div class="nav-links">
        <router-link to="/home">Home</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/contact">Contact</router-link>
        <router-view/>
      </div>
    </nav>
    <section class="hero">
    
    </section>
    
  </div>
</template>

<script>
 import Home from './components/Home.vue';
 export default{
  components: {
    Home
  }
 }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:wght@700&family=Playfair+Display:wght@700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

  
*{
    margin: 0;
    padding: 0;
  }
  
.hero{
  height: 100%;
  width: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.942) , rgba(0, 0, 0, 0.942)), url('./images/computer-background-image.jpg') no-repeat center center/cover;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0; 
  transition: background 0.5s ease;  

}
.container {
  font-family: Arial, sans-serif;
  text-align: center;
  color: #fff;
}

.navbar {
  display: flex;
  justify-content: center;
  padding: 20px 0;
  position: absolute;
  width: 100%;
  z-index: 1;
  transition: background-color 0.3s ease;
}

.nav-links a {
  font-family: 'Montserrat', sans-serif;
  margin: 0 15px;
  color: white;
  text-decoration: none;
  font-weight: bold;
  padding: 10px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.nav-links a:hover {
  background-color: rgba(0, 0, 0, 0.5);
  transform: scale(1.1);
}



.overlay {
  text-align: center;
  animation: slideIn 1s ease-out;
}

.overlay h1 {
  font-size: 50px;
  font-family: 'Bodoni Moda', 'Playfair Display', serif;
  font-weight: bold;
  opacity: 0;
  animation: fadeIn 1s forwards;
}

.overlay h2 {
  font-family: 'Montserrat', sans-serif;
  font-weight: 100;
  opacity: 0;
  animation: fadeIn 1.5s forwards;
}

.buttons {
  margin-top: 20px;
}

.buttons .btn {
  margin: 10px;
  padding: 10px 20px;
  background: #9b0d54;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 20px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.buttons .btn:hover {
  background-color: #7a0a42;
  transform: scale(1.1);
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}
</style>
