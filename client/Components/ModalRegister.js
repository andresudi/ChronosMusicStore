Vue.component('modal-register', {
    template: `
        <div class="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            <div class="container">
                <div class="modal-body">
                    <div class="">
                        <div class="card card-signin my-5">
                            <div class="card-body">
                                <h5 class="card-title text-center">Register</h5>
                                <form class="form-signin">
                                    <div class="form-label-group">
                                        <input v-model="name" type="email" class="form-control" placeholder="Name" required>
                                        <hr>
                                     </div>
                                    <div class="form-label-group">
                                        <input v-model="email" type="email" class="form-control" placeholder="Email address" required>
                                        <hr>
                                    </div>
                                    <div class="form-label-group">
                                        <input v-model="password" type="password" class="form-control" placeholder="Password" required>
                                        <hr>
                                            <button class="btn btn-lg btn-primary btn-block text-uppercase" @click="login" type="button">Sign Up</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
    `,
    data() {
        return {
            name: '',
            password: '',
            email: '',
            baseUrl: 'http://localhost:3000'
        }
    },
    methods: {
        register() {
            axios({
                method: 'POST',
                url: this.baseUrl + '/users/register',
                data
            })
            .then(function(response){
                location.reload()
            })
            .catch(function(err){
                console.log(err.response.data.err.errors)
            })
        }
    }
})