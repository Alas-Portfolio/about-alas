<template>
  <section class="video-section">
    <div class="gallery">
      <div
        class="video-card"
        v-for="(video, index) in visibleVideos"
        :key="index"
      >
        <div class="video-wrapper">
          <div class="video-container">
            <!-- Poster Image with lazy loading -->
            <img 
              :src="video.poster" 
              :alt="video.title"
              class="video-poster"
              loading="lazy"
              decoding="async"
            />
            <!-- Video iframe - loads only on click -->
            <iframe
              v-if="video.loaded"
              :src="getEmbedUrl(video.fileId)"
              frameborder="0"
              allowfullscreen
              allow="autoplay; encrypted-media"
              class="video-iframe"
            ></iframe>
          </div>
          <div class="play-overlay" @click="loadAndOpenModal(index)">
            <svg class="play-icon" viewBox="0 0 24 24" fill="white">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </div>
        </div>
        <div class="card-content">
          <h3>{{ video.title }}</h3>
          <p>{{ video.description }}</p>
          <button class="view-button" @click="loadAndOpenModal(index)">
            Watch Full
          </button>
        </div>
      </div>
    </div>

    <button
      v-if="displayLimit < videos.length"
      class="load-more"
      @click="loadMore"
    >
      View More Videos
    </button>

    <!-- Modal for Full Video -->
    <div v-if="showModal" class="modal" @click.self="closeModal">
      <button class="close-button" @click="closeModal">✕</button>
      <button class="nav-button prev" @click="previousVideo">❮</button>
      
      <div class="modal-viewer">
        <div class="modal-video-container">
          <div class="loading-spinner" v-if="modalLoading">
            <div class="spinner"></div>
          </div>
          <img 
            :src="selectedVideo.poster" 
            :alt="selectedVideo.title"
            class="modal-poster"
            v-show="!modalVideoLoaded"
          />
          <iframe
            :src="modalVideoUrl"
            frameborder="0"
            allowfullscreen
            allow="autoplay; encrypted-media"
            class="modal-iframe"
            @load="onModalIframeLoad"
            v-show="modalVideoLoaded"
          ></iframe>
        </div>
      </div>

      <button class="nav-button next" @click="nextVideo">❯</button>
    </div>
  </section>
</template>

<script>
export default {
  name: "VideoPortfolio",
  data() {
    return {
      displayLimit: 12,
      loadAmount: 12,
      showModal: false,
      selectedIndex: 0,
      modalVideoLoaded: false,
      modalLoading: false,
      modalVideoUrl: '',
      videos: [
        { 
          title: "Falcon & Pigeon", 
          description: "Dynamic editing project featuring high-energy transitions and sound design.",
          fileId: "1liOrnDMYTo9JW2y1XKC8LEuPKNoX19_W",
          poster: "https://drive.google.com/thumbnail?id=1liOrnDMYTo9JW2y1XKC8LEuPKNoX19_W&sz=w500",
          loaded: false
        },
        { 
          title: "Kuda Phoenix Promotion", 
          description: "Brand story with cinematic visuals and emotional narrative flow.",
          fileId: "13ZFHlCua1XqQerS_2p5f29nyfYDmFW8F",
          poster: "https://drive.google.com/thumbnail?id=13ZFHlCua1XqQerS_2p5f29nyfYDmFW8F&sz=w500",
          loaded: false
        },
        { 
          title: "How to Clean Unit", 
          description: "Instructional video with clear visual guides and step-by-step editing.",
          fileId: "18DMdNQ3SJBqGTjpuxZMYoVi4lS_gDb4G",
          poster: "https://drive.google.com/thumbnail?id=18DMdNQ3SJBqGTjpuxZMYoVi4lS_gDb4G&sz=w500",
          loaded: false
        },
        { 
          title: "Production", 
          description: "Behind-the-scenes production work with raw and polished elements.",
          fileId: "1lIim2ckiCVBt-5bmATLJYbfy08oblOKi",
          poster: "https://drive.google.com/thumbnail?id=1lIim2ckiCVBt-5bmATLJYbfy08oblOKi&sz=w500",
          loaded: false
        },
        { 
          title: "Parade Buhayani", 
          description: "Heroic-themed event coverage with dramatic music and pacing.",
          fileId: "1UJs9avKJce_uYjgCRBzapBY0CxuC_OFN",
          poster: "https://drive.google.com/thumbnail?id=1UJs9avKJce_uYjgCRBzapBY0CxuC_OFN&sz=w500",
          loaded: false
        },
        { 
          title: "Kuda New Wolf Plus Promotion", 
          description: "Modern product showcase with sleek motion graphics and color grading.",
          fileId: "1OweqikPi-iMW6Ttb4a0Xa1vM__y3oXP7",
          poster: "https://drive.google.com/thumbnail?id=1OweqikPi-iMW6Ttb4a0Xa1vM__y3oXP7&sz=w500",
          loaded: false
        },
        { 
          title: "Kuda Parade to Cabs", 
          description: "Event coverage with dynamic pacing and cultural storytelling.",
          fileId: "1ygF4hRwCZMBYY5EsA4GLJDKNwixbRqTr",
          poster: "https://drive.google.com/thumbnail?id=1ygF4hRwCZMBYY5EsA4GLJDKNwixbRqTr&sz=w500",
          loaded: false
        },
        { 
          title: "Kuda Lion Features", 
          description: "Product feature highlight with clean transitions and typography.",
          fileId: "1HPfEKVEyHLz5GvH_c2W5mo-_07YUcm2a",
          poster: "https://drive.google.com/thumbnail?id=1HPfEKVEyHLz5GvH_c2W5mo-_07YUcm2a&sz=w500",
          loaded: false
        },
        { 
          title: "Mini Lion Features", 
          description: "Compact version of Lion Features with punchy, fast-paced editing.",
          fileId: "1tqMOed6QBbh4glAPZ5jBGWn3F4Ny3H-3",
          poster: "https://drive.google.com/thumbnail?id=1tqMOed6QBbh4glAPZ5jBGWn3F4Ny3H-3&sz=w500",
          loaded: false
        },
        { 
          title: "Parade Anilag", 
          description: "Festival highlights with vibrant colors and energetic cuts.",
          fileId: "1bcD9csmBWJFipV4ZGWINothorGVqmzxZ",
          poster: "https://drive.google.com/thumbnail?id=1bcD9csmBWJFipV4ZGWINothorGVqmzxZ&sz=w500",
          loaded: false
        },
        { 
          title: "Rough Road with Lion", 
          description: "Documentary-style editing with gritty visuals and real-world storytelling.",
          fileId: "1X7YzoP_dcw2Rbz-oBnKZJc6MpENgUaam",
          poster: "https://drive.google.com/thumbnail?id=1X7YzoP_dcw2Rbz-oBnKZJc6MpENgUaam&sz=w500",
          loaded: false
        },
        { 
          title: "Witness How Easy to U-Turn", 
          description: "Short film with dramatic tension and precise editing timing.",
          fileId: "147ZPxlddNcztMmw_c9emw0UjXVTnZZto",
          poster: "https://drive.google.com/thumbnail?id=147ZPxlddNcztMmw_c9emw0UjXVTnZZto&sz=w500",
          loaded: false
        }
      ]
    };
  },
  computed: {
    visibleVideos() {
      return this.videos.slice(0, this.displayLimit);
    },
    selectedVideo() {
      return this.videos[this.selectedIndex] || this.videos[0];
    }
  },
  methods: {
    getEmbedUrl(fileId) {
      if (!fileId) return '';
      return `https://drive.google.com/file/d/${fileId}/preview`;
    },
    loadAndOpenModal(index) {
      if (index >= 0 && index < this.videos.length) {
        // Mark video as loaded
        this.videos[index].loaded = true;
        this.selectedIndex = index;
        this.showModal = true;
        this.modalVideoLoaded = false;
        this.modalLoading = true;
        this.modalVideoUrl = this.getEmbedUrl(this.videos[index].fileId);
        
        // Hide loading after 1.5 seconds
        setTimeout(() => {
          this.modalLoading = false;
        }, 1500);
      }
    },
    onModalIframeLoad() {
      this.modalVideoLoaded = true;
      this.modalLoading = false;
    },
    loadMore() {
      this.displayLimit += this.loadAmount;
    },
    closeModal() {
      this.showModal = false;
      this.modalVideoLoaded = false;
      this.modalLoading = false;
      this.modalVideoUrl = '';
    },
    nextVideo() {
      if (this.videos.length > 0) {
        this.selectedIndex = (this.selectedIndex + 1) % this.videos.length;
        // Preload next video
        this.videos[this.selectedIndex].loaded = true;
        this.modalVideoLoaded = false;
        this.modalLoading = true;
        this.modalVideoUrl = this.getEmbedUrl(this.videos[this.selectedIndex].fileId);
        setTimeout(() => {
          this.modalLoading = false;
        }, 1500);
      }
    },
    previousVideo() {
      if (this.videos.length > 0) {
        this.selectedIndex = (this.selectedIndex - 1 + this.videos.length) % this.videos.length;
        // Preload previous video
        this.videos[this.selectedIndex].loaded = true;
        this.modalVideoLoaded = false;
        this.modalLoading = true;
        this.modalVideoUrl = this.getEmbedUrl(this.videos[this.selectedIndex].fileId);
        setTimeout(() => {
          this.modalLoading = false;
        }, 1500);
      }
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

* {
  font-family: Montserrat, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.video-section {
  max-width: 1200px;
  margin: auto;
  padding: 60px 20px;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 30px;
}

.video-card {
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border-radius: 25px;
  overflow: hidden;
  min-height: 520px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45);
  transition: 0.4s;
}

.video-card:hover {
  transform: translateY(-10px);
}

.video-wrapper {
  position: relative;
  width: 100%;
  height: 330px;
  overflow: hidden;
  background: #111;
}

.video-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.video-poster {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  transition: 0.5s;
}

.video-card:hover .video-poster {
  transform: scale(1.05);
}

.video-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  z-index: 2;
}

.play-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: 0.3s;
  cursor: pointer;
  z-index: 3;
}

.video-card:hover .play-overlay {
  opacity: 1;
}

.play-icon {
  width: 60px;
  height: 60px;
  filter: drop-shadow(0 0 20px rgba(155, 13, 84, 0.5));
  transition: 0.3s;
}

.play-overlay:hover .play-icon {
  transform: scale(1.1);
}

.card-content {
  padding: 25px;
  color: white;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05));
  backdrop-filter: blur(15px);
  flex: 1;
}

.card-content h3 {
  font-size: 1.2rem;
  margin-bottom: 12px;
  color: white;
}

.card-content p {
  font-size: 0.9rem;
  line-height: 1.6;
  color: #ddd;
  margin-bottom: 20px;
}

.view-button {
  width: 100%;
  padding: 13px;
  border: none;
  border-radius: 30px;
  background: linear-gradient(45deg, #9b0d54, #ff4d94);
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.view-button:hover {
  transform: scale(1.02);
  box-shadow: 0 5px 20px rgba(155, 13, 84, 0.4);
}

.load-more {
  display: block;
  margin: 40px auto 0;
  padding: 14px 35px;
  border: none;
  border-radius: 30px;
  background: linear-gradient(45deg, #9b0d54, #ff4d94);
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.load-more:hover {
  transform: scale(1.02);
  box-shadow: 0 5px 20px rgba(155, 13, 84, 0.4);
}

.modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-viewer {
  max-width: 90%;
  max-height: 85%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-video-container {
  width: 80vw;
  height: 70vh;
  position: relative;
  background: #111;
  border-radius: 20px;
  overflow: hidden;
}

.modal-poster {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  border-radius: 20px;
}

.modal-iframe {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 20px;
  position: relative;
  z-index: 2;
}

.loading-spinner {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  background: rgba(0, 0, 0, 0.5);
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 255, 255, 0.1);
  border-top: 5px solid #9b0d54;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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
  transition: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.close-button:hover,
.nav-button:hover {
  transform: scale(1.1);
  background: #ff4d94;
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

@media (max-width: 768px) {
  .video-wrapper {
    height: 280px;
  }
  .video-card {
    min-height: 480px;
  }
  .gallery {
    grid-template-columns: repeat(2, 1fr);
  }
  .close-button {
    top: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    font-size: 20px;
  }
  .nav-button {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }
  .prev {
    left: 20px;
  }
  .next {
    right: 20px;
  }
  .modal-video-container {
    width: 90vw;
    height: 60vh;
  }
  .play-icon {
    width: 45px;
    height: 45px;
  }
}

@media (max-width: 480px) {
  .video-wrapper {
    height: 420px;
  }
  .card-content p {
    font-size: 0.85rem;
  }
  .gallery {
    grid-template-columns: 1fr;
  }
  .video-card {
    height: 340px;
  }
  .close-button {
    top: 15px;
    right: 15px;
    width: 35px;
    height: 35px;
    font-size: 18px;
  }
  .nav-button {
    width: 35px;
    height: 35px;
    font-size: 18px;
  }
  .prev {
    left: 10px;
  }
  .next {
    right: 10px;
  }
  .modal-video-container {
    width: 95vw;
    height: 50vh;
  }
  .play-icon {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 320px) {
  .video-card {
    height: 280px;
  }
  .card-content {
    padding: 15px;
  }
}
</style>