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
                        <h6><strong>{{ formatName(item.category) }}</strong></h6>
                        <h6>{{ formatMoney(item.price) }}</h6>
                        <h6>
                            <i>Stocks: {{ item.stock }} pcs</i>
                        </h6>
                        <button v-if="newTokenGet && item.stock < 1" class="btn btn-success" value="album.id" @click="addToCart(item)" disabled>
                          <i class="fa fa-cart-plus" aria-hidden="true"></i> Add To Cart</button>
                        <button v-if="newTokenGet && item.stock > 0" class="btn btn-success" value="album.id" @click="addToCart(item)">
                          <i class="fa fa-cart-plus" aria-hidden="true"></i> Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`,
  props: ["itemshow", "tokenget", "propsistoken", "islogoutprops", "nolincart"],
  data() {
    return {
      newTokenGet: false,
      carts: []
    };
  },
  methods: {
    formatMoney(price) {
      return `Rp. ${price.toLocaleString()},-`;
    },
    formatName(name){
      if (name == 'cd') {
        name = 'CD/Vinyl'
      } else {
        name = 'Merchandise'
      }
      return name
    },
    addToCart(item) {
      this.totalPrice = 0;
      this.carts.push(item);
      this.carts.forEach((cart, index) => {
        if (index == this.carts.length - 1) {
          cart.stock -= 1;
        }
      });
      this.carts.forEach(cart => {
        this.totalPrice += cart.price;
      });

    }
  },
  watch: {
    tokenget() {
      this.newTokenGet = true;
    },
    propsistoken() {
      this.newTokenGet = true;
    }
  },
  watch: {
    tokenget() {
      this.newTokenGet = true;
    },
    propsistoken() {
      this.newTokenGet = true;
    },
    islogoutprops() {
      this.newTokenGet = false;
    },
    carts() {
      this.$emit('resultcart', this.carts)
    },
    nolincart() {
      this.carts = []
    }
  }
});
