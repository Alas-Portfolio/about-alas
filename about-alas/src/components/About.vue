<template>
    <section class="carousel-section">
      <div class="carousel-container">
        <div class="carousel-inner">
          <div 
            v-for="(item, index) in carouselItems" 
            :key="index" 
            class="carousel-item" 
            :class="{ active: activeIndex === index }"
          >
            <img :src="item.imgSrc" class="d-block w-100" :alt="'Project Showcase ' + (index + 1)">
            <div class="carousel-caption fade-in">
              <h5>{{ item.title }}</h5>
              <p>{{ item.description }}</p>
            </div>
          </div>
        </div>
        <!-- Use @click for event binding in Vue.js -->
        <button class="carousel-control-prev" @click="prevSlide">Prev</button>
        <button class="carousel-control-next" @click="nextSlide">Next</button>
      </div>
    </section>
    
    <div class="container">
      <div class="home-container">
        <div class="profile-section slide-in">
          <div class="profile-image">
            <img src="../images/my-image.jpg" alt="Profile">
          </div>
          <div class="profile-content">
            <h2>Alastair O. Ferrer</h2>
            <p class="subtitle">WEB DESIGN AND DEVELOPER</p>
            <p class="description">
              He is endeavor through different kinds of certain task given to him. 
              Collaborate with co-employees and empathy. Open-minded to improve his skills and values and eager to learn different.
              He develops competencies and humbleness through his future co-employees.
            </p>
            <div class="contact-info">
              <p><i class="fas fa-phone"></i> +63 935 609 4847</p>
              <p><i class="fas fa-map-marker-alt"></i> Cabuyao Laguna, B24 L20 St. Joseph 7, Brgy. Marinig, Cabuyao City Laguna</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
  export default {
    name: 'About',
    data() {
      return {
        activeIndex: 0, 
        carouselItems: [
          {
            title: 'Laravel',
            description: 'Proficient in creating responsive and dynamic websites using modern web technologies.',
            imgSrc: require('../images/my-image.jpg'),
          },
          {
            title: 'React',
            description: 'Experienced in managing projects from conception to completion, ensuring timely delivery and quality.',
            imgSrc: require('../images/my-image.jpg'),
          },
          {
            title: 'Javascript',
            description: 'Experienced in managing projects from conception to completion, ensuring timely delivery and quality.',
            imgSrc: require('../images/my-image.jpg'),
          },
          {
            title: 'HTML',
            description: 'Experienced in managing projects from conception to completion, ensuring timely delivery and quality.',
            imgSrc: require('../images/my-image.jpg'),
          },
          {
            title: 'CSS',
            description: 'Experienced in managing projects from conception to completion, ensuring timely delivery and quality.',
            imgSrc: require('../images/my-image.jpg'),
          },
          {
            title: 'jQuery',
            description: 'Experienced in managing projects from conception to completion, ensuring timely delivery and quality.',
            imgSrc: require('../images/my-image.jpg'),
          },
        ],
      };
    },
    mounted() {
      this.initializeCarousel();
    },
    methods: {

      initializeCarousel() {
        setInterval(() => {
          this.activeIndex = (this.activeIndex + 1) % this.carouselItems.length;
        }, 3000); 
      },
  
      prevSlide() {
        this.activeIndex = (this.activeIndex - 1 + this.carouselItems.length) % this.carouselItems.length;
      },
  
      nextSlide() {
        this.activeIndex = (this.activeIndex + 1) % this.carouselItems.length;
      },
  
      changeCarouselItem(index) {
        this.activeIndex = index;
      },
    },
  };
  </script>
  
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:wght@700&family=Playfair+Display:wght@700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css");

.home-container {
    margin-top: 200px;
}

.overlay h1 {
    font-size: 50px;
    font-family: 'Bodoni Moda', 'Playfair Display', serif;
    font-weight: bold;
}

.overlay h2 {
    font-family: 'Montserrat', sans-serif;
    font-weight: 100;
}

.buttons .btn {
    margin: 10px;
    padding: 10px 20px;
    background: #9b0d54;
    border: none;
    color: white;
    cursor: pointer;
    border-radius: 20px;
    animation: fadeIn 1s ease-in-out;
}

.profile-section {
    display: flex;
    align-items: center;
    background-color: #2a2a2a;
    padding: 40px;
    border-radius: 8px;
    margin: -10px;   
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    animation: slideIn 1s ease-in-out;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
}

.profile-image img {
    width: 200px;
    height: auto;
    border-radius: 8px;
}

.profile-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 100px;
    flex: 1;
}

.profile-content h2 {
    font-family: 'Bodoni Moda', 'Playfair Display', serif;
    font-size: 22px;
    font-weight: bold;
    margin: 0;
}

.subtitle {
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    color: #bbb;
    margin-bottom: 15px;
}

.description {
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    line-height: 1.5;
    color: #ddd;
    margin-bottom: 20px;
}

.contact-info p {
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    margin: 5px 0;
    display: flex;
    align-items: center;
    gap: 8px;
}

.contact-info i {
    color: #ffcc00;
}

@media (max-width: 768px) {
    .profile-section {
        flex-direction: column;
        text-align: center;
    }

    .profile-image img {
        width: 150px;
    }

    .profile-content {
        margin-left: 0;
        margin-top: 20px;
    }
}


.carousel-section {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    position: relative;
    overflow: hidden;
}

.carousel-container {
    width: 100%;
    position: relative;
    overflow: hidden;
}

.carousel-inner {
    display: flex;
    transition: transform 0.5s ease-in-out;
}

.carousel-item {
    display: none;
    width: 100%;
    height: 100%;
}

.carousel-item.active {
    display: block;
}

.carousel-item img {
    width: 100%;
    height: auto;
    border-radius: 15px;
}

.carousel-caption {
    font-family: 'Montserrat', sans-serif;
    background: rgba(0, 0, 0, 0.6);
    padding: 15px;
    border-radius: 10px;
    transition: opacity 0.5s ease-in-out;
}

.carousel-caption h5 {
    font-weight: bolder;
}

.carousel-control-prev, .carousel-control-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    border: none;
    color: white;
    font-size: 24px;
    padding: 10px;
    cursor: pointer;
    z-index: 10;
}

.carousel-control-prev {
    left: 10px;
}

.carousel-control-next {
    right: 10px;
}

.fade-in {
    animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
