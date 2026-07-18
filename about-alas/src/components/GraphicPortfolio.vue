<template>
  <section class="graphic-section">
    <div class="gallery">
      <div
        class="graphic-card"
        v-for="(poster, index) in visiblePosters"
        :key="index"
      >
        <div class="poster-wrapper" @click="openModal(index)">
          <img
            :src="poster.img"
            :alt="poster.title"
            class="poster-image"
            loading="lazy"
          />
          <div class="zoom-overlay">
            <svg class="zoom-icon" viewBox="0 0 24 24" fill="white">
              <circle cx="11" cy="11" r="8" stroke="white" stroke-width="2" fill="none"/>
              <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="white" stroke-width="2"/>
              <line x1="11" y1="7" x2="11" y2="15" stroke="white" stroke-width="2"/>
              <line x1="7" y1="11" x2="15" y2="11" stroke="white" stroke-width="2"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <button
      v-if="displayLimit < posters.length"
      class="load-more"
      @click="loadMore"
    >
      View More
    </button>

    <!-- Modal for Zoomable Image -->
    <div v-if="showModal" class="modal" @click.self="closeModal">
      <button class="close-button" @click="closeModal">✕</button>

      <div 
        class="viewer"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
        @mousedown="startDrag"
        @mousemove="dragImage"
        @mouseup="stopDrag"
        @mouseleave="stopDrag"
        @wheel="handleWheel"
      >
        <img
          :src="selectedImage.img"
          :alt="selectedImage.title"
          class="preview-image"
          :style="{
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
            cursor: zoom > 1 ? 'grab' : 'default',
            transition: isDragging ? 'none' : 'transform 0.3s ease'
          }"
          draggable="false"
        />
      </div>

      <div class="zoom-controls">
        <button @click="zoomOut" class="zoom-btn">−</button>
        <span class="zoom-level">{{ Math.round(zoom * 100) }}%</span>
        <button @click="zoomIn" class="zoom-btn">+</button>
        <button class="reset-button" @click="resetImage">Reset</button>
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
      position: { x: 0, y: 0 },
      isDragging: false,
      dragStart: { x: 0, y: 0 },
      imageStartPos: { x: 0, y: 0 },
      lastPinchDistance: 0,
      initialZoom: 1,
      posters: []
    };
  },

  computed: {
    visiblePosters() {
      return this.posters.slice(0, this.displayLimit);
    },
    selectedImage() {
      return this.posters[this.selectedIndex] || this.posters[0];
    }
  },

  created() {
    this.loadPosters();
  },

  methods: {
    loadPosters() {
      this.posters = images.keys()
        .sort((a, b) => b.localeCompare(a))
        .map((file) => ({
          title: this.getTitleFromFilename(file),
          img: images(file)
        }));
    },

    getTitleFromFilename(file) {
      const name = file.replace(/^\.\//, '').replace(/\.[^/.]+$/, '');
      return name
        .replace(/[-_]/g, ' ')
        .replace(/(^\w|\s\w)/g, m => m.toUpperCase());
    },

    // ===== ZOOM METHODS =====
    zoomIn() {
      if (this.zoom < 3) {
        this.zoom = Math.min(3, this.zoom + 0.25);
      }
    },

    zoomOut() {
      if (this.zoom > 0.5) {
        this.zoom = Math.max(0.5, this.zoom - 0.25);
      }
    },

    resetImage() {
      this.zoom = 1;
      this.position = { x: 0, y: 0 };
      this.isDragging = false;
    },

    // ===== MOUSE DRAG =====
    startDrag(e) {
      if (this.zoom <= 1) return;
      e.preventDefault();
      this.isDragging = true;
      this.dragStart = { x: e.clientX, y: e.clientY };
      this.imageStartPos = { ...this.position };
    },

    dragImage(e) {
      if (!this.isDragging || this.zoom <= 1) return;
      e.preventDefault();
      
      const dx = (e.clientX - this.dragStart.x);
      const dy = (e.clientY - this.dragStart.y);
      
      this.position.x = this.imageStartPos.x + dx;
      this.position.y = this.imageStartPos.y + dy;
    },

    stopDrag() {
      this.isDragging = false;
    },

    // ===== TOUCH HANDLING =====
    handleTouchStart(e) {
      const touches = e.touches;
      
      if (touches.length === 1) {
        if (this.zoom > 1) {
          this.isDragging = true;
          this.dragStart = { x: touches[0].clientX, y: touches[0].clientY };
          this.imageStartPos = { ...this.position };
        }
      } else if (touches.length === 2) {
        this.lastPinchDistance = this.getPinchDistance(touches);
        this.initialZoom = this.zoom;
      }
    },

    handleTouchMove(e) {
      e.preventDefault();
      const touches = e.touches;
      
      if (touches.length === 1 && this.isDragging) {
        const dx = touches[0].clientX - this.dragStart.x;
        const dy = touches[0].clientY - this.dragStart.y;
        this.position.x = this.imageStartPos.x + dx;
        this.position.y = this.imageStartPos.y + dy;
      } else if (touches.length === 2) {
        const distance = this.getPinchDistance(touches);
        if (this.lastPinchDistance > 0) {
          const scale = distance / this.lastPinchDistance;
          this.zoom = Math.min(3, Math.max(0.5, this.initialZoom * scale));
        }
      }
    },

    handleTouchEnd() {
      this.isDragging = false;
      this.lastPinchDistance = 0;
    },

    getPinchDistance(touches) {
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      return Math.sqrt(dx * dx + dy * dy);
    },

    handleWheel(e) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      this.zoom = Math.min(3, Math.max(0.5, this.zoom + delta));
    },

    // ===== NAVIGATION =====
    loadMore() {
      this.displayLimit += this.loadAmount;
    },

    openModal(index) {
      if (index >= 0 && index < this.posters.length) {
        this.selectedIndex = index;
        this.showModal = true;
        this.zoom = 1;
        this.position = { x: 0, y: 0 };
        this.isDragging = false;
        document.body.style.overflow = 'hidden';
      }
    },

    closeModal() {
      this.showModal = false;
      this.zoom = 1;
      this.position = { x: 0, y: 0 };
      this.isDragging = false;
      document.body.style.overflow = 'auto';
    }
  },

  beforeUnmount() {
    document.body.style.overflow = 'auto';
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

.graphic-section {
  max-width: 1200px;
  margin: auto;
  padding: 40px 20px;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 30px;
}

.graphic-card {
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border-radius: 25px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45);
  transition: 0.4s;
}

.graphic-card:hover {
  transform: translateY(-10px);
}

.poster-wrapper {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  background: #111;
  cursor: pointer;
}

.poster-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: 0.5s;
}

.graphic-card:hover .poster-image {
  transform: scale(1.05);
}

.zoom-overlay {
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
  pointer-events: none;
}

.poster-wrapper:hover .zoom-overlay {
  opacity: 1;
}

.zoom-icon {
  width: 48px;
  height: 48px;
  filter: drop-shadow(0 0 20px rgba(0, 0, 0, 0.5));
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

/* ===== MODAL ===== */
.modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.92);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.viewer {
  max-width: 90vw;
  max-height: 85vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: none;
  cursor: grab;
  position: relative;
}

.viewer:active {
  cursor: grabbing;
}

.preview-image {
  max-width: 90vw;
  max-height: 85vh;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 12px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: none;
  -webkit-user-drag: none;
}

/* ===== MODAL CONTROLS ===== */
.close-button {
  position: fixed;
  top: 30px;
  right: 40px;
  background: rgba(155, 13, 84, 0.9);
  color: white;
  border: none;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  transition: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  backdrop-filter: blur(10px);
}

.close-button:hover {
  transform: scale(1.1);
  background: #ff4d94;
}

.zoom-controls {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(0, 0, 0, 0.7);
  padding: 10px 20px;
  border-radius: 30px;
  backdrop-filter: blur(10px);
  z-index: 1001;
}

.zoom-controls button {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.15);
  color: white;
  font-size: 20px;
  transition: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.zoom-controls button:hover {
  background: rgba(255, 255, 255, 0.3);
}

.zoom-level {
  color: white;
  font-size: 14px;
  min-width: 50px;
  text-align: center;
}

.reset-button {
  background: #9b0d54 !important;
  padding: 0 16px !important;
  border-radius: 20px !important;
  width: auto !important;
  font-size: 14px !important;
}

.reset-button:hover {
  background: #ff4d94 !important;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .poster-wrapper {
    height: 300px;
  }
  .gallery {
    grid-template-columns: repeat(2, 1fr);
  }
  .close-button {
    top: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    font-size: 18px;
  }
  .zoom-controls {
    bottom: 20px;
    padding: 8px 15px;
    gap: 10px;
  }
  .zoom-controls button {
    width: 35px;
    height: 35px;
    font-size: 16px;
  }
  .viewer {
    max-width: 95vw;
    max-height: 70vh;
  }
  .preview-image {
    max-width: 95vw;
    max-height: 70vh;
  }
}

@media (max-width: 480px) {
  .poster-wrapper {
    height: 400px;
  }
  .gallery {
    grid-template-columns: 1fr;
  }
  .graphic-section {
    padding: 20px 10px;
  }
  .close-button {
    top: 15px;
    right: 15px;
    width: 35px;
    height: 35px;
    font-size: 16px;
  }
  .zoom-controls {
    bottom: 15px;
    padding: 6px 12px;
    gap: 8px;
  }
  .zoom-controls button {
    width: 30px;
    height: 30px;
    font-size: 14px;
  }
  .zoom-level {
    font-size: 12px;
    min-width: 40px;
  }
  .reset-button {
    font-size: 12px !important;
    padding: 0 12px !important;
  }
  .viewer {
    max-width: 98vw;
    max-height: 60vh;
  }
  .preview-image {
    max-width: 98vw;
    max-height: 60vh;
  }
}

@media (max-width: 320px) {
  .poster-wrapper {
    height: 320px;
  }
  .viewer {
    max-height: 50vh;
  }
  .preview-image {
    max-height: 50vh;
  }
  .zoom-controls {
    gap: 5px;
    padding: 5px 10px;
  }
  .zoom-controls button {
    width: 28px;
    height: 28px;
    font-size: 12px;
  }
}
</style>