let Navbar = {
  render: async () => {
    let view = `
      <div class="header-wrapper wrapper">
        <nav class="navbar">
          <ul>
            <li><a class="mainpage" href="#/home">Главная</a></li>
            <li><a href="#/toys">Игрушки</a></li>
            <li><a href="#/tree">Ёлка</a></li>
            <li><button class="sound header-btn checked"></button></li>
            <li><button class="snow header-btn checked"></button></li>
          </ul>
        </nav>
        <div class="header-controls">
          <div class="search">
            <input
              type="search"
              class="search-field"
              name="search"
              id="search"
              placeholder="Поиск"
              autofocus
              autocomplete="off"
            />
            </div>
          <div class="favorites-counter-container">
            <span class="favorites-counter">0</span>
          </div>
        </div>
      </div>
  `;
    return view;
  },
  after_render: async () => {},
};

export default Navbar;
