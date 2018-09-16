Vue.component("item-show", {
  template: ` 
    <div class="container mt-3" id="">
        <div class="row">
            <div class="col-md-3" v-for="(item, index) in itemshow">
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
                        <h6>
                            <i>Stocks: {{ item.stock }} pcs</i>
                        </h6>
                        <button v-if="newTokenGet" class="btn btn-success">
                            <i class="fa fa-cart-plus" aria-hidden="true"></i> Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`,
  props: ["itemshow",'tokenget', 'propsistoken'], 
  data() {
    return {};
  },
  methods: {
    formatMoney(price) {
      return `Rp. ${price.toLocaleString()},-`;
    }
  },
  watch: {
    tokenget() {
        this.newTokenGet = true
    },
    propsistoken() {
        this.newTokenGet = true
    } 
  },
  watch: {
    tokenget() {
        this.newTokenGet = true
    },
    propsistoken() {
        this.newTokenGet = true
    }
  }
});
