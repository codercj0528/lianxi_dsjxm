$(function(){
    getUserInfo();
});
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        succsess: function(res) {
            console.log(res);
        }
    })
}