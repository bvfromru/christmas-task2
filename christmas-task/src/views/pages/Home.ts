let Home = {
  render: async () => {
    let view = `
    <div class="main-container start-page">
      <div class="main-wrapper wrapper">
        <div class="ball ball1"></div>
        <div class="ball ball2"></div>
        <h1 class="start-page-title">Новогодняя игра<br>«Наряди ёлку»</h1>
        <a class="btn start-btn" href="#/toys">Начать</a>
      </div>
    </div>
   
        `;
    return view;
  },
  after_render: async () => {

   document.querySelector('.header-controls')?.classList.add('hidden');
   document.querySelector('.snow')?.classList.add('hidden');

  },
};

export default Home;
