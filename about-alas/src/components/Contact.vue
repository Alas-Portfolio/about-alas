<template>
    <div class="container">
      <div class="home-container">
        <div class="profile-section slide-in">
          <div class="profile-image">
            <img src="../images/my-image.jpg" alt="Profile" class="img-shadow">
          </div>
          <div class="profile-content">
            <h2>Alastair O. Ferrer</h2>
            <p class="subtitle">WEB DESIGNER AND DEVELOPER</p>
            <p class="description">
              Alastair is passionate about creating intuitive and beautiful user interfaces. 
              Always striving to improve his skills and collaborate with others to deliver high-quality products.
            </p>
            <div class="contact-info">
              <p><i class="fas fa-phone"></i> +63 935 609 4847</p>
              <p><i class="fas fa-map-marker-alt"></i> Cabuyao Laguna, B24 L20 St. Joseph 7, Brgy. Marinig, Cabuyao City Laguna</p>
            </div>
            <div class="social-media">
              <a href="https://www.linkedin.com" target="_blank" class="social-icon"><i class="fab fa-linkedin-in"></i></a>
              <a href="https://github.com" target="_blank" class="social-icon"><i class="fab fa-github"></i></a>
              <a href="mailto:alastair@example.com" target="_blank" class="social-icon"><i class="fas fa-envelope"></i></a>
            </div>
          </div>
        </div>

        <div class="skills-section">
          <h3>Skills</h3>
          <div class="skills-list">
            <div class="skill-item">HTML5</div>
            <div class="skill-item">CSS3</div>
            <div class="skill-item">JavaScript</div>
            <div class="skill-item">Vue.js</div>
            <div class="skill-item">React</div>
            <div class="skill-item">Laravel</div>
            <div class="skill-item">jQuery</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    name: 'Contact',
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

body {
    transition: background-color 0.3s ease;
    font-family: 'Montserrat', sans-serif;
}
.home-container {
    margin-top: 100px;
}

.profile-section {
    font-family: 'Montserrat', sans-serif;
    display: flex;
    align-items: center;
    background-color: #f7f7f7;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    animation: slideIn 1s ease-in-out, fadeIn 1s ease-in-out;
}

@keyframes slideIn {
    0% {
        transform: translateX(-50%);
        opacity: 0;
    }
    100% {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

.profile-image img {
    width: 200px;
    height: auto;
    border-radius: 8px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.profile-image img:hover {
    transform: scale(1.1);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.profile-content {
    display: flex;
    flex-direction: column;
    margin-left: 40px;
    flex: 1;
}

.profile-content h2 {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    transition: color 0.3s ease;
}

.profile-content h2:hover {
    color: #9b0d54;
}

.subtitle {
    font-size: 16px;
    color: #777;
    margin-bottom: 10px;
}

.description {
    font-size: 16px;
    color: #555;
    line-height: 1.6;
    margin-bottom: 20px;
}

.contact-info p {
    font-size: 14px;
    color: #555;
    margin: 5px 0;
    display: flex;
    align-items: center;
}

.contact-info i {
    color: #ffcc00;
    margin-right: 10px;
}

.skills-section {
    margin-top: 40px;
}

.skills-section h3 {
    font-family: 'Montserrat', sans-serif;
    text-align: center;
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 15px;
}

.skills-list {
    font-family: 'Montserrat', sans-serif;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 15px;
}

.skill-item {
    background-color: #9b0d54;
    color: white;
    padding: 10px 20px;
    border-radius: 20px;
    margin: 5px;
    font-size: 14px;
    font-weight: bold;
    transition: transform 0.3s ease, background-color 0.3s ease;
}

.skill-item:hover {
    transform: scale(1.1) rotate(10deg);
    background-color: #700a3d;
}

.social-media {
    display: flex;
    gap: 15px;
    margin-top: 20px;
}

.social-icon {
    font-size: 20px;
    color: #333;
    transition: transform 0.3s ease, color 0.3s ease;
}

.social-icon:hover {
    color: #ffcc00;
    transform: translateY(-5px);
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

    .skills-list {
        justify-content: center;
    }
}
</style>
