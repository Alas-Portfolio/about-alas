<template>
  <section class="graphic-section">

    <h2 class="section-title">
      🎨 Graphic Design Portfolio
    </h2>


    <div class="gallery">

     <div
        class="graphic-card"
        v-for="(poster, index) in visiblePosters"
        :key="index"
        >


        <div class="poster-wrapper">

            <img
            :src="poster.img"
            :alt="poster.title"
            class="poster-image"
            />

        </div>



        <div class="card-content">


            <h3>
            {{ poster.title }}
            </h3>


            <p>
            {{ poster.description }}
            </p>



            <button
            class="view-button"
            @click="openModal(index)"
            >
            View Design
            </button>


        </div>


        </div>

    </div>



    <button
      v-if="displayLimit < posters.length"
      class="load-more"
      @click="loadMore"
    >
      View More Posters
    </button>





    <div
      v-if="showModal"
      class="modal"
    >

      <button
        class="close-button"
        @click="closeModal"
      >
        ✕
      </button>



      <button
        class="nav-button prev"
        @click="previousImage"
      >
        ❮
      </button>



            <div
                class="viewer"
                @mousedown="startDrag"
                @mouseup="stopDrag"
                >


            <img
                :src="selectedImage.img"
                class="preview-image"
                :style="{
                transform:
                `translate(${position.x}px, ${position.y}px) scale(${zoom})`
                }"
            />


            </div>



      <button
        class="nav-button next"
        @click="nextImage"
      >
        ❯
      </button>



     <div class="zoom-controls">
        <button @click="zoomOut">
            −
        </button>


        <span>
            {{ Math.round(zoom * 100) }}%
        </span>


        <button @click="zoomIn">
            +
        </button>


        <button
            class="reset-button"
            @click="resetImage"
        >
            Reset
        </button>

        </div>


    </div>


  </section>
</template>




<script>

const images = require.context(
  "../images/graphic projects",
  false,
  /\.(png|jpe?g|svg)$/i
);


export default {

  name: "GraphicPortfolio",
        

    data() {

    return {

        displayLimit: 12,

        loadAmount: 12,

        showModal: false,

        selectedIndex: 0,


        zoom: 1,


        position: {
        x: 0,
        y: 0
        },


        dragging: false,


        dragStart: {
        x: 0,
        y: 0
        },

        posters: images.keys().map((file, index) => ({

        title:
            `Graphic Design Project ${index + 1}`,


        description:
            "Professional poster artwork focusing on branding, typography, composition, color harmony, marketing visuals, and digital presentation.",


        img:
            images(file)

        }))

    };

    },

  computed: {

    visiblePosters() {

      return this.posters.slice(
        0,
        this.displayLimit
      );

    },


    selectedImage() {

      return this.posters[this.selectedIndex];

    }

  },



  methods: {

       startDrag(e) {
        if (this.zoom <= 1) return;

        if (e.type === "touchstart") {

            if (e.touches.length === 1) {

                this.dragging = true;

                this.dragStart = {
                    x: e.touches[0].clientX,
                    y: e.touches[0].clientY
                };

            } else if (e.touches.length === 2) {

                this.lastPinchDistance = this.getPinchDistance(e);

            }

        } else {

            this.dragging = true;

            this.dragStart = {
                x: e.clientX,
                y: e.clientY
            };

            window.addEventListener("mousemove", this.dragImage);
            window.addEventListener("mouseup", this.stopDrag);

        }
    },

    dragImage(e) {

        if (e.type === "touchmove") {

            if (e.touches.length === 2) {

                const distance = this.getPinchDistance(e);

                if (this.lastPinchDistance) {

                    const diff = (distance - this.lastPinchDistance) * 0.005;

                    this.zoom += diff;

                    if (this.zoom < 1)
                        this.zoom = 1;

                    if (this.zoom > 3)
                        this.zoom = 3;
                }

                this.lastPinchDistance = distance;

                return;
            }

            if (!this.dragging || this.zoom <= 1) return;

            const touch = e.touches[0];

            const dx = touch.clientX - this.dragStart.x;
            const dy = touch.clientY - this.dragStart.y;

            this.position.x += dx;
            this.position.y += dy;

            this.dragStart = {
                x: touch.clientX,
                y: touch.clientY
            };

            return;
        }

        if (!this.dragging || this.zoom <= 1) return;

        const dx = e.clientX - this.dragStart.x;
        const dy = e.clientY - this.dragStart.y;

        this.position.x += dx;
        this.position.y += dy;

        this.dragStart = {
            x: e.clientX,
            y: e.clientY
        };
    },

    stopDrag() {

        this.dragging = false;
        this.lastPinchDistance = 0;

        window.removeEventListener("mousemove", this.dragImage);
        window.removeEventListener("mouseup", this.stopDrag);
    },
          
            beforeUnmount() {
            window.removeEventListener("mousemove", this.dragImage);
            window.removeEventListener("mouseup", this.stopDrag);
    
        },

        resetImage() {
        this.zoom = 1;

        this.position = {
            x: 0,
            y: 0
        };

        this.dragging = false;
        },

    loadMore() {

      this.displayLimit += this.loadAmount;

    },



    openModal(index) {

      this.selectedIndex = index;

      this.showModal = true;

      this.zoom = 1;

    },



    closeModal() {

      this.showModal = false;

    },



    nextImage() {

      this.selectedIndex =
        (
          this.selectedIndex + 1
        )
        %
        this.posters.length;


      this.zoom = 1;

    },



    previousImage() {

      this.selectedIndex =
        (
          this.selectedIndex - 1 +
          this.posters.length
        )
        %
        this.posters.length;


      this.zoom = 1;

    },



    zoomIn() {

      if (this.zoom < 3) {

        this.zoom += 0.25;

      }

    },



    zoomOut() {

      if (this.zoom > 0.5) {

        this.zoom -= 0.25;

      }

    }


  },


      posters: images.keys().map((file, index) => ({

        title:
          `Graphic Design Project ${index + 1}`,


        description:
          "Professional poster artwork focusing on branding, typography, composition, color harmony, marketing visuals, and digital presentation.",


        img:
          images(file)

      }))

    };



</script>




<style scoped>

@import url(
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap'
);



* {

  font-family:
    Montserrat,
    sans-serif;

}



.graphic-section {

  max-width: 1200px;

  margin: auto;

  padding: 60px 20px;

}



.section-title {

  text-align: center;

  font-size: 2.2rem;

  color: white;

  margin-bottom: 40px;

}



.gallery {

  display: grid;

  grid-template-columns:
    repeat(auto-fit, minmax(260px, 1fr));

  gap: 30px;

}


.graphic-card {

  display:flex;

  flex-direction:column;

  background:
  rgba(255,255,255,.08);

  border:
  1px solid rgba(255,255,255,.15);

  backdrop-filter:
  blur(20px);

  border-radius:25px;

  overflow:hidden;

  min-height:520px;

  box-shadow:
  0 20px 50px rgba(0,0,0,.45);

  transition:.4s;

}



.graphic-card:hover {

  transform:
  translateY(-10px);

}




.poster-wrapper {

  width:100%;

  height:330px;

  overflow:hidden;

  background:#111;

}





.poster-image {

  width:100%;

  height:100%;

  object-fit:cover;

  display:block;

  transition:.5s;

}





.graphic-card:hover .poster-image {

  transform:
  scale(1.05);

}





.card-content {

  padding:25px;

  color:white;

  background:
  linear-gradient(
  135deg,
  rgba(255,255,255,.15),
  rgba(255,255,255,.05)
  );

  backdrop-filter:
  blur(15px);

  flex:1;

}





.card-content h3 {

  font-size:1.2rem;

  margin-bottom:12px;

  color:white;

}


.card-content p {

  font-size:.9rem;

  line-height:1.6;

  color:#ddd;

  margin-bottom:20px;

}





.view-button {

  width:100%;

  padding:13px;

  border:none;

  border-radius:30px;

  background:

  linear-gradient(
  45deg,
  #9b0d54,
  #ff4d94
  );

  color:white;

  font-weight:bold;

  cursor:pointer;

}



.poster-image {

  width: 100%;

  height: 100%;

  object-fit: cover;

  transition: .5s;

}



.graphic-card:hover .poster-image {

  transform:
    scale(1.08);

}



.card-content {

  position: absolute;

  bottom: 0;

  left: 0;

  right: 0;

  padding: 25px;

  color: white;

  background:
    linear-gradient(
      to top,
      rgba(0,0,0,.95),
      rgba(0,0,0,.55),
      transparent
    );

}



.card-content h3 {

  font-size: 1.2rem;

  margin-bottom: 10px;

}



.card-content p {

  font-size: .9rem;

  line-height: 1.5;

  color: #eee;

  margin-bottom: 15px;

  display: -webkit-box;

  -webkit-line-clamp: 3;

  -webkit-box-orient: vertical;

  overflow: hidden;

}



.view-button {

  width: 100%;

  padding: 12px;

  border: none;

  border-radius: 30px;

  background:
    linear-gradient(
      45deg,
      #9b0d54,
      #ff4d94
    );

  color: white;

  font-weight: bold;

  cursor: pointer;

}



.load-more {

  display: block;

  margin: 40px auto 0;

  padding: 14px 35px;

  border: none;

  border-radius: 30px;

  background:
    linear-gradient(
      45deg,
      #9b0d54,
      #ff4d94
    );

  color: white;

  font-weight: bold;

  cursor: pointer;

}



.modal {

  position: fixed;

  inset: 0;

  background:
    rgba(0,0,0,.95);

  display: flex;

  justify-content: center;

  align-items: center;

  z-index: 9999;

}



.viewer {

  max-width: 90%;

  max-height: 85%;

  overflow: hidden;

}



.preview-image {

  max-width: 100%;

  max-height: 85vh;

  border-radius: 20px;

  transition: .3s;

}



.close-button,
.nav-button {

  position: absolute;

  background: #9b0d54;

  color: white;

  border: none;

  width: 50px;

  height: 50px;

  border-radius: 50%;

  cursor: pointer;

  font-size: 25px;

}



.close-button {

  top: 30px;

  right: 40px;

}



.prev {

  left: 40px;

}



.next {

  right: 40px;

}



.zoom-controls {

  position: absolute;

  bottom: 30px;

  display: flex;

  align-items: center;

  gap: 15px;

}



.zoom-controls button {

  width: 45px;

  height: 45px;

  border: none;

  border-radius: 50%;

  cursor: pointer;

}



.zoom-controls span {

  color: white;

}

@media(max-width:768px){


  .poster-wrapper {

    height:280px;

  }


  .graphic-card {

    min-height:480px;

  }


}



@media(max-width:480px){


  .poster-wrapper {

    height:420px;

  }


  .card-content p {

    font-size:.85rem;

  }


}

@media(max-width:768px) {

  .gallery {

    grid-template-columns:
      repeat(2,1fr);

  }


  .graphic-card {

    height: 300px;

  }

}



@media(max-width:480px) {

  .gallery {

    grid-template-columns: 1fr;

  }


  .graphic-card {

    height: 340px;

  }


  .section-title {

    font-size: 1.6rem;

  }

}



@media(max-width:320px) {

  .graphic-card {

    height: 280px;

  }


  .card-content {

    padding: 15px;

  }


  .card-content p {

    -webkit-line-clamp: 2;

  }

}

</style>