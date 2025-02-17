<template>
  <section class="carousel-section">
    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
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

    </div>
  </section>
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
          imgSrc: require('../images/laravel.png'),
        },
        {
          title: 'React',
          description: 'Experienced in managing projects from conception to completion, ensuring timely delivery and quality.',
          imgSrc: require('../images/react.jpg'),
        },
        {
          title: 'Javascript',
          description: 'Experienced in managing projects from conception to completion, ensuring timely delivery and quality.',
          imgSrc: require('../images/js.jpg'),
        },
        {
          title: 'HTML',
          description: 'Experienced in managing projects from conception to completion, ensuring timely delivery and quality.',
          imgSrc: require('../images/html.jpg'),
        },
        {
          title: 'CSS',
          description: 'Experienced in managing projects from conception to completion, ensuring timely delivery and quality.',
          imgSrc: require('../images/css.jpg'),
        },
        {
          title: 'jQuery',
          description: 'Experienced in managing projects from conception to completion, ensuring timely delivery and quality.',
          imgSrc: require('../images/jQuery.png'),
        },
      ],
      intervalId: null,
    };
  },
  mounted() {
    this.startCarousel();
  },
  beforeDestroy() {
    clearInterval(this.intervalId); // Clean up interval when component is destroyed
  },
  methods: {
    startCarousel() {
      this.intervalId = setInterval(() => {
        this.activeIndex = (this.activeIndex + 1) % this.carouselItems.length;
      }, 5000); // Change slide every 5 seconds
    },

  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');


.carousel-section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  position: relative;
  overflow: hidden;
}

.carousel-inner {
  display: flex;
  transition: transform 1s ease-in-out; 
}


.carousel-item {
  display: none;
  width: 100%;
  height: 100%;
  animation: slidingEffect .5s ease-in-out;
}

@keyframes slidingEffect {
  0%{
    transform: translateX(-100%);
  }
 100%{
    transform: translateX(0%);
  }
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
