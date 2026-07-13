<template>

<section class="carousel-section">

  <div class="carousel-wrapper">

    <div
      v-for="(item,index) in carouselItems"
      :key="index"
      class="carousel-item"
      :class="{active:activeIndex === index}"
    >

      <img
        :src="item.imgSrc"
        :alt="item.title"
      >

      <div class="carousel-overlay">

        <h2>
          {{item.title}}
        </h2>

        <p>
          {{item.description}}
        </p>

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



<!-- GRAPHICS -->

<GraphicPortfolio />



<!-- VIDEOS -->

<VideoPortfolio />




<section class="all-projects">


<div class="container">


<h2 class="section-title">
💻 Web Development Projects
</h2>



<div class="projects-grid">


<div
class="project-card"
v-for="(project,index) in projects"
:key="index"
>


<img
:src="project.img"
:alt="project.title"
class="project-img"
/>



<h3>
{{project.title}}
</h3>



<p>
{{project.description}}
</p>



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


</template>




<script>

import GraphicPortfolio from "@/components/GraphicPortfolio.vue";
import VideoPortfolio from "@/components/VideoPortfolio.vue";


export default{


name:"AboutPage",



components:{

GraphicPortfolio,

VideoPortfolio

},



data(){


return{


activeIndex:0,

intervalId:null,



carouselItems:[


{
title:"Laravel",

description:
"Backend development using MVC architecture, Eloquent ORM, authentication, and database management.",

imgSrc:require("../images/laravel.png")

},



{
title:"React",

description:
"Building responsive interfaces with reusable components and modern frontend workflow.",

imgSrc:require("../images/react.jpg")

},



{
title:"Javascript",

description:
"Creating interactive applications with clean logic and dynamic user experiences.",

imgSrc:require("../images/js.jpg")

},



{
title:"HTML & CSS",

description:
"Designing responsive layouts with modern UI principles and animations.",

imgSrc:require("../images/html.jpg")

},



{
title:"Figma",

description:
"Creating high fidelity prototypes and user-centered interface designs.",

imgSrc:require("../images/figma.jpg")

}


],




projects:[


{

title:"Faculty Submittals Monitoring System",

description:
"Capstone web application that allows faculty members to submit requirements and monitor progress.",

img:require("../images/faculty-submittals.png"),

url:"https://faculty-submittals.onrender.com"

},



{

title:"Barangay Resident Master List",

description:
"React and Bootstrap based system designed for managing resident information.",

img:require("../images/barangayresidentmasterlist.png"),

url:"https://barangayresidentmasterlist.onrender.com/"

},



{

title:"FrameCraters",

description:
"High fidelity Figma website design created during internship.",

img:require("../images/framecraters.png"),

url:"https://www.figma.com/"

},



{

title:"Krezil Food Stall",

description:
"Business website UI design focused on branding and customer experience.",

img:require("../images/KREZIL-FOOD-STALL.jpg"),

url:"https://www.figma.com/"

},



{

title:"Matcha Ka",

description:
"Modern website interface design with interactive prototype experience.",

img:require("../images/matcha-ka.png"),

url:"https://www.figma.com/"

}


]


}



},



mounted(){


this.startCarousel();


},



beforeUnmount(){


clearInterval(this.intervalId);


},



methods:{



startCarousel(){


this.intervalId=setInterval(()=>{


this.nextSlide();


},5000);



},




nextSlide(){


this.activeIndex=
(this.activeIndex+1)
%
this.carouselItems.length;


},




previousSlide(){


this.activeIndex=
(this.activeIndex-1+
this.carouselItems.length)
%
this.carouselItems.length;


}



}



}


</script>




<style scoped>


@import url(
'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap'
);



*{

font-family:Montserrat,sans-serif;

}



.carousel-section{

padding:40px 20px;

}



.carousel-wrapper{

max-width:1200px;

height:550px;

margin:auto;

position:relative;

overflow:hidden;

border-radius:25px;

box-shadow:
0 20px 60px rgba(0,0,0,.5);

}



.carousel-item{

display:none;

height:100%;

position:relative;

animation:slide .8s ease;

}



.carousel-item.active{

display:block;

}



.carousel-item img{

width:100%;

height:100%;

object-fit:cover;

}




.carousel-overlay{
display: grid;
justify-content: center;  

position:absolute;

bottom:0;

width:100%;

padding:40px;

color:white;

background:
linear-gradient(
transparent,
rgba(0,0,0,.9)
);

}



.carousel-overlay h2{

font-size:40px;

}



.carousel-overlay p{

max-width:700px;

font-size:18px;

}




.carousel-btn{

position:absolute;

top:50%;

transform:translateY(-50%);

background:#9b0d54;

border:none;

color:white;

font-size:30px;

width:55px;

height:55px;

border-radius:50%;

cursor:pointer;

}



.left{

left:20px;

}


.right{

right:20px;

}



@keyframes slide{


from{

opacity:0;

transform:scale(1.1);

}


to{

opacity:1;

transform:scale(1);

}


}



.all-projects{

margin:60px auto;

padding:30px;

background:
rgba(0,0,0,.6);

border-radius:25px;

max-width:1200px;

}



.section-title{

color:white;

text-align:center;

margin-bottom:40px;

}



.projects-grid{

display:grid;

grid-template-columns:
repeat(auto-fit,minmax(280px,1fr));

gap:30px;

}



.project-card{

background:
rgba(255,255,255,.08);

padding:20px;

border-radius:20px;

color:white;

transition:.4s;

}



.project-card:hover{

transform:translateY(-10px);

}



.project-img{

width:100%;

height:200px;

object-fit:cover;

border-radius:15px;

}



.project-button{

display:inline-block;

background:#9b0d54;

padding:12px 25px;

border-radius:25px;

color:white;

text-decoration:none;

}



@media(max-width:768px){


.carousel-wrapper{

height:400px;

}



.carousel-overlay h2{

font-size:25px;

}



}



@media(max-width:320px){


.carousel-wrapper{

height:250px;

}



.carousel-overlay{

padding:15px;

}



.carousel-overlay p{

font-size:12px;

}


}



@media(max-width:150px){


.carousel-wrapper{

height:180px;

}



.carousel-btn{

width:30px;

height:30px;

font-size:15px;

}


}


</style>