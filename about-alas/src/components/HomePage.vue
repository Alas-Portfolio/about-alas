<template>
  <div class="container text-center mt-5">
    <div class="home-container">
      <div class="image-container mt-5">
        <transition name="fade" mode="out-in">
          <img
            :src="images[currentTitleIndex]"
            :key="currentTitleIndex"
            class="slide-image"
            alt="Profile Slide"
          />
        </transition>
      </div>

     <h1>{{ headingTexts[currentTitleIndex] }}</h1>

    <h2 class="typing">{{ displayedText }}</h2>

      <!-- UPDATED BUTTONS -->
      <div class="buttons mt-3">
        <button class="btn enhanced-btn btn-primary ripple me-3" @click="clickResume">
          <i class="bi bi-file-earmark-pdf me-2"></i> View Resume
        </button>

        <button class="btn enhanced-btn btn-secondary ripple" @click="clickCV">
          <i class="bi bi-file-earmark-person me-2"></i> View Curriculum Vitae
        </button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      headingTexts: [
        "I'M",
        "CAPABLE FOR",
        "HAS EXPERIENCE IN",
        "HAS EXPERIENCE IN",
        "HAS BASIC KNOWLEDGE FOR"
      ],

      titles: [
        'Alastair O. Ferrer',
        'Web Design',
        'Graphic Design',
        'Social Media Boosting, Monetizing, Posting',
        'Troubleshooting'
      ],

      images: [
        '../alastair2.png',
        '../webDesign.jpg',
        '../Graphic Design.jpg',
        '../Social Media Specialist.png',
        '../ITSupport.png'
      ],

      currentTitleIndex: 0,
      displayedText: '',
      typingSpeed: 100,
      deletingSpeed: 50,
      isDeleting: false
    };
  },

  mounted() {
    this.startTyping();
  },

  methods: {
    clickResume() {
      window.open('/pdf/RESUME-FERRER,ALASTAIR.pdf', '_blank');
    },

    clickCV() {
      window.open('/pdf/CV-FERRER,ALASTAIR.pdf', '_blank');
    },

    startTyping() {
      const current = this.titles[this.currentTitleIndex];
      const fullText = current;

      if (this.isDeleting) {
        this.displayedText = fullText.substring(
          0,
          this.displayedText.length - 1
        );
      } else {
        this.displayedText = fullText.substring(
          0,
          this.displayedText.length + 1
        );
      }

      let typeSpeed = this.isDeleting
        ? this.deletingSpeed
        : this.typingSpeed;

      if (!this.isDeleting && this.displayedText === fullText) {
        typeSpeed = 1800;
        this.isDeleting = true;
      } else if (this.isDeleting && this.displayedText === '') {
        this.isDeleting = false;

        this.currentTitleIndex =
          (this.currentTitleIndex + 1) %
          this.titles.length;

        typeSpeed = 500;
      }

      setTimeout(this.startTyping, typeSpeed);
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:wght@700&family=Playfair+Display:wght@700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

/* Bootstrap Icons */
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css");

.home-container {
  margin-top: 150px;
}

h1 {
  font-family: 'Bodoni Moda', serif;
  font-weight: 700;
}

h2,
h3 {
  font-family: 'Montserrat', sans-serif;
}

.static-title {
  opacity: 1;
  animation: none;
}

.typing {
  border-right: 2px solid #333;
  white-space: nowrap;
  overflow: hidden;
  display: inline-block;
  font-size: 30px;
  min-height: 40px;
  animation: none;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

/* BASE BUTTONS (unchanged) */
.btn {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 30px;
  transition: all 0.3s ease;
  border: none;
}


.enhanced-btn {
  position: relative;
  overflow: hidden;
  z-index: 1;
  padding: 0.9rem 2.3rem !important;
  font-size: 1.15rem !important;
  border-radius: 45px !important;
  display: flex;
  align-items: center;
  gap: 10px;
  letter-spacing: 0.5px;
  font-weight: 700;
  transition: all 0.3s ease;
}


.btn-primary {
  background: linear-gradient(135deg, #9b0d54, #c0196d, #9b0d54);
  background-size: 250% 250%;
  color: #fff;
  animation: gradientFlow 6s ease infinite;
}

.btn-secondary {
  background: linear-gradient(135deg, #6c757d, #868e96, #6c757d);
  background-size: 250% 250%;
  color: #fff;
  animation: gradientFlow 6s ease infinite;
}

@keyframes gradientFlow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

 .enhanced-btn:hover {
  transition: all 0.3s ease;
  transform: translateY(-5px) scale(1.06);
} 

.enhanced-btn:hover {
  background: radial-gradient(circle, rgba(248, 248, 248, 0.6), transparent 70%);
}


.ripple {
  position: relative;
  overflow: hidden;
}

.ripple:active::before {
  content: "";
  position: absolute;
  width: 120px;
  height: 120px;
  background: rgba(255,255,255,0.5);
  border-radius: 50%;
  transform: scale(0);
  animation: rippleAnim 0.6s ease-out;
  opacity: 0.7;
  pointer-events: none;
}

@keyframes rippleAnim {
  to {
    transform: scale(3);
    opacity: 0;
  }
}

/* Press-down animation */
.enhanced-btn:active {
  transform: translateY(0px) scale(0.97);
}

/* Icon styling */
.enhanced-btn i {
  font-size: 1.3rem;
}

/* ------------------------------------------------------- */

.image-container {
  margin-top: 3rem;
  display: flex;
  justify-content: center;
}

.slide-image {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
}

.slide-image:hover {
  transform: scale(1.05);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.display-1-empty{
  display: none;
}

@media (max-width: 720px) {
  .buttons {
    display: flex;
    flex-direction: column;
  }
}
</style>
