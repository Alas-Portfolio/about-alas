<template>

  <div class="container">
    <div class="home-container">
      <div class="profile-section slide-in">
        <div class="profile-image">
          <img src="../images/my-image.jpg" alt="Profile" class="img-shadow" />
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
            <a href="https://www.linkedin.com/in/ferrer-alastair-9bb16032b/" target="_blank" class="social-icon"><i class="fab fa-linkedin-in"></i></a>
            <a href="https://github.com/AlastairFerrer" target="_blank" class="social-icon"><i class="fab fa-github"></i></a>
            <a href="mailto:alastair792@gmail.com" target="_blank" class="social-icon"><i class="fas fa-envelope"></i></a>
          </div>
        </div>
      </div>
    </div>
  </div>

   <AppFooter/>
</template>

<script>
import AppFooter from '../components/Footer.vue';

export default {
  name: 'ContactPage',
  components: {
    AppFooter,
  },
};
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
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 80px;
  position: relative;
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

.footer {
  font-family: 'Montserrat', sans-serif;
  background-color: #333;
  color: #fff;
  padding: 20px 0;
  height: 50px;
  width: 100%;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1; 
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.footer p {
  margin: 10px 0;
}

.footer-social {
  margin-top: 10px;
  display: flex;
  gap: 15px;
}

.footer-social .social-icon {
  font-size: 20px;
  color: #fff;
  transition: color 0.3s ease;
}

.footer-social .social-icon:hover {
  transition: 0.5s ease-in-out;
  color: #ffcc00;
}

@media (max-width: 768px) {
  .profile-section {
    flex-direction: column;
    text-align: center;
    padding: 30px 20px;
  }

  .profile-image img {
    width: 150px;
  }

  .profile-content {
    margin-left: 0;
    margin-top: 20px;
  }

  .footer {
    position: relative;
    
    margin-top: 40px;
  }

  .footer-content {
    flex-direction: column;
  }
}
</style>
