Vue.component("navbar", {
  template: `  
    <div class="container-fluid bg-black">
    <nav class="container navbar navbar-expand-lg navbar-dark bg-black">
        <a class="navbar-brand" href="#">Chronos Music Store</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="#home" @click="showAll">Home
                        <span class="sr-only">(current)</span>
                    </a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false">
                        Category
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" @click="showCd" href="#cd">CD & Vinyl</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" @click="shwoMerch" href="#merch">Merchandise</a>
                    </div>
                </li>
            </ul>
            <form class="form-inline">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" v-model="itemToSearch">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit" style="color: white; margin-right: 70px;" @click="getAllCardToShow">Search</button>
            </form>
            <button class="btn btn-outline-light" type="button" data-toggle="modal" data-target="#cart" style="margin-right: 5px;">
                <i class="fa fa-shopping-cart" style="font-size:16px"></i>
            </button>
            <button class="btn btn-info my-2 my-sm-0" type="button" data-toggle="modal" data-target="#loginModal" style="margin-right: 5px;">Register</button>
            <button class="btn btn-info my-2 my-sm-0" type="button" data-toggle="modal" data-target="#loginModal" style="margin-right: 5px;">Log in</button>
            <button class="btn btn-info my-2 my-sm-0" type="button">Log out</button>
        </div>
     </nav>
    </div>`,
  data() {
    return {
      changeShowCd: false,
      changeShowMerch: false,
      baseUrl: "http://localhost:3000",
      itemsShow: [],
      itemToSearch: ""
    };
  },
  methods: {
    showCd() {
      this.changeShowMerch = false;
      this.$emit("show-merch", this.changeShowMerch);
    },
    shwoMerch() {
      this.changeShowCd = false;
      this.$emit("show-cd", this.changeShowCd);
    },
    showAll() {
      this.changeShowCd = true;
      this.changeShowMerch = true;
      this.itemsShow = []
      this.$emit("show-all", {
        emitChangeShowCd: this.changeShowCd,
        emitChangeShowMerch: this.shwoMerch
      });
    },
    getAllCardToShow() {
      axios({
        method: "GET",
        url: this.baseUrl + "/items/"
      })
        .then(result => {
          this.itemsShow = [];
      
          result.data.data.forEach(element => {
            if (element.productName.toLowerCase().indexOf(this.itemToSearch.toLowerCase()) > -1) {
              this.itemsShow.push(element);
            }
          });

          this.$emit("all-items", this.itemsShow);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
});
