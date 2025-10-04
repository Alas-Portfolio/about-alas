<template>
  <footer class="footer">
    <div>
      <p>&copy; 2025 Alastair O. Ferrer. All Rights Reserved.</p>
      <div class="footer-social">
        <a href="https://www.linkedin.com/in/ferrer-alastair-9bb16032b/" target="_blank" class="social-icon"><i class="fab fa-linkedin-in"></i></a>
        <a href="https://github.com/AlastairFerrer" target="_blank" class="social-icon"><i class="fab fa-github"></i></a>
        <a href="mailto:alastair792@gmail.com" target="_blank" class="social-icon"><i class="fas fa-envelope"></i></a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
};
</script>

<style scoped>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
/* .footer {
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  font-family: 'Montserrat', sans-serif;
  padding: 20px 0;
  width: 100%;
  text-align: center;
  margin-top: 80px
} */

.footer p {
  word-break: break-word;
  margin: 10px 0;
}

.footer-social {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
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

@media (max-width: 1200px) {
  /* .footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: auto;
    position: relative;
    bottom: 0;
  } */
}
@media (max-width: 768px) {
  .footer {
    margin-top: 40px;
  }

  .footer-content {
    flex-direction: column;
  }
  
}

  @media screen and (max-height: 1060px){
    .footer {
      position: relative;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
</style>
