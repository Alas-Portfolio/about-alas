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

 
  <section class="all-projects">
    <div class="container">
      <h2 class="section-title">All Projects</h2>
      <div class="projects-grid">
        <div 
          class="project-card" 
          v-for="(project, index) in projects" 
          :key="index"
        >
          <img :src="project.img" :alt="project.title" class="project-img" />
          <h3>{{ project.title }}</h3>
          <p>{{ project.description }}</p>
          <a 
            :href="project.url" 
            target="_blank" 
            rel="noopener" 
            class="project-button"
          >
            View Project
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AboutPage',
  data() {
    return {
      activeIndex: 0,
      carouselItems: [
        {
          title: 'Laravel',
          description: "Experienced in laravel's ORM and MVC Model-View-Controller.",
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
         {
          title: 'Figma',
          description: 'Designed and developed user-friendly interfaces that enhance user experience and engagement.',
          imgSrc: require('../images/figma.jpg'),
        },
      ],
      projects: [
        {
          title: 'Faculty Submittals Monitoring System',
          description: 'This is our capstone project for our final year in college. It is a web-based application that allows faculty members to submit their requirements and track their progress.',
          img: require('../images/faculty-submittals.png')  ,
          url: 'https://faculty-submittals.onrender.com'
        },
        {
          title: 'FrameCraters',
          description: 'This is our for our internship. With the power of Figma, we create a high-fidelity design and raw interactivity, Click the play button for better user-experience.',
          img: require('../images/framecraters.png'),
          url: 'https://www.figma.com/proto/ff1AAkN5jQ01AOXu3KiPrt/FERRER---Task-5--Creating-a-Full-Website-UI--Multi-Page-?t=3GkY9qjfaHXoEH6x-1&node-id=183-814'
        },
        {
          title: 'Krezil Food Stall',
          description: "This is commission, for my sister's business",
          img: require('../images/KREZIL-FOOD-STALL.jpg'),
          url: 'https://www.figma.com/proto/QtPv9S2a8rMVlnodk6Aedq/KREZIL-FOOD-STALL?t=pmaQnbkWIsFLQC88-0&scaling=contain&content-scaling=fixed&page-id=0%3A1&node-id=21-220'
        },
        {
          title: 'Matcha ka',
          description: 'This is our for our internship. With the power of Figma, we create a high-fidelity design and raw interactivity, Click the play button for better user-experience.',
          img: require('../images/matcha-ka.png'),
          url: 'https://www.figma.com/proto/uevfKzT76hKgfQQu1FzGjW/FERRER---WEB-DESIGN--PROJECT-1-?t=EEAqDcvHkc1GTbR3-0&scaling=scale-down-width&content-scaling=fixed&page-id=0%3A1&node-id=26-326'
        },
      ],
      intervalId: null,
    };
  },
  mounted() {
    this.startCarousel();
  },
  beforeUnmount() {
    clearInterval(this.intervalId);
  },
  methods: {
    startCarousel() {
      this.intervalId = setInterval(() => {
        this.activeIndex = (this.activeIndex + 1) % this.carouselItems.length;
      }, 5000);
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

*{
  font-family: 'Montserrat', sans-serif;
}

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
  animation: slidingEffect 1s ease-in-out;
}

@keyframes slidingEffect {
  from{
    transform: translateX(-100%);
  }
  to{
    transform: translateX(0%);
  }
}

.carousel-item.active {
  display: block;
}

.carousel-item img {
  width: 100%;
  height: auto;
  border-radius: 15px 15px 0 0 ;
}

.carousel-caption {
  font-family: 'Montserrat', sans-serif;
  background: rgba(0, 0, 0, 0.6);
  padding: 20px;
  border-radius: 0 0 15px 15px;
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


.all-projects {
  margin: 60px auto;
  padding: 20px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 15px;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 15px;
}

.section-title {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 30px;
  color: white;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 25px;
  justify-items: center;
}

.project-card {
  background-color: rgba(0, 0, 0, 0.1);
  border: 1px solid #dee2e6;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.project-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
}

.project-card h3 {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: white;
}

.project-card p {
  font-size: 0.95rem;
  color: white;
  margin-bottom: 15px;
  line-height: 1.5;
}

.project-button {
  background-color: #9b0d54;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  text-decoration: none;
  display: inline-block;
  transition: background-color 0.3s ease;
}

.project-button:hover {
  background-color: #33041c;
}
</style>
