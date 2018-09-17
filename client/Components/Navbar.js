Vue.component("navbar", {
  template: `  
    <div class="container-fluid bg-black">
    <nav class="container navbar navbar-expand-lg navbar-dark bg-black">
        <a class="navbar-brand" href="#home" @click="showAll">Chronos Music Store</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <!-- <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false">
                        Category
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" @click="showCd" href="#cd">CD & Vinyl</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" @click="shwoMerch" href="#merch">Merchandise</a>
                    </div>
                </li> -->
            </ul>
            <form class="form-inline">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" v-model="itemToSearch">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit" style="color: white; margin-right: 230px;" @click="getAllCardToShow">Search</button>
            </form>
            <button v-if="!newTokenGet" class="btn btn-info my-2 my-sm-0" type="button" data-toggle="modal" data-target="#registerModal" style="margin-right: 5px;">Register</button>
            <button v-if="!newTokenGet" class="btn btn-info my-2 my-sm-0" type="button" data-toggle="modal" data-target="#loginModal" style="margin-right: 5px;">Log in</button>
            <button v-if="newTokenGet" class="btn btn-outline-light" type="button" data-toggle="modal" data-target="#cartModal" style="margin-right: 5px;">
                Carts {{ resultcartprops.length }}<i class="fa fa-shopping-cart" style="font-size:16px"></i>
             </button>
            <button v-if="newTokenGet" class="btn btn-info my-2 my-sm-0" type="button" @click="logout">Log out</button>
        </div>
     </nav>
    </div>`,
  data() {
    return {
      changeShowCd: false,
      changeShowMerch: false,
      baseUrl: "https://chronos.andresudi.club",
      itemsShow: [],
      itemToSearch: "",
      newTokenGet: false,
      islogout: false
    };
  },
  props: ['tokenget', 'propsistoken', 'resultcartprops'],
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
        emitChangeShowMerch: this.shwoMerch,
        emitClearSearchItem: this.itemsShow
      });
      location.reload()
    },
    getAllCardToShow() {
      axios({
        method: "GET",
        url: this.baseUrl + "/items"
      })
        .then(result => {
          this.itemsShow = [];
      
          result.data.data.forEach(element => {
            if (element.artist.toLowerCase().indexOf(this.itemToSearch.toLowerCase()) > -1) {
              this.itemsShow.push(element);
            }
          });

          console.log(this.itemsShow);
          
          this.$emit("all-items", this.itemsShow);
        })
        .catch(err => {
          console.log(err);
        });
    },

    logout() {
        swal({
            title: "Are you sure want to logout?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willLogout) => {
                if (willLogout) {
                    if(this.islogout) {
                        this.islogout = false
                    } else {
                        this.islogout = true
                    }
                   localStorage.clear()
                }
            });
    },
  },
  watch: {
    tokenget() {
        this.newTokenGet = true
    },
    propsistoken() {
        this.newTokenGet = true
    },
    islogout() {
        this.newTokenGet = false
        this.$emit('islogout', this.newTokenGet)
    },

  },

});
