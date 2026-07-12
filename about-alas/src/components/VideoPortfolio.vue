<template>
  <section class="graphic-section">

    <h2 class="section-title">
      🎨 Graphic Design Portfolio
    </h2>


    <!-- POSTER GRID -->
    <div class="gallery">

      <div
        v-for="(poster, index) in visiblePosters"
        :key="index"
        class="graphic-card"
      >

        <img
          :src="poster.img"
          :alt="poster.title"
          loading="lazy"
          class="poster-image"
        />


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
            👁 View Design
          </button>

        </div>

      </div>

    </div>



    <!-- LOAD MORE -->
    <button
      v-if="limit < posters.length"
      class="load-more"
      @click="loadMore"
    >
      ✨ View More Posters
    </button>





    <!-- IMAGE VIEWER MODAL -->
    <div
      v-if="showModal"
      class="modal"
      @click.self="closeModal"
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




      <!-- TOUCH + MOUSE VIEWER -->
      <div
        class="viewer"

        @wheel.prevent="wheelZoom"

        @touchstart="touchStart"
        @touchmove.prevent="touchMove"
        @touchend="touchEnd"

        @mousedown="startDrag"
        @mousemove="drag"
        @mouseup="stopDrag"
        @mouseleave="stopDrag"
      >


        <img
          class="preview-image"

          :src="selectedImage.img"

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





      <!-- ZOOM CONTROLS -->
      <div class="zoom-controls">


        <button
          @click="zoomOut"
        >
          −
        </button>


        <span>
          {{ Math.round(zoom * 100) }}%
        </span>



        <button
          @click="zoomIn"
        >
          +
        </button>



        <button
          @click="resetZoom"
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
  /\.(png|jpg|jpeg|svg)$/i
);


export default {

  name: "GraphicPortfolio",


  data() {

    return {

      // Initial poster loading limit
      limit: 12,


      showModal: false,


      selectedIndex: 0,


      // Zoom
      zoom: 1,


      // Image movement
      position: {
        x: 0,
        y: 0
      },


      dragging: false,


      dragStart: {
        x: 0,
        y: 0
      },



      // Touch controls
      touchStartX: 0,

      touchStartY: 0,

      initialDistance: 0,



      posters: images.keys().map((file, index) => ({

        title:
          `Graphic Design Project ${index + 1}`,


        description:
          "Creative poster design featuring branding, typography, layout composition, color harmony, marketing visuals, and professional storytelling.",


        img:
          images(file)

      }))

    };

  },





  computed: {


    /*
      Only render limited posters
      Prevents lag with 100+ images
    */
    visiblePosters() {

      return this.posters.slice(
        0,
        this.limit
      );

    },





    selectedImage() {

      return this.posters[
        this.selectedIndex
      ];

    }


  },






  methods: {



    loadMore() {

      this.limit += 12;

    },







    openModal(index) {

      this.selectedIndex = index;

      this.showModal = true;


      this.resetZoom();


      // Disable background scrolling
      document.body.style.overflow = "hidden";

    },







    closeModal() {


      this.showModal = false;


      document.body.style.overflow = "auto";


    },








    nextImage() {


      this.selectedIndex =

        (this.selectedIndex + 1)

        %

        this.posters.length;



      this.resetZoom();


    },







    previousImage() {


      this.selectedIndex =

        (

          this.selectedIndex - 1

          +

          this.posters.length

        )

        %

        this.posters.length;



      this.resetZoom();


    },









    zoomIn() {


      if (this.zoom < 4) {

        this.zoom += 0.25;

      }


    },








    zoomOut() {


      if (this.zoom > 0.5) {

        this.zoom -= 0.25;

      }


    },







    resetZoom() {


      this.zoom = 1;


      this.position = {

        x: 0,

        y: 0

      };


    },









    /*
      Desktop mouse wheel zoom
    */

    wheelZoom(event) {


      if (event.deltaY < 0) {

        this.zoomIn();

      }

      else {

        this.zoomOut();

      }


    },









    /*
      Desktop drag
    */


    startDrag(event) {


      if (this.zoom <= 1) return;



      this.dragging = true;



      this.dragStart = {


        x:
          event.clientX - this.position.x,


        y:
          event.clientY - this.position.y


      };


    },







    drag(event) {


      if (!this.dragging) return;



      this.position = {


        x:
          event.clientX - this.dragStart.x,


        y:
          event.clientY - this.dragStart.y


      };


    },








    stopDrag() {


      this.dragging = false;


    },









    /*
      Mobile touch start
    */


    touchStart(event) {


      this.touchStartX =

        event.touches[0].clientX;



      this.touchStartY =

        event.touches[0].clientY;





      // Pinch zoom start

      if (event.touches.length === 2) {


        this.initialDistance =

          this.getDistance(

            event.touches

          );


      }


    },









    /*
      Mobile pinch zoom
    */


    touchMove(event) {



      if (event.touches.length === 2) {



        const distance =

          this.getDistance(

            event.touches

          );



        const scale =

          distance /

          this.initialDistance;




        this.zoom = Math.min(

          4,

          Math.max(

            1,

            scale

          )

        );



      }



    },









    /*
      Mobile swipe
    */


    touchEnd(event) {



      const endX =

        event.changedTouches[0].clientX;




      const difference =

        endX -

        this.touchStartX;





      // Swipe right

      if (difference > 80) {

        this.previousImage();

      }





      // Swipe left

      if (difference < -80) {

        this.nextImage();

      }



    },









    getDistance(touches) {


      const x =

        touches[0].clientX -

        touches[1].clientX;



      const y =

        touches[0].clientY -

        touches[1].clientY;




      return Math.sqrt(

        x * x +

        y * y

      );


    }


  }


};
</script>

<style scoped>

@import url(
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap'
);


* {

  font-family: "Montserrat", sans-serif;

}



/* =========================
   MAIN SECTION
========================= */


.graphic-section {

  width: 100%;

  max-width: 1220px;

  margin: auto;

  padding: 60px 20px;

}





.section-title {

  text-align: center;

  color: white;

  font-size: 2.5rem;

  font-weight: 700;

  margin-bottom: 45px;

  text-shadow:

    0 5px 20px rgba(0,0,0,.4);

}






/* =========================
   POSTER GRID
========================= */


.gallery {

  display: grid;

  grid-template-columns:

  repeat(auto-fit,minmax(280px,1fr));

  gap: 30px;

}





.graphic-card {


  position: relative;

  height: 390px;


  overflow: hidden;


  border-radius: 25px;


  background:

  rgba(255,255,255,.12);



  border:

  1px solid rgba(255,255,255,.25);



  backdrop-filter:

  blur(18px);



  box-shadow:

  0 20px 40px rgba(0,0,0,.35);



  transition: .4s;


}





.graphic-card:hover {


  transform:

  translateY(-12px);



  box-shadow:

  0 30px 70px rgba(155,13,84,.45);


}







.poster-image {


  width:100%;


  height:100%;


  object-fit:cover;



  transition:.5s;


}






.graphic-card:hover .poster-image {


  transform:

  scale(1.08);


}






/* =========================
   CARD CONTENT
========================= */


.card-content {


  position:absolute;


  bottom:0;


  left:0;


  width:100%;



  padding:25px;



  color:white;



  background:

  linear-gradient(

  transparent,

  rgba(0,0,0,.95)

  );


}






.card-content h3 {


  font-size:1.2rem;

  margin-bottom:10px;


}




.card-content p {


  font-size:.9rem;


  color:#ddd;


  line-height:1.5;


}







.view-button,
.load-more {


  margin-top:15px;


  padding:12px 25px;


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



  transition:.3s;


}





.view-button:hover,
.load-more:hover {


  transform:scale(1.08);


  box-shadow:

  0 10px 25px rgba(255,77,148,.5);


}





.load-more {


  display:block;


  margin:50px auto;


}





/* =========================
   MODAL VIEWER
========================= */


.modal {


  position:fixed;


  inset:0;



  background:

  rgba(0,0,0,.92);



  display:flex;


  justify-content:center;


  align-items:center;



  z-index:9999;


}






.viewer {


  width:85%;


  height:85%;



  display:flex;


  justify-content:center;


  align-items:center;



  overflow:hidden;



  touch-action:none;


}







.preview-image {


  max-width:90%;


  max-height:90%;



  object-fit:contain;



  border-radius:20px;



  transition:.2s;



  user-select:none;


}





/* =========================
   BUTTONS
========================= */


.close-button,
.nav-button {


  position:absolute;


  border:none;


  cursor:pointer;



  background:

  linear-gradient(

  45deg,

  #9b0d54,

  #ff4d94

  );



  color:white;


  display:flex;


  align-items:center;


  justify-content:center;



  box-shadow:

  0 10px 30px rgba(0,0,0,.4);


}







.close-button {


  top:30px;


  right:40px;



  width:55px;


  height:55px;



  border-radius:50%;


  font-size:25px;


}





.nav-button {


  width:60px;


  height:60px;



  border-radius:50%;


  font-size:30px;


}







.prev {


  left:40px;


}





.next {


  right:40px;


}







/* =========================
   ZOOM CONTROL
========================= */


.zoom-controls {


  position:absolute;


  bottom:30px;



  display:flex;


  align-items:center;


  gap:15px;



  padding:15px 25px;



  border-radius:40px;



  background:

  rgba(255,255,255,.15);



  backdrop-filter:

  blur(20px);



  color:white;


}






.zoom-controls button {


  border:none;


  cursor:pointer;



  padding:10px 18px;



  border-radius:25px;



  font-weight:bold;



  color:#9b0d54;


}









/* =========================
   1220px
========================= */


@media(max-width:1220px){


.graphic-section{

padding:50px 30px;

}



.gallery{


grid-template-columns:

repeat(3,1fr);


}


}








/* =========================
   768px TABLET
========================= */


@media(max-width:768px){



.gallery{


grid-template-columns:

repeat(2,1fr);


}




.graphic-card{


height:350px;


}




.viewer{


width:100%;


height:75%;


}





.preview-image{


max-width:95%;


max-height:95%;


}





.nav-button{


width:45px;


height:45px;


font-size:20px;


}



.prev{

left:15px;

}



.next{

right:15px;

}


}









/* =========================
   320px PHONE
========================= */


@media(max-width:320px){



.graphic-section{


padding:30px 10px;


}





.section-title{


font-size:1.5rem;


}




.gallery{


grid-template-columns:

1fr;


}





.graphic-card{


height:330px;


}





.zoom-controls{


bottom:15px;


padding:10px;


gap:8px;


}



.zoom-controls button{


padding:8px 12px;


}



.close-button{


top:15px;


right:15px;


width:40px;


height:40px;


}




}








/* =========================
   200px
========================= */


@media(max-width:200px){



.card-content{


padding:15px;


}



.card-content p{


display:none;


}




.graphic-card{


height:260px;


}




.zoom-controls span{


font-size:12px;


}


}









/* =========================
   150px
========================= */


@media(max-width:150px){



.section-title{


font-size:.9rem;


}




.graphic-card{


height:200px;


}



.view-button{


font-size:10px;


padding:8px 12px;


}



.nav-button{


width:30px;


height:30px;


font-size:15px;


}




.close-button{


width:30px;


height:30px;


font-size:15px;


}




}

</style>
