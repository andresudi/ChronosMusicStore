var index = new Vue({
    el: '#app',
    data: {
        username: '',
        email: '',
        password: ''
    },

    methods: {
        register(){
            event.preventDefault()
            axios({
                method: 'post',
                url: 'http://localhost:3000/user/register',
                data: {
                    username: this.username,
                    email: this.email,
                    password: this.password
                }
            })
            .then((response) => {
                if (response.status == 201) {
                    swal({
                        title: "Success",
                        text: response.data.message,
                        icon: "success",
                        buttons: true,
                    })
                    .then(() => {
                        window.location.href="index.html"
                    });
                }else {
                    swal(response.data.message)
                }
            })
            .catch((err) => {
                console.log(err)
                swal(`field is required`)  
            })
        },

        login(){
            event.preventDefault()
            axios.post('http://localhost:3000/user/login', {
                email: this.email,
                password: this.password
            })
            .then((response) => {
                console.log(response)
                localStorage.setItem('token', response.data.token)
                swal({
                    title: response.data.message,
                    icon: "success",
                    button: "next",
                });
                window.location.href="http://localhost:8080/dashboard.html"
            })
            .catch((err) => {
                swal(err.message)
            })
        }
    }
})