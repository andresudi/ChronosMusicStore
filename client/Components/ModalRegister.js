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
                        <div class="card card-signin my-5">
                            <div v-if="notifHide" class="alert alert-warning" role="alert" style="text-align: center;">
                                {{ this.notif }}
                            </div>
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
                                            <button class="btn btn-lg btn-primary btn-block text-uppercase" @click="register" type="button">Sign Up</button>
                                    </div>
                                </form>
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
            baseUrl: 'https://chronos.andresudi.club',
            notif: '',
            notifHide: false,
        }
    },
    methods: {
        register() {
            let data = {
                name : this.name,
                email : this.email,
                password : this.password
            }
            axios({
                method: 'POST',
                url: this.baseUrl + '/users/register',
                data
            })
            .then(function(response){
                this.notif = 'Successfully register new user!'
                swal(this.notif, '', 'success')
                this.notifHide = true             
            })
            .catch(function(err){
                this.notif = err.response.data.message
                this.notifHide = true
                swal(this.notif, '', 'error')
                console.log(this.notif);
                console.log(this.notifHide);
            })
        }
    }
})