Vue.component("item-merch", {
  template: `
    <div class="container mt-3" id="merch">
    <div id="cdvinyl" class="container-fluid bg-light-gray">
        <div class="container pt-5">
            <div class="container">
                <h3>Merchandise</h3>
            </div>
            <div class="row">
                <div class="underline-green"></div>
            </div>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-3" v-for="(item, index) in items">
            <div class="card">
                <img v-bind:src="item.img" style="height: 200px;">
                <div class="card-body">
                    <h6>
                        <strong>{{ item.artist }}</strong>
                    </h6>
                    <h6>{{ item.productName }}</h6>
                    <h6>
                        <strong>{{ item.type }}</strong>
                    </h6>
                    <h6>{{ formatMoney(item.price) }}</h6>
                    <button class="btn btn-success" value="album.id">
                        <i class="fa fa-cart-plus" aria-hidden="true"></i> Add To Cart</button>
                </div>
            </div>
        </div>
        </div>
    </div>
    `,
  data() {
    return {
      items: [],
      baseUrl: "http://localhost:3000"
    };
  },
  created() {
    axios({
      method: "GET",
      url: this.baseUrl + "/items/merch"
    })
      .then(result => {
        this.items = result.data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    formatMoney(price) {
      return `Rp. ${price.toLocaleString()},-`;
    }
  }
});
