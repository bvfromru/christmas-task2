import Utils        from './../../services/Utils.js'

let Bottombar = {
  render: async () => {
    let view = `
        <div class="footer-wrapper wrapper">
          <div class="github">
            <a class = "footer-btn" href="https://github.com/bvfromru" target="_blank"><img src="./assets/svg/github.svg" alt="GitHub logo"></a>
          </div>
          <div class="year">
            2021
          </div>
          <div class="rsschool">
            <a class = "footer-btn" href="https://rs.school/js/" target="_blank"><img src="./assets/svg/rs_school_white.svg" alt="RS School logo"></a>
          </div>
        </div>
    `;
    return view;
  },
  after_render: async () => {
  },
};

export default Bottombar;
