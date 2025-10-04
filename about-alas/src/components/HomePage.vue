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

      <h1>I'M</h1>

      <h2 class="typing">{{ displayedText }}</h2>

      <div class="buttons mt-3">
        <button class="btn btn-primary me-2" @click="clickResume">View Resume</button>
        <button class="btn btn-secondary" @click="clickCV">View Curriculum Vitae</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      titles: ['Alastair O. Ferrer', 'Web Designer', 'IT Support'],
      images: [
        '../picture.jpg',
        '../webDesign.jpg',
        '../ITSupport.png',
        '../image4.jpg'
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
        this.displayedText = fullText.substring(0, this.displayedText.length - 1);
      } else {
        this.displayedText = fullText.substring(0, this.displayedText.length + 1);
      }

      let typeSpeed = this.isDeleting ? this.deletingSpeed : this.typingSpeed;

      if (!this.isDeleting && this.displayedText === fullText) {
        typeSpeed = 1500;
        this.isDeleting = true;
      } else if (this.isDeleting && this.displayedText === '') {
        this.isDeleting = false;
        this.currentTitleIndex = (this.currentTitleIndex + 1) % this.titles.length;
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

.btn {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 30px;
  transition: all 0.3s ease;
  border: none;
}

.btn-primary {
  background-color: #9b0d54;
  color: white;
}

.btn-primary:hover {
  background-color: #9b0d54;
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(165, 4, 71, 0.3);
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(108, 117, 125, 0.3);
}

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
</style>
