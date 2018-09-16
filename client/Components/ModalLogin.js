Vue.component('modal-login', {
    template: `  
    <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                 </div>
            <div class="container">
                <div class="modal-body">
                        <div class="card card-signin my-5">
                        <div v-if="notifSuccess" class="alert alert-warning" role="alert" style="text-align: center;">
                            {{ this.notif }}
                        </div>
                            <div class="card-body">
                                <h5 class="card-title text-center">Login</h5>           
                                <form class="form-signin">
                                    <div class="form-label-group">
                                        <input v-model="email" type="email" class="form-control" placeholder="Email address" required>
                                        <hr>
                                    </div>
                                    <div class="form-label-group">
                                        <input v-model="password" type="password" class="form-control" placeholder="Password" required>
                                        <hr>
                                        <div class="custom-control custom-checkbox mb-3">
                                            <input type="checkbox" class="custom-control-input" id="customCheck1">
                                            <label class="custom-control-label" for="customCheck1">Remember password</label>
                                        </div>
                                            <button class="btn btn-lg btn-primary btn-block text-uppercase" @click="login" type="button">Sign in</button>
                                    </div>
                                </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>`,
    data() {
        return {
            email : '',
            password : '',
            isLogin: false,
            baseUrl: 'http://localhost:3000',
            notif: '',
            notifSuccess: false,
            notifFail: false
        }
    },
    methods: {
        login() {
            axios({
                method: 'POST',
                url: this.baseUrl + '/users/login',
                data: {
                    email : this.email,
                    password : this.password
                }   
            })
            .then((data) => {
                let token = data.data.token
                this.isLogin = true
                localStorage.setItem('token', token)
                this.notif = 'Login success'
                this.notifSuccess = true
                this.$emit('data-token', this.isLogin)
            })
            .catch((err) => {
                this.notif = err.response.data.message
                this.notifSuccess = true
                this.isLogin = false
            })
        },

    }

})