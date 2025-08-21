<template>
    <div class="container">
        <div class="home-container">
            <h1 class="fade-in">I'M</h1>
            <h2 class="fade-in typing ">Alastair O. Ferrer</h2>
            <h3 class="fade-in">WEB DESIGNER AND DEVELOPER</h3>
            <div class="buttons">
                <button class="btn fade-in" @click="clickResume">View Resume</button>
                <button class="btn fade-in" @click="clickCV">View Curriculum Vitae</button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'HomePage',
    methods:{
        clickResume() {
        window.open('https://drive.google.com/file/d/19CICZRtZmcfDZFLGwYt6R7hOv8ap1tz1/view?usp=drive_link', '_blank')
        //  window.open('/pdf/RESUME-FERRER,ALASTAIR.pdf', '_blank');
        },
        clickCV(){
        window.open('https://drive.google.com/file/d/1pbGDsx5igtYDxHMT1Q7Lxzw6pen0OZH1/view?usp=sharing', '_blank')
        // windows.open('/pdf/CV-FERRER,ALASTAIR.pdf','_blank')
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:wght@700&family=Playfair+Display:wght@700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css");

.home-container {
    margin-top: 200px;
}
.home-container h1{
    font-size: 100px;
    font-weight: bolder;
    font-family: 'Bodoni Moda', 'Playfair Display', serif;
}

.home-container h2, .home-container h3  {
    font-family: 'Montserrat', sans-serif;
}

.home-container h2{
    font-size: 30px;
}

.home-container h2:nth-child(2){
    animation: typing 2s steps(20), blink-caret 2s step-end infinite;
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
    font-family: 'Montserrat', sans-serif;
    margin: 10px;
    padding: 10px 20px;
    background: #9b0d54;
    border: none;
    color: white;
    cursor: pointer;
    border-radius: 20px;
    animation: fadeIn 1s ease-in-out;
}
.buttons .btn:hover {
    transform: translateY(-3px);
    transition: .2s ease-in-out;
    background: #580730;
}

.profile-section {
    display: flex;
    align-items: center;
    background-color: #2a2a2a;
    padding: 40px;
    max-width: 800px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    animation: slideIn 1s ease-in-out;
}

.profile-image img {
    width: 200px;
    height: auto;
    border-radius: 8px;
}

.profile-content {
    margin-left: 30px;
    flex: 1;
}

.profile-content h2 {
    font-size: 22px;
    font-weight: bold;
    margin: 0;
}

.subtitle {
    font-size: 14px;
    color: #bbb;
    margin-bottom: 15px;
}

.description {
    font-size: 14px;
    line-height: 1.5;
    color: #ddd;
    margin-bottom: 20px;
}

.contact-info p {
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

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes slideIn {
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(0);
    }
}

@keyframes typing {
    from {
        width: 0;
    }
    to {
        width: 14ch;
    }
}

.typing {
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    border-right: 0.15em solid   #ddd;
}

@keyframes blink-caret{
    from, to {
        border-color: transparent;
    }
    50% {
        border-color:  #ddd;
    }
}

.fade-in {
    animation: fadeIn 1s ease-in-out;
}

.slide-in {
    animation: slideIn 1s ease-in-out;
}
</style>