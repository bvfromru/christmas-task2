let Error404 = {

    render : async () => {
        let view =  /*html*/`
          <div class="main-container error-page">
            <div class="main-wrapper wrapper">
              <section class="section">
                  <h1> 404 Error </h1>
                  <p>Please try to use menu links.</p>
              </section>
            </div>
          </div>
        `
        return view
    }
    , after_render: async () => {
    }
}
export default Error404;