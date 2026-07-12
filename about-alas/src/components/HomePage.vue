<template>
  <div class="container text-center mt-5">
    <div class="home-container">
      <div class="image-container mt-5">
  <div class="glass-orb">
    <transition name="image-switch" mode="out-in">
      <div
        class="glass-card"
        :key="currentTitleIndex"
      >
        <img
          :src="images[currentTitleIndex]"
          class="slide-image"
          alt="Profile Slide"
        />
      </div>
    </transition>
  </div>
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
.image-container{
    display:flex;
    justify-content:center;
    align-items:center;
    margin-top:80px;
    perspective:1200px;
}

/* Main Orb */

.glass-orb{
    position:relative;
    width:360px;
    height:360px;
    display:flex;
    justify-content:center;
    align-items:center;
}

.glass-orb::before{
    content:"";
    position:absolute;
    inset:-6px;
    border-radius:38px;

    background:conic-gradient(
        from 0deg,
        transparent,
        #9b0d54,
        #d63384,
        transparent
    );

    animation:rotateBorder 14s linear infinite;

    filter:blur(8px);

    opacity:.45;
}

@keyframes rotateBorder{
    to{
        transform:rotate(360deg);
    }
}
/* Rotating Rings */

.rotate-ring{
    position:absolute;
    width:390px;
    height:390px;
    border-radius:40px;

    background:conic-gradient(
        from 0deg,
        transparent,
        rgba(255,255,255,.8),
        transparent,
        #ff3c83,
        transparent
    );

    animation:spin 12s linear infinite;

    filter:blur(1px);
}

.ring2{
    width:350px;
    height:350px;

    border-radius:60px;

    animation:spinReverse 8s linear infinite;

    opacity:.7;

    transform:rotate(45deg);
}

/* Glass Card */

.glass-card{
    position: relative;
    width: 310px;
    height: 310px;
    border-radius: 32px;
    overflow: hidden;

    background: rgba(255,255,255,.08);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);

    border: 1px solid rgba(255,255,255,.18);

    box-shadow:
        0 15px 40px rgba(0,0,0,.18),
        inset 0 1px 0 rgba(255,255,255,.2);

    transition: all .45s ease;
}


/* Glass Reflection */

.glass-card::before{
    content:"";
    position:absolute;
    inset:0;
    background:linear-gradient(
        135deg,
        rgba(255,255,255,.55),
        transparent 45%
    );
    pointer-events:none;
}

.glass-card::after{
    content:"";
    position:absolute;
    top:-120%;
    left:-30%;
    width:50%;
    height:320%;
    background:rgba(255,255,255,.35);
    transform:rotate(25deg);
    filter:blur(12px);

    animation:lightSweep 6s infinite;
}

.slide-image{
    width:100%;
    height:100%;
    object-fit:cover;

    border-radius:35px;

    transition:.8s;
}

/* Animations */

@keyframes spin{

    from{
        transform:rotate(0deg);
    }

    to{
        transform:rotate(360deg);
    }

}

@keyframes spinReverse{

    from{
        transform:rotate(45deg);
    }

    to{
        transform:rotate(-315deg);
    }

}

@keyframes spinSlow{

    from{
        transform:rotate(0deg);
    }

    to{
        transform:rotate(360deg);
    }

}

@keyframes float{

    0%,100%{
        transform:translateY(0px);
    }

    50%{
        transform:translateY(-18px);
    }

}

@keyframes pulse{

    0%,100%{
        transform:scale(1);
        opacity:.7;
    }

    50%{
        transform:scale(1.18);
        opacity:1;
    }

}

@keyframes lightSweep{

    0%{
        transform:translateX(-250%) rotate(25deg);
    }

    100%{
        transform:translateX(650%) rotate(25deg);
    }

}

/* Responsive */

@media(max-width:768px){

.glass-orb{
    width:320px;
    height:320px;
}

.rotate-ring{
    width:300px;
    height:300px;
}

.ring2{
    width:270px;
    height:270px;
}

.glass-card{
    width:230px;
    height:230px;
}

}

/* ============================= */
/* Premium Image Switching Effect */
/* ============================= */

.image-switch-enter-active,
.image-switch-leave-active{
    transition:
        transform .9s cubic-bezier(.19,1,.22,1),
        opacity .9s ease,
        filter .9s ease;
}

/* New Image */

.image-switch-enter-from{
    opacity:0;

    transform:
        perspective(1200px)
        rotateY(-45deg)
        rotateX(10deg)
        scale(.8);

    filter:
        blur(18px)
        brightness(1.6)
        saturate(1.8);
}

.image-switch-enter-to{
    opacity:1;

    transform:
        perspective(1200px)
        rotateY(0)
        rotateX(0)
        scale(1);

    filter:
        blur(0)
        brightness(1)
        saturate(1);
}

/* Leaving Image */

.image-switch-leave-from{
    opacity:1;
    transform:scale(1);
    filter:blur(0);
}

.image-switch-leave-to{

    opacity:0;

    transform:
        perspective(1200px)
        rotateY(45deg)
        rotateX(-10deg)
        scale(1.2);

    filter:
        blur(20px)
        brightness(2);
}


@media(max-width:768px){
  .image-frame{
    width:270px;
    height:270px;
  }
}

@media(max-width:480px){
  .image-frame{
    width:220px;
    height:220px;
  }
}
@media (max-width: 720px) {
  .buttons {
    display: flex;
    flex-direction: column;
  }
}
</style>
