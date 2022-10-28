export default ({ router, store, Vue }) => {
    router.beforeEach((to, from, next)=>{
        const isLogin = localStorage.getItem('loginInfo')
        // console.log("isLogin: ", isLogin)

        if( isLogin ){
            var login_time = JSON.parse(isLogin).login_timestamp
            var time_now = Math.floor(new Date().getTime() / 1000)
        
            if(time_now - login_time >= 86400){
                alert("You have already login exceed 1 days, please login again.")
                localStorage.removeItem('loginInfo');
                next('/login')
            }
            if (to.path == '/login' || to.path == '/register' || to.path == '/email_validation' || to.path == '/'){
                next('/menu');
            }
            else{
                next();
            }
        } 
        else {
            localStorage.removeItem('loginInfo');
            if( to.path == '/register'){
                next();
            }
            else if( to.path == '/email_validation'){
                next();
            }
            else if( to.path !== '/login'){
                next('/login');
            }

            else{
                next();
            }
        }
    });
}