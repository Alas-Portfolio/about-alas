<template>
  <section class="carousel-section">
    <div class="carousel-wrapper">
      <div
        v-for="(item, index) in carouselItems"
        :key="index"
        class="carousel-item"
        :class="{ active: activeIndex === index }"
      >
        <img
          :src="item.imgSrc"
          :alt="item.title"
        >
        <div class="carousel-overlay">
          <p>{{ item.description }}</p> 
        </div>
      </div>

      <button
        class="carousel-btn left"
        @click="previousSlide"
      >
        ❮
      </button>

      <button
        class="carousel-btn right"
        @click="nextSlide"
      >
        ❯
      </button>
    </div>
  </section>

  <section class="all-projects">
    <div class="container">
      <h2 class="section-title">💻 Web Development/ Web Design Projects/ Graphic Design/ Video Editing</h2>

      <div class="projects-grid">
        <div
          class="project-card"
          v-for="(project, index) in projects"
          :key="index"
        >
          <img
            :src="project.img"
            :alt="project.title"
            class="project-img"
          />
          <h3>{{ project.title }}</h3>
          <p>{{ project.description }}</p>
          <a
            :href="project.url"
            target="_blank"
            class="project-button"
          >
            View Project
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- GRAPHICS -->
  <GraphicPortfolio />

  <!-- VIDEOS -->
  <VideoPortfolio />
</template>

<script>
import GraphicPortfolio from "@/components/GraphicPortfolio.vue";
import VideoPortfolio from "@/components/VideoPortfolio.vue";

export default {
  name: "AboutPage",

  components: {
    GraphicPortfolio,
    VideoPortfolio
  },

  data() {
    return {
      activeIndex: 0,
      intervalId: null,

      carouselItems: [
        {
          title: "Laravel",
          description: "Backend development using MVC architecture, Eloquent ORM, authentication, and database management.",
          imgSrc: require("../images/laravel.png")
        },
        {
          title: "React",
          description: "Building responsive interfaces with reusable components and modern frontend workflow.",
          imgSrc: require("../images/react.jpg")
        },
        {
          title: "Javascript",
          description: "Creating interactive applications with clean logic and dynamic user experiences.",
          imgSrc: require("../images/js.jpg")
        },
        {
          title: "HTML & CSS",
          description: "Designing responsive layouts with modern UI principles and animations.",
          imgSrc: require("../images/html.jpg")
        },
        {
          title: "Figma",
          description: "Creating high fidelity prototypes and user-centered interface designs.",
          imgSrc: require("../images/figma.jpg")
        }
      ],

      projects: [
        {
          title: "Faculty Submittals Monitoring System",
          description: "Capstone web application that allows faculty members to submit requirements and monitor progress.",
          img: require("../images/faculty-submittals.png"),
          url: "https://faculty-submittals.onrender.com"
        },
        {
          title: "Barangay Resident Master List",
          description: "React and Bootstrap based system designed for managing resident information.",
          img: require("../images/barangayresidentmasterlist.png"),
          url: "https://barangayresidentmasterlist.onrender.com/"
        },
        {
          title: "FrameCraters",
          description: "High fidelity Figma website design created during internship.",
          img: require("../images/framecraters.png"),
          url: "https://www.figma.com/"
        },
        {
          title: "Krezil Food Stall",
          description: "Business website UI design focused on branding and customer experience.",
          img: require("../images/KREZIL-FOOD-STALL.jpg"),
          url: "https://www.figma.com/"
        },
        {
          title: "Matcha Ka",
          description: "Modern website interface design with interactive prototype experience.",
          img: require("../images/matcha-ka.png"),
          url: "https://www.figma.com/"
        }
      ]
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
        this.nextSlide();
      }, 5000);
    },

    nextSlide() {
      this.activeIndex = (this.activeIndex + 1) % this.carouselItems.length;
    },

    previousSlide() {
      this.activeIndex = (this.activeIndex - 1 + this.carouselItems.length) % this.carouselItems.length;
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

* {
  font-family: Montserrat, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* ===== CAROUSEL ===== */
.carousel-section {
  padding: 40px 20px;
}

.carousel-wrapper {
  max-width: 1200px;
  height: 550px;
  margin: auto;
  position: relative;
  overflow: hidden;
  border-radius: 25px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.carousel-item {
  display: none;
  height: 100%;
  position: relative;
  animation: slide 0.8s ease;
}

.carousel-item.active {
  display: block;
}

.carousel-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-overlay {
  display: grid;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  padding: 40px;
  color: white;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.9));
  text-align: center;
}

.carousel-overlay p {
  max-width: 700px;
  font-size: 18px;
  line-height: 1.6;
  margin: 0 auto;
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: #9b0d54;
  border: none;
  color: white;
  font-size: 30px;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.3s;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-btn:hover {
  background: #ff4d94;
  transform: translateY(-50%) scale(1.1);
}

.left {
  left: 20px;
}

.right {
  right: 20px;
}

@keyframes slide {
  from {
    opacity: 0;
    transform: scale(1.1);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* ===== PROJECTS ===== */
.all-projects {
  margin: 60px auto;
  padding: 30px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 25px;
  max-width: 1200px;
}

.section-title {
  color: white;
  text-align: center;
  margin-bottom: 40px;
  font-size: 2rem;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.project-card {
  background: rgba(255, 255, 255, 0.08);
  padding: 20px;
  border-radius: 20px;
  color: white;
  transition: 0.4s;
  display: flex;
  flex-direction: column;
}

.project-card:hover {
  transform: translateY(-10px);
  background: rgba(255, 255, 255, 0.15);
}

.project-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 15px;
}

.project-card h3 {
  margin: 15px 0 10px;
  font-size: 1.1rem;
}

.project-card p {
  font-size: 0.9rem;
  line-height: 1.5;
  color: #ddd;
  flex: 1;
  margin-bottom: 15px;
}

.project-button {
  display: inline-block;
  background: #9b0d54;
  padding: 12px 25px;
  border-radius: 25px;
  color: white;
  text-decoration: none;
  transition: 0.3s;
  text-align: center;
}

.project-button:hover {
  background: #ff4d94;
  transform: scale(1.05);
}

/* ============================================
   RESPONSIVE BREAKPOINTS
   ============================================ */

/* Large screens (1200px and below) */
@media (max-width: 1200px) {
  .carousel-wrapper {
    height: 500px;
  }
  .carousel-overlay p {
    font-size: 17px;
    max-width: 600px;
  }
}

/* Medium screens (1024px and below) */
@media (max-width: 1024px) {
  .carousel-wrapper {
    height: 450px;
  }
  .carousel-overlay {
    padding: 35px;
  }
  .carousel-overlay p {
    font-size: 16px;
    max-width: 550px;
  }
  .carousel-btn {
    width: 50px;
    height: 50px;
    font-size: 26px;
  }
  .projects-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 25px;
  }
}

/* Tablet (768px and below) */
@media (max-width: 768px) {
  .carousel-section {
    padding: 30px 15px;
  }
  .carousel-wrapper {
    height: 400px;
    border-radius: 20px;
  }
  .carousel-overlay {
    padding: 30px 20px;
  }
  .carousel-overlay p {
    font-size: 15px;
    max-width: 450px;
  }
  .carousel-btn {
    width: 45px;
    height: 45px;
    font-size: 22px;
  }
  .left {
    left: 15px;
  }
  .right {
    right: 15px;
  }
  .all-projects {
    margin: 40px 15px;
    padding: 20px;
  }
  .section-title {
    font-size: 1.6rem;
    margin-bottom: 30px;
  }
  .projects-grid {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 20px;
  }
  .project-img {
    height: 170px;
  }
  .project-card {
    padding: 15px;
  }
  .project-card h3 {
    font-size: 1rem;
  }
  .project-card p {
    font-size: 0.85rem;
  }
  .project-button {
    padding: 10px 20px;
    font-size: 0.9rem;
  }
}

/* Small tablet / Large phone (600px and below) */
@media (max-width: 600px) {
  .carousel-wrapper {
    height: 350px;
    border-radius: 15px;
  }
  .carousel-overlay {
    padding: 25px 15px;
  }
  .carousel-overlay p {
    font-size: 14px;
    max-width: 100%;
    line-height: 1.5;
  }
  .carousel-btn {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }
  .left {
    left: 10px;
  }
  .right {
    right: 10px;
  }
  .projects-grid {
    grid-template-columns: 1fr 1fr;
    gap: 15px;
  }
  .project-img {
    height: 150px;
  }
  .section-title {
    font-size: 1.3rem;
  }
}

/* Phone (480px and below) */
@media (max-width: 480px) {
  .carousel-section {
    padding: 20px 10px;
  }
  .carousel-wrapper {
    height: 280px;
    border-radius: 12px;
  }
  .carousel-overlay {
    padding: 20px 12px;
  }
  .carousel-overlay p {
    font-size: 12px;
    line-height: 1.4;
  }
  .carousel-btn {
    width: 35px;
    height: 35px;
    font-size: 16px;
  }
  .left {
    left: 8px;
  }
  .right {
    right: 8px;
  }
  .all-projects {
    margin: 30px 10px;
    padding: 15px;
    border-radius: 15px;
  }
  .section-title {
    font-size: 1.1rem;
    margin-bottom: 20px;
  }
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  .project-img {
    height: 180px;
  }
  .project-card {
    padding: 12px;
  }
  .project-card h3 {
    font-size: 0.95rem;
    margin: 10px 0 8px;
  }
  .project-card p {
    font-size: 0.8rem;
    margin-bottom: 12px;
  }
  .project-button {
    padding: 8px 18px;
    font-size: 0.8rem;
  }
}

/* Small phone (375px and below) */
@media (max-width: 375px) {
  .carousel-wrapper {
    height: 220px;
    border-radius: 10px;
  }
  .carousel-overlay {
    padding: 15px 10px;
  }
  .carousel-overlay p {
    font-size: 11px;
  }
  .carousel-btn {
    width: 30px;
    height: 30px;
    font-size: 14px;
  }
  .section-title {
    font-size: 1rem;
  }
  .project-img {
    height: 150px;
  }
  .project-card h3 {
    font-size: 0.85rem;
  }
  .project-card p {
    font-size: 0.75rem;
  }
  .project-button {
    padding: 6px 15px;
    font-size: 0.75rem;
  }
}

/* Extra small (320px and below) */
@media (max-width: 320px) {
  .carousel-wrapper {
    height: 180px;
    border-radius: 8px;
  }
  .carousel-overlay {
    padding: 12px 8px;
  }
  .carousel-overlay p {
    font-size: 10px;
    line-height: 1.3;
  }
  .carousel-btn {
    width: 25px;
    height: 25px;
    font-size: 12px;
  }
  .left {
    left: 5px;
  }
  .right {
    right: 5px;
  }
  .all-projects {
    margin: 20px 5px;
    padding: 10px;
  }
  .section-title {
    font-size: 0.85rem;
    margin-bottom: 15px;
  }
  .project-img {
    height: 120px;
  }
  .project-card {
    padding: 10px;
  }
  .project-card h3 {
    font-size: 0.8rem;
    margin: 8px 0 5px;
  }
  .project-card p {
    font-size: 0.7rem;
    margin-bottom: 10px;
  }
  .project-button {
    padding: 5px 12px;
    font-size: 0.7rem;
  }
}

/* Super small (150px and below) */
@media (max-width: 150px) {
  .carousel-wrapper {
    height: 140px;
    border-radius: 5px;
  }
  .carousel-overlay {
    padding: 8px 5px;
  }
  .carousel-overlay p {
    font-size: 8px;
    line-height: 1.2;
  }
  .carousel-btn {
    width: 18px;
    height: 18px;
    font-size: 8px;
  }
  .left {
    left: 3px;
  }
  .right {
    right: 3px;
  }
  .section-title {
    font-size: 0.7rem;
  }
  .project-img {
    height: 80px;
  }
  .project-card {
    padding: 5px;
  }
  .project-card h3 {
    font-size: 0.6rem;
  }
  .project-card p {
    font-size: 0.55rem;
  }
  .project-button {
    padding: 3px 8px;
    font-size: 0.55rem;
  }
}
</style>