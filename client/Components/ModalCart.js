Vue.component("modal-cart", {
  template: `
    <div class="modal fade" id="cartModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">My Cart</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div v-if="cartsfromparent.length < 1">
                        <h3>No Item to buy</h3>
                    </div>
                    <table class="table" v-if="cartsfromparent.length > 0">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Items</th>
                                <th scope="col">Price</th>
                                <th scope="col">Qty</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody v-if="cartsfromparent.length > 0">
                            <tr v-for="(cart, index) in cartsfromparent">
                                <th scope="row"> {{index+1}} </th>
                                <td> {{cart.productName}} </td>
                                <td> {{ formatMoney(cart.price) }} </td>
                                <td> 1 </td>
                                <td>
                                    <button type="button" class="btn btn-danger btn-sm" v-on:click="cancel(index)">
                                        <i class="fas fa-ban"></i>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="4">Total Price</td>
                                <td> {{ formatMoney(totalPrice) }} </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer" v-if="cartsfromparent.length > 0">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="buy()">Submit</button>
                    <!-- <p v-if="msgPush" style="color: green"> {{msgPush}} </p> -->
                </div>
            </div>
        </div>
    </div>
    `,
  props: ["cartsfromparent", "tocartprops"],
  data() {
    return {
      totalPrice: 0,
      base_url: "https://chronos.andresudi.club"
    };
  },
  watch: {
    cartsfromparent() {
      this.totalPrice = 0;
      this.cartsfromparent.forEach(element => {
        this.totalPrice += element.price;
      });
    }
  },
  methods: {
    formatMoney(price) {
      return `Rp. ${price.toLocaleString()},-`;
    },

    buy() {
      axios({
        method: "POST",
        url: this.base_url + "/carts",
        headers: {
          token: localStorage.getItem("token")
        },
        data: {
          listItem: this.cartsfromparent,
          totalPrice: this.totalPrice
        }
      })
        .then(result => {
          console.log(result);

          console.log("iniiiii", result.data.data._id);
          // swal("Thank you!", "hope you buy again!", "success");
          swal({
            title: "Are you sure want to buy these items?",
            buttons: true,
        })
            .then((willLogout) => {
                if (willLogout) {
                   location.reload()
                }
            });
          this.cartsfromparent = [];

          console.log(result.data.data.listItem);
          // axios({
          //   method: "GET",
          //   url: `${this.base_url}/items/buy`
          // })
          //   .then(result => {
          //     console.log("masuk");

          //     console.log(result.data.data);
          //   })
          //   .catch(err => {
          //     console.log(err);
          //   });

          // this.result.data.data.forEach(cart => {
          //   axios({
          //     method: "PUT",
          //     url: this.base_url + "/items/buy",
          //     headers: {
          //       token: localStorage.getItem("token")
          //     },
          //     data: {
          //       id: cart._id
          //     }
          //   })
          //     .then(result => {
          //       console.log(result);
          //     })
          //     .catch(err => {
          //       console.log(err);
          //     });
          // });
        })
        .catch(err => {
          console.log(err);
        });
    },

    cancel(index) {
      let idItem = this.cartsfromparent[index]._id;
      this.totalPrice -= this.cartsfromparent[index].price;
      this.$emit("sentiditem", idItem);
      this.cartsfromparent.splice(index, 1);
    }
  }
});
