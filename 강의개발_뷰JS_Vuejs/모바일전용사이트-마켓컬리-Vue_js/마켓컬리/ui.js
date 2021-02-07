$(document).ready(function () {
    fe_love_ireland(); //컬리러브스 아일랜드
    fe_tooltip(); //마이페이지 저번달 실결제금액 툴팁
    fe_goodsDetail(); //상품상세 프로덕트이미지 탭 생성
    fe_scrollEvnent(); //스크롤시 띠배너, 상단GNB, 랩퍼 애니메이션

    var appWebCheck=null;var deviceCheck=null; // 전역변수 hybrid.js에서 값을 전달함.

    //리스트페이지 셀렉트박스
    $("#goods_sort").change(function () {
        var sort_text = $("#goods_sort option:selected").text();
        $(".goods_sort_box label .sp_goods_sort").text(sort_text);
    });

    // TODO
    //장바구니필수품 리뷰막기
    if ($(".goods-view-content-wrapper").length) {
        if ($(".layout-page-header-title-value").text() == "KURLY PASS") {
            if ($(".goods-view-name").text() == "샛별박스(+컬리패스)") {
                $(".goods-view-tab-group").addClass("col4_type");
            } else {
                $(".goods-view-tab-group").addClass("col3_type");
            }
            $(".goods-view-tab-group .goods-view-tab-item").find("a:contains('고객후기')").parents(".goods-view-tab-item").remove();
        }
    }


    //컬리러브스 스페인
    if (String(location.href.indexOf("id=love&no=16")) > -1) {
        jQuery(".week_tab li").click(function () {
            var idx = $(this).index();
            jQuery(this).addClass("on").siblings().removeClass("on");
            jQuery("#spain_story p").siblings().hide().eq(idx).show();
            return false;
        });
    }

    $(".layer_pop_close").click(function () {
        $(".layer_pop_event").hide();
        return false;
    })

    // TODO
    if ($(".layout-page-header-title-value").text() == 'REVIEW') {
        $(".member-qna-tables .qna_wrap .imgs").show();
        $(".member-qna-tables .qna_wrap .wraps").css({"width": 60 + "%"});
    }

    // input type=text 마우스 커서 효과
    $('.user_form input[type=text], .user_form input[type=number], .user_form textarea').focus(function(){
        $(this).addClass('focus_style');
        if($(this).attr('name') == 'phoneOrder[]'){
            $(this).parent('.inp').addClass('focus_style');
        }
    });
    $('.user_form input[type=text], .user_form input[type=number], .user_form textarea').blur(function(){
        $(this).removeClass('focus_style');
        if($(this).attr('name') == 'phoneOrder[]'){
            $(this).parent('.inp').removeClass('focus_style');
        }
    });
});


//최상단에 위치할 때만 띠배너 노출
function fe_scrollEvnent() {
    var prevScrollTop = $(window).scrollTop(),
        nowScrollTop = $(window).scrollTop(),
        nowDir = 'stop',
        prevDir = 'stop',
        bannerOffset;

    if ($(".main-app-banner").length) {
        bannerOffset = $(".main-app-banner").height();
        $(window).on("scroll touchmove", function (e) {
            actionScroll(e);
        });
    }

    function actionScroll(e) {
        nowScrollTop = $(window).scrollTop();
        if (nowScrollTop > prevScrollTop) { // 위 방향으로 스크롤
            nowDir = 'down';
            if ($(window).scrollTop() >= 30) {
                $(".layout-header").addClass("active");
            }
        } else if (nowScrollTop < prevScrollTop) { // 아래 방향으로 스크롤
            nowDir = 'up';
            if ($(window).scrollTop() >= 0 && $(window).scrollTop() <= 45) {
                $(".layout-header").removeClass("active");
            }
        } else {
            nowDir = 'stop';
        }
        prevDir = nowDir;
        prevScrollTop = nowScrollTop;
    }
}

// 컬리러브스 아일랜드 Ireland. (컬리러브스 리스트에서 아일랜드 클릭 시, 이벤트 페이지로 이동)
function fe_love_ireland() {
    $(".kurly-partner-item").each(function () {
        if ($(this).attr("onClick") == "viewContent('view.php?id=love&no=13','','43','')") {
            $(this).attr("onClick", "viewContent('http://market.kurly.com/m2/html.php?htmid=proc/loves_ireland.htm&tplSkin=designgj','','43','')");
        }
    });
}

//mypage tooltip
function fe_tooltip() {
    $(".btn_tooltip").click(function () {
        $(this).next(".tooltip_area").show();
    });
    $(".tooltip_area").click(function () {
        $(this).hide();
    })
}


// display product image
function fe_goodsDetail() {
    var target_idx;
    var img_length = $("#goods-infomation").find("img").length;
    if ($("#goods-infomation").find(".product_image").length) {  //상품이미지 탭 추가
        $("#goods-infomation").find(".product_image").parents(".row").clone().prependTo("#goods-image .goods_detail");
    } else if ($("#goods-infomation").find("#img_product").length) {
        for (i = img_length; i >= 0; i--) {
            if ($("#goods-infomation").find("img").eq(i).attr("id") == "img_product") {
                target_idx = i;
            } else if (target_idx > i) {
                return false;
            }
            $("#goods-infomation").find("img").eq(i).clone().prependTo("#goods-image .goods_detail");
        }
    } else {
        if ($("#goods_pi").length == 0) { //템플릿 상품이미지탭 보이기 여부
            if (!$(".goods-view-tab-group").hasClass("col3_type")) {
                $(".goods-view-tab-group").addClass("col4_type");
            }
            // TODO 어느 부분인지 파악 필요
            $(".goods-view-tab-group .goods-view-tab-item").each(function () {
                $(this).find("a:contains('상품이미지')").parents(".goods-view-tab-item").remove();
            });
        }
    }
}

