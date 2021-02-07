var _token = jwtToken;


/*
추후 로그인 / 로그아웃 까지 붙일경우 처리할로직

//세션 스토리지에서 토큰 가져온다
var _token = sessionStorage.getItem("jwtToken");

//토큰이 없을경우 서버에서 가져온 토큰을 활용
if(_token == null) {
    _token = sessionStorage.setItem('jwtToken', jwtToken);
}
*/

//모바일 일 경우 getCookie 함수 정의보다 호출이 먼저 실행됨
function getCookie( name )
{
    var nameOfCookie = name + "=";
    var x = 0;
    while ( x <= document.cookie.length )
    {
        var y = (x+nameOfCookie.length);
        if ( document.cookie.substring( x, y ) == nameOfCookie ) {
            if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 )
                endOfCookie = document.cookie.length;
            return unescape( document.cookie.substring( y, endOfCookie ) );
        }
        x = document.cookie.indexOf( " ", x ) + 1;
        if ( x == 0 )
            break;
    }
    return "";
}

function useOwnJWT() {
   var is_cached = getCookie("is_cached"); // Y or N
   if(is_cached) {
       if(is_cached == "N") {
           sessionStorage.setItem('_JWT', jwtToken);
       } else {
           if(sessionStorage.getItem('_JWT')) {
               _token = sessionStorage.getItem('_JWT');
           }
       }
   }
}
function update_when_loggin() {

    var is_login = getCookie("is_login"); // Y or N
    if(is_login && is_login == "Y") {
        sessionStorage.setItem('_JWT', jwtToken);
    }
}
// useOwnJWT();
// update_when_loggin();

var kurlyApi = axios.create({
    baseURL: apiDomain
});

//모든 통신을 보낼때 토큰을 함께 보낸다.
kurlyApi.interceptors.request.use(function (config) {
    // Do something before request is sent
    // console.log(config);
    if( !config._retry) {
        //console.log(config._retry);
        config.headers.authorization = 'Bearer '+_token;
    }
    config.headers.accept =  "application/json";
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

//모든 응답에 권한없음이 올경우 갱신하도록 처리한다.
kurlyApi.interceptors.response.use(function (response){
    return response
}, function (error) {
    var originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // now it can be retried
        return kurlyApi.post('/v1/users/auth/token').then(function (response) {
            _token = response.data.data.token;
            sessionStorage.setItem('_JWT', _token);
            originalRequest.headers['authorization'] = 'Bearer ' + _token; // new header new token
            return kurlyApi(originalRequest); // retry the request that errored out
        }).
        catch(function(error) {
            // sessionStorage.setItem('jwtToken', null);
            alert('새로고침후 다시 시도해주세요.')
            return;
        })
    }
    // Do something with response error
    return Promise.reject(error)

});

// 2018-10-30 장차석 : PD-822 PC) 장바구니 담기 기능 > 레이어 팝업 아이템 갯수 오류
function cart_count_down(){
    kurlyApi({
        method:'get',
        url:'/v2/carts/count'
    }).then(function(response){
        if(response.data.data.count > 0){
            if(response.data.data.count > 99){
                $('#cart_item_count').addClass('max');
                $('#cart_item_count').show().html('99+');
            }else if(response.data.data.count > 9 && response.data.data.count < 100){
                $('#cart_item_count').addClass('ten')
                $('#cart_item_count').show().html(response.data.data.count);
            }else{
                $('#cart_item_count').show().html(response.data.data.count);
            }
        }else{
            $('#cart_item_count').hide();
        }
    });
}
// end

$(document).ready(function(){
    if(checkIsApp === true){
        
        // 2018-10-30 장차석 : PD-822 PC) 장바구니 담기 기능 > 레이어 팝업 아이템 갯수 오류
        cart_count_down();
        // end
        
    }
    
    // vuejs - 뒤로가기이동시 hash없이 작동되게 처리
    if(location.pathname.indexOf('/m2/goods/list.php') != -1 || location.pathname.indexOf('/shop/goods/goods_list.php') != -1 || location.pathname.indexOf('/shop/goods/goods_search.php') != -1){
        if(!sessionStorage.goodsListReferrer){ // 해당값이 true 또는  goodsView 가 아닐때 false처리
            sessionStorage.goodsListReferrer = false;
        }
    }else if(location.pathname.indexOf('/m2/goods/view.php') != -1 || location.pathname.indexOf('/shop/goods/goods_view.php') != -1){
        sessionStorage.goodsListReferrer = 'goodsView';    
    }else{
        sessionStorage.goodsListReferrer = false;
    }
});

