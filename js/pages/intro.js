/**
 * Intro Page - Trang Giới thiệu
 * 
 * ╔══════════════════════════════════════════════════╗
 * ║  HƯỚNG DẪN CHỈNH SỬA THÔNG TIN CÁ NHÂN:       ║
 * ║  Tìm object PERSONAL_INFO bên dưới và thay đổi  ║
 * ║  các giá trị theo thông tin thật của bạn.        ║
 * ╚══════════════════════════════════════════════════╝
 */

// ============================================================
// CHỈNH SỬA THÔNG TIN CÁ NHÂN TẠI ĐÂY
// ============================================================
const PERSONAL_INFO = {
  name: 'Hoàng Trung Dũng',
  greeting: 'Xin chào, mình là',
  subtitle: 'Sinh viên ngành Công nghệ Thông tin, đam mê khám phá công nghệ và xây dựng các sản phẩm số sáng tạo.',

  // Thông tin cá nhân
  school: 'Trường Đại học Công nghệ - Đại học Quốc Gia Hà Nội',
  major: 'Công nghệ thông tin',
  year: 'Năm 1',
  email: 'suka@blyat.com',
  location: 'TP Hà Nội',

  // Giới thiệu bản thân
  bio: 'Mình là sinh viên năm nhất, luôn tò mò về cách công nghệ có thể giải quyết những vấn đề thực tế. Với niềm đam mê lập trình và thiết kế, mình mong muốn trở thành một kỹ sư phần mềm có khả năng tạo ra những sản phẩm có giá trị cho cộng đồng.',

  // Phương châm cá nhân
  quote: '"Thiết kế cuộc sống mà bạn muốn, rồi tìm cách biến nó thành hiện thực."',
  quoteAuthor: '— Phương châm cá nhân',

  // Kỹ năng & công cụ
  skills: [
    { name: 'HTML/CSS', icon: '🌐', level: 70 },
    { name: 'JavaScript', icon: '⚡', level: 50 },
    { name: 'Python', icon: '🐍', level: 40 },
    { name: 'Git', icon: '📦', level: 55 },
    { name: 'AI Tools', icon: '🤖', level: 65 },
    { name: 'Figma', icon: '🎨', level: 45 },
  ],

  // Mục tiêu nghề nghiệp (timeline)
  goals: [
    {
      date: '2025-2026',
      title: 'Nền tảng vững chắc',
      desc: 'Hoàn thành các môn học cơ sở, nắm vững lập trình và tư duy logic.'
    },
    {
      date: '2026-2027',
      title: 'Phát triển chuyên sâu',
      desc: 'Tham gia dự án thực tế, học thêm về phát triển web và ứng dụng.'
    },
    {
      date: '2027-2028',
      title: 'Thực tập & Trải nghiệm',
      desc: 'Thực tập tại công ty công nghệ, xây dựng portfolio chuyên nghiệp.'
    },
    {
      date: '2028-2029',
      title: 'Khởi đầu sự nghiệp',
      desc: 'Tốt nghiệp và bắt đầu sự nghiệp trong lĩnh vực kỹ thuật phần mềm.'
    }
  ]
};

// ============================================================
// RENDER FUNCTIONS
// ============================================================

export function renderIntroPage() {
  return `
    <!-- Hero Section -->
    <section class="hero" id="hero-section">
      <div class="container">
        <div class="hero__content">
          <p class="hero__greeting reveal">
            <span class="wave">👋</span>
            <span>${PERSONAL_INFO.greeting}</span>
          </p>
          <h1 class="hero__name reveal">
            <span class="text-gradient">${PERSONAL_INFO.name}</span>
          </h1>
          <p class="hero__subtitle reveal">
            ${PERSONAL_INFO.subtitle}
          </p>
          <div class="hero__cta reveal">
            <a href="#/projects" class="btn btn--primary btn--lg" id="cta-projects">
              📂 Xem dự án
            </a>
            <a href="#/summary" class="btn btn--outline btn--lg" id="cta-summary">
              Tổng kết hành trình
            </a>
          </div>
        </div>
        <div class="hero__decoration" aria-hidden="true">
          <div class="hero__orb hero__orb--1"></div>
          <div class="hero__orb hero__orb--2"></div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="section" id="about-section">
      <div class="container">
        <div class="section__header reveal">
          <span class="section__label">Về mình</span>
          <h2 class="section__title">Giới thiệu bản thân</h2>
          <div class="divider"></div>
        </div>
        <div class="about-grid">
          <div class="about__avatar-wrapper reveal reveal--left">
            <div class="about__avatar-glow"></div>
            <img class="about__avatar" src="assets/images/profilepic.jpg" alt="Hoàng Trung Dũng">
          </div>
          <div class="about__info">
            <p class="about__bio reveal">${PERSONAL_INFO.bio}</p>
            <div class="info-list reveal">
              <div class="info-item">
                <span class="info-item__icon">🏫</span>
                <span class="info-item__label">Trường</span>
                <span class="info-item__value">${PERSONAL_INFO.school}</span>
              </div>
              <div class="info-item">
                <span class="info-item__icon">📚</span>
                <span class="info-item__label">Ngành</span>
                <span class="info-item__value">${PERSONAL_INFO.major}</span>
              </div>
              <div class="info-item">
                <span class="info-item__icon">🎓</span>
                <span class="info-item__label">Năm</span>
                <span class="info-item__value">${PERSONAL_INFO.year}</span>
              </div>
              <div class="info-item">
                <span class="info-item__icon">📧</span>
                <span class="info-item__label">Email</span>
                <span class="info-item__value">${PERSONAL_INFO.email}</span>
              </div>
              <div class="info-item">
                <span class="info-item__icon">📍</span>
                <span class="info-item__label">Địa điểm</span>
                <span class="info-item__value">${PERSONAL_INFO.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quote Section -->
    <section class="section" id="quote-section">
      <div class="container">
        <div class="card card--glass quote-card gradient-border reveal reveal--scale">
          <div class="quote-card__icon">❝</div>
          <p class="quote-card__text">${PERSONAL_INFO.quote}</p>
          <p class="quote-card__author">${PERSONAL_INFO.quoteAuthor}</p>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section class="section" id="skills-section">
      <div class="container">
        <div class="section__header reveal">
          <span class="section__label">Kỹ năng</span>
          <h2 class="section__title">Công cụ & Kỹ năng</h2>
          <div class="divider"></div>
        </div>
        <div class="skills-grid stagger-children">
          ${PERSONAL_INFO.skills.map(skill => `
            <div class="skill-item reveal">
              <span class="skill-item__icon">${skill.icon}</span>
              <span class="skill-item__name">${skill.name}</span>
              <div class="skill-item__level">
                <div class="progress">
                  <div class="progress__bar" data-width="${skill.level}%"></div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Goals Timeline -->
    <section class="section" id="goals-section">
      <div class="container container--narrow">
        <div class="section__header reveal">
          <span class="section__label">Mục tiêu</span>
          <h2 class="section__title">Lộ trình nghề nghiệp</h2>
          <div class="divider"></div>
        </div>
        <div class="timeline stagger-children">
          ${PERSONAL_INFO.goals.map(goal => `
            <div class="timeline__item reveal">
              <div class="timeline__dot"></div>
              <span class="timeline__date">${goal.date}</span>
              <h4 class="timeline__title">${goal.title}</h4>
              <p class="timeline__desc">${goal.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

/**
 * Post-render initialization for intro page
 * Animates progress bars after they become visible
 */
export function initIntroPage(pageElement) {
  // Animate progress bars when visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        bar.style.width = bar.dataset.width;
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });

  pageElement.querySelectorAll('.progress__bar').forEach(bar => {
    observer.observe(bar);
  });
}
