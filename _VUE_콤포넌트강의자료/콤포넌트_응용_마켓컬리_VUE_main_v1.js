var type1 = Vue.component('main1-component', {
    props:['section', 'type'],
    template:'\
    <div class="main_type1">\
        <div class="list_goods">\
            <ul class="list">\
                <li v-for="banners in section.banners">\
                    <a v-if="type === \'pc\'" class="thumb_goods" :href="banners.landing_url" :style="{ \'background-image\': \'url(\' + banners.image_url + \')\'}">메인배너</a>\
                    <a v-if="type === \'mobile\'" class="thumb_goods" :href="banners.landing_url" :style="{ \'background-image\': \'url(\' + banners.image_url + \')\'}">\
                        <img alt="메인배너" src="https://res.kurly.com/mobile/service/main/1903/bg_375x340.png">\
                    </a>\
                </li>\
            </ul>\
            <div v-if="type === \'mobile\'" class="paging" :class="{two : section.banners.length > 9 }"><span class="bg"></span><span class="count"></span></div>\
        </div>\
    </div>\
    '
});

var type2 = Vue.component('main2-component', {
    props:['section', 'type'],
    template:'\
    <div class="main_type2" :class="{bg : section.fill_background}" :style="{ \'background-color\': backgroundAdd(section.fill_background) }">\
        <div :class="classAdd(section.section_type)">\
            <div class="tit_goods" :class="{ top_short : section.short_top_padding }">\
                <h3 class="tit">\
                    <a v-if="section.landing_url" :href="section.landing_url" class="name">\
                        <span class="ico">{{ section.title }}</span>\
                        <span class="tit_desc" v-if="section.subtitle">{{ section.subtitle }}</span>\
                    </a>\
                    <span v-if="!section.landing_url" class="name">\
                        {{ section.title }}\
                        <span class="tit_desc" v-if="section.subtitle">{{ section.subtitle }}</span>\
                    </span>\
                </h3>\
            </div>\
            <div class="category_menu" v-if="section.section_type === \'category_list\'">\
                <div class="bg_category">\
                    <span class="bg_shadow shadow_before"></span>\
                    <span class="bg_shadow shadow_after"></span>\
                </div>\
                <div class="category">\
                    <ul class="list_category">\
                        <li v-for="(category, idx) in section.categories">\
                            <a class="menu" :data-no="category.no" :class="{ on : category.no === section.moreLink, cut : idx === 7}" href="#none"> {{ category.name }} </a>\
                        </li>\
                        <li class="bg" v-if="type === \'mobile\'"></li>\
                    </ul>\
                </div>\
            </div>\
            <div class="list_goods">\
                <ul class="list">\
                    <li v-for="(item, idx) in section.products" :class="{ cut : (idx + 1) % 3 === 0}">\
                        <a class="thumb_goods" :href="returnUrl(\'view\', item.no)" :style="{ \'background-image\': \'url(\' + item.thumbnail_image_url + \')\'}">\
                            <img class="ico" v-if="item.sticker_image_url" :src="item.sticker_image_url" alt="SALE" onerror="this.src=\'https://res.kurly.com/mobile/service/main/1903/bg_45x39.png\'">\
                            <img class="thumb" src="https://res.kurly.com/mobile/service/main/1903/bg_150x195.png" alt="상품이미지">\
                        </a>\
                        <div class="info_goods">\
                            <span class="name">\
                                <a class="txt" :href="returnUrl(\'view\', item.no)">{{ item.name }}</a>\
                            </span>\
                            <span class="price" v-if="item.price">{{ item.price | commaFilter }}원</span>\
                            <span class="cost" v-if="item.original_price && item.price != item.original_price">{{ item.original_price | commaFilter }}원</span>\
                        </div>\
                    </li>\
                    <li class="more" v-if="type === \'mobile\' && section.landing_url">\
                        <a @click="activeLink(section.landing_url)">\
                            <img src="https://res.kurly.com/mobile/service/main/1903/bg_107x195.png" alt="">\
                            <span class="txt">\
                                <img v-if="!checked" class="thumb" src="https://res.kurly.com/mobile/service/main/1903/ico_next2_v3.png" alt="전체보기 아이콘">\
                                <img v-if="checked" class="thumb" src="https://res.kurly.com/mobile/service/main/1903/ico_next2_active.png" alt="전체보기 아이콘">\
                                전체보기\
                            </span>\
                        </a>\
                    </li>\
                </ul>\
            </div>\
            <div class="link_more" v-if="section.section_type === \'category_list\'">\
                <a class="link" :href="returnUrl(\'list\', section.moreLink)">\
                    <span class="ico">{{ section.moreName }} 전체보기</span>\
                </a>\
            </div>\
        </div>\
    </div>\
    '
    ,data:function(){
        return {
            checked : false
        }
    }
    ,methods:{
        classAdd:function(type){
            var className = type
            if(type === 'category_list'){
                className = 'category_type'    
            }
            return className;
        },
        backgroundAdd:function(type){
            var bgColor = null; 
            if(type === undefined || type === false){
                bgColor = "none";
            }else if(type === true){
                bgColor = '#f7f7f7';    
            }else{
                bgColor = type;
            }
            return bgColor;
        },
        returnUrl:function(type, no){
            var url = '#none';
            if(type === 'view'){
                if( this.type === 'mobile'){
                    url = '/m2/goods/view.php?&goodsno=' + no;
                }else{
                    url = '/shop/goods/goods_view.php?&goodsno=' + no;
                }
            }else if(type === 'list'){
                if( this.type === 'mobile'){
                    url = '/m2/goods/list.php?category=' + no;
                }else{
                    url = '/shop/goods/goods_list.php?category=' + no;
                }    
            }
            return url;
        }
        ,activeLink : function(url){
            this.checked = true;
            setTimeout(function(){
                location.href = url;
            },300);
        }
    }
});

var type3 = Vue.component('main3-component', {
    props:['section', 'type'],
    template:'\
    <div class="main_type3" :style="{ \'background-color\': backgroundAdd(section.fill_background) }" :class="{bg : (section.section_type == \'event_list\' || section.fill_background) }">\
        <div :class="{main_event : section.section_type == \'event_list\', main_recipe : section.section_type == \'recipe_list\'}">\
            <div class="tit_goods" :class="{ top_short : section.short_top_padding }">\
                <h3 class="tit">\
                    <a v-if="section.landing_url" :href="section.landing_url" class="name">\
                        <span class="ico">{{ section.title }}</span>\
                        <span class="tit_desc" v-if="section.subtitle">{{ section.subtitle }}</span>\
                    </a>\
                    <span v-if="!section.landing_url" class="name">\
                        {{ section.title }}\
                        <span class="tit_desc" v-if="section.subtitle">{{ section.subtitle }}</span>\
                    </span>\
                </h3>\
            </div>\
            <div class="list_goods">\
                <ul class="list">\
                    <li v-for="item in section.events" v-if="section.events">\
                        <a class="thumb_goods" :href="item.landing_url" :style="{ \'background-image\': \'url(\' + item.image_url + \')\'}">\
                            <img class="thumb" src="https://res.kurly.com/mobile/service/main/1903/bg_94x94.png" alt="상품이미지">\
                        </a>\
                        <div class="info_goods">\
                            <img v-if="type === \'mobile\'" src="https://res.kurly.com/mobile/service/main/1903/bg_251x94.png" alt="" >\
                            <div class="inner_info">\
                                <span class="name">\
                                    <a class="txt" :href="item.landing_url">{{ item.title }}</a>\
                                </span>\
                                <span class="desc">\
                                    <a class="txt" :href="item.landing_url">{{ item.subtitle }}</a>\
                                </span>\
                            </div>\
                        </div>\
                    </li>\
                    <li v-for="item in section.recipes" v-if="section.recipes">\
                        <a class="thumb_goods" :href="item.landing_url" :style="{ \'background-image\': \'url(\' + item.image_url + \')\'}">\
                            <img class="thumb" src="https://res.kurly.com/mobile/service/main/1903/bg_240x160.png?v2" alt="상품이미지">\
                        </a>\
                        <div class="info_goods">\
                            <div class="inner_info">\
                                <span class="name">\
                                    <a class="txt" :href="item.landing_url" v-html="item.title"></a>\
                                </span>\
                            </div>\
                        </div>\
                    </li>\
                    <li class="more" v-if="type === \'mobile\' && section.recipes">\
                        <a @click="activeLink(section.landing_url)">\
                            <img src="https://res.kurly.com/mobile/service/main/1903/bg_107x195.png">\
                            <span class="txt">\
                                <img v-if="!checked" class="thumb" src="https://res.kurly.com/mobile/service/main/1903/ico_next2_v3.png" alt="전체보러가기 아이콘">\
                                <img v-if="checked" class="thumb" src="https://res.kurly.com/mobile/service/main/1903/ico_next2_active.png" alt="전체보러가기 아이콘">\
                                전체보기\
                            </span>\
                        </a>\
                    </li>\
                </ul>\
            </div>\
        </div>\
    </div>\
    '
    ,data:function(){
        return {
            checked : false
        }
    }
    ,methods:{
        backgroundAdd:function(type){
            var bgColor = null;
            if(type === undefined || type === false){
                bgColor = null;
            }else if(type === true){
                bgColor = '#f7f7f7';
            }else{
                bgColor = type;
            }
            return bgColor;
        }
        ,activeLink : function(url){
            this.checked = true;
            setTimeout(function(){
                location.href = url;    
            },300);
        }
    }
});

var bnr = Vue.component('bnr-component', {
    props:['section', 'type'],
    template:'\
    <div class="bnr_main">\
        <a class="link" :style="{ \'background-image\': \'url(\' + section.background.image_url + \')\' , \'background-color\': section.background.color}" :href="section.landing_url">\
            <span class="inner_link">\
                <strong v-if="section.text.title != null" class="tit" :style="{ \'color\' : section.text.color }">{{ section.text.title }}</strong>\
                <span v-if="section.text.title != null" class="txt" :style="{ \'color\' : section.text.color }">{{ section.text.subtitle }}</span>\
                <img v-if="type === \'pc\' && section.text.title == null && section.text.subtitle == null" :src="section.background.image_url">\
            </span>\
            <img v-if="type === \'mobile\'" src="https://res.kurly.com/mobile/service/main/1903/bg_bnr_375x76.png" alt="">\
        </a>\
    </div>\
    '
});

// PC전용 인스타그램
var type4 = Vue.component('main4-component', {
    props:['section', 'type'],
    template:'\
    <div class="main_type4">\
        <div class="tit_goods" :class="{ top_short : section.short_top_padding }">\
            <h3 class="tit">{{ section.title}}</h3>\
        </div>\
        <div class="list_goods">\
            <ul class="list">\
                <li v-for="item in section.reviews">\
                    <a class="thumb_goods" :href="item.landing_url" target="_blank">\
                        <img class="thumb" :src="item.thumbnail_image_url" alt="상품이미지" onerror="this.src=\'https://res.kurly.com/mobile/service/main/1903/bg_94x94.png\'">\
                    </a>\
                </li>\
            </ul>\
        </div>\
        <div class="bnr">\
            <span class="txt">{{ section.subtitle }}</span>\
            <a href="https://www.instagram.com/marketkurly_regram/" target="_blank">@marketkurly_regram</a>\
        </div>\
    </div>\
    '
});

var cp = Vue.component('component-printer', {
    props:['componentName', 'section', 'type']
    ,template:'\
        <div>\
            <component :is="componentName" :section="section" :type="type"></component>\
        </div>\
    '
});
var kurlyMain = new Vue({
    el: '#kurlyMain',
    data: {
        getData : [],
        mainData : [],
        mdData : [],
        mdDataCheckNum : null,
        errors : [],
        type : 'mobile'
    },
    components: {
         'main1-component': type1
        ,'main2-component': type2
        ,'main3-component': type3
        ,'bnr-component': bnr
        ,'component-printer': cp
    },
    methods: {
        update : function(){
            var $self =this;
            kurlyApi({
                method:'get',
                url:'/v2/home/recommendation'
            })
            .then(function(response) {
                if(response.status != 200) return;
                $self.mainData = response.data.data.section_list;
               
                // md추천분기처리 
                for(var i = 0; i < $self.mainData.length; i++){
                    if($self.mainData[i].section_type === 'category_list'){
                        $self.$set($self.mainData[i], 'products', false);
                        if(sessionStorage.mdCategoryNo !== undefined){
                            $self.$set($self.mainData[i], 'moreLink', sessionStorage.mdCategoryNo);
                            $self.$set($self.mainData[i], 'moreName', sessionStorage.mdCategoryName);
                        }else{
                            $self.$set($self.mainData[i], 'moreLink', $self.mainData[i].default_category_no);
                            $self.$set($self.mainData[i], 'moreName', false);
                        }
                        $self.mdDataCheckNum = i;
                        $self.productsChange($self.mainData[i].moreLink);
                    }
                }
                if(sessionStorage.mdCategoryNo === undefined){
                    for(var i = 0; i < $self.mainData[$self.mdDataCheckNum].categories.length; i++){
                        if($self.mainData[$self.mdDataCheckNum].categories[i].no === $self.mainData[$self.mdDataCheckNum].default_category_no){
                            $self.mainData[$self.mdDataCheckNum].moreName = $self.mainData[$self.mdDataCheckNum].categories[i].name;
                        }
                    }
                }
                sessionStorage.removeItem('mdCategoryNo');
                sessionStorage.removeItem('mdCategoryName');
                // // md추천분기처리

                $('#bgLoading').hide();
            }.bind(this)).catch(function(e){
                $('#bgLoading').hide();
                this.update();
                this.errors.push(e);
                alert(this.errors.code + this.errors.message);
            });
        }
        , typeToComponent : function(type){
            if( type == 'main_banner' ){
                return 'main1-component';
            }else if( type == 'product_list' || type == 'category_list' ){
                return 'main2-component';
            }else if( type == 'event_list' || type == 'recipe_list'){
                return 'main3-component';
            }else if( type == 'static_banner' ){
                return 'bnr-component';
            }else if( type == 'instagram' ){
                if(this.type === 'mobile') return false;
                return 'main4-component';
            }
        }
        , productsChange : function(no, name){
            var $self = this;
            kurlyApi({
                method : 'get',
                url : '/v2/home/recommendation/md_choice/categories/' + no
            })
            .then(function(response) {
                if(response.status != 200) return;
                $self.mainData[$self.mdDataCheckNum].products = response.data.data.products;
                $self.mainData[$self.mdDataCheckNum].moreLink = no;
                if(name !== undefined){
                    $self.mainData[$self.mdDataCheckNum].moreName = name;
                    sessionStorage.mdCategoryNo = no;
                    sessionStorage.mdCategoryName = name;
                }
            }.bind(this)).catch(function(e){
                this.update();
                this.errors.push(e);
                alert(this.errors.code + this.errors.message);
            });
        }
    },
    updated : function(){
        this.$nextTick(function(){
            var $parentSelf = this;
            
            // ### Mobile
            if($parentSelf.type === 'mobile'){
                // ###########################
                // swipe에 사용되는 class 추가
                function class_add(target){
                    target.find('.list_goods').addClass('swiper-container');
                    target.find('.list').addClass('swiper-wrapper');
                    target.find('li').addClass('swiper-slide')
                }

                function call_swiper(name, target, speed, auto, space, boolean){
                    class_add(name);
                    var pageCheck = false;
                    if(name.find('.count').length > 0){
                        pageCheck = {
                            el:'.count',
                            type:'fraction'
                        }
                    }
                    if(auto == undefined){ // 자동이동 : false
                        auto = false;
                    }else if(auto){
                        auto = {
                            delay:3000,
                            disableOnInteraction:false
                        }
                    }
                    if(space == undefined){ // 간격. style 기본간격 : 8
                        space = 8;
                    }
                    if(boolean == undefined){ // infiniteLoop 기본 false
                        boolean = false;
                    }
                    name = new Swiper(target, {
                        slidesPerView:'auto',
                        autoplay:auto,
                        speed:400, // 스왑속도
                        loop:boolean,
                        spaceBetween:space, // 아이템간격
                        pagination:pageCheck
                    });
                }

                // swipe적용 셀렉터, swipe 동작 class name, 속도, infiniteLoop여부
                call_swiper($('.main_type1'), '.main_type1 .swiper-container', 400, true, 0, true);
                $('.product_list').each(function(idx){
                    var checkNo = idx + 1;
                    $(this).addClass('swiper' + checkNo);
                    call_swiper($(this), '.swiper' + checkNo + ' .swiper-container', 400);
                });
                call_swiper($('.main_recipe'), '.main_recipe .swiper-container', 400);
            }
            
            // ### PC
            if($parentSelf.type === 'pc'){
                // slider 호출함수
                var bxArry = [];
                var bxArryCount = 0;
                function bx_slider(count, target, boolean, speed, effect){
                    var showCount = count;
                    var marginNum = 18;
                    var hideControlOnEndCheck = true;
                    var pauseCheck = 0;
                    var tWidth = target.find('li:eq(0)').width();
                    if(speed == undefined && boolean == undefined && effect == undefined){
                        speed = 500;
                        boolean = false;
                        effect = 'swing';
                    }
                    if(count === 6){ // 인스타그램
                        marginNum = 0;
                    }else if(count === 1){ // 메인배너
                        marginNum = 0;
                        tWidth = 0;
                        pauseCheck = 3000;
                        hideControlOnEndCheck = false;
                    }else if(count === 'destroy'){
                        bxArryCount = bxArry.length - 1;
                        bxArry[bxArryCount].destroySlider();
                        bxArryCount++;
                        return;
                    }

                    bxArry[bxArryCount] = target.bxSlider( {
                        mode: 'horizontal', // 가로 방향 수평 슬라이드
                        infiniteLoop : boolean,
                        speed: speed, // 이동 속도를 설정
                        pager: false, // 현재 위치 페이징 표시 여부 설정
                        slideWidth : tWidth, // 아이템1개의 사이즈
                        moveSlides: showCount, // 슬라이드 이동시 개수
                        minSlides: count, // 최소 노출 개수
                        maxSlides: count, // 최대 노출 개수
                        slideMargin: marginNum, // 슬라이드간의 간격
                        auto: boolean,
                        pause : pauseCheck, // 자동롤링시 한번이동후 멈춤시간
                        stopAutoOnClick : true,
                        autoHover: true, // 마우스 호버시 정지 여부
                        controls: true, // 이전 다음 버튼 노출 여부
                        autoControls  : boolean,
                        hideControlOnEnd : hideControlOnEndCheck, // 맨앞, 맨뒤 버튼 노출여부
                        easing : effect // 효과
                    });

                    bxArryCount++;

                    if(count === 6 || count === 1){
                        target.parents('.list_goods').hover(function(){
                            $(this).find('.bx-stop').trigger('click');
                        }, function(){
                            $(this).find('.bx-start').trigger('click');
                        });
                    }
                }

                // slider 호출(노출타입, 셀렉터,  infinite유무, 속도, 효과)
                // 메인
                if($('.main_type1 .list li').length > 1){
                    bx_slider(1, $('#kurlyMain .main_type1 .list'), true, 500, 'ease-in-out');
                }
                // 공통
                $('.main_type2 .product_list').each(function(idx){
                    var $target = $(this).find('.list');
                    if($target.find('li').length > 4){
                        bx_slider(4, $target);
                    } 
                });
                // 레시피
                if($('.main_recipe .list li').length > 3){
                    bx_slider(3, $('#kurlyMain .main_recipe .list'));
                }
                // 인스타그램
                if($('.main_type4 .list li').length > 6){
                    bx_slider(6, $('#kurlyMain .main_type4 .list'));
                }

                function categoryTypeCall(){
                    if($('#kurlyMain .category_type .list_goods .list li').length === 0){
                        setTimeout(function(){
                            categoryTypeCall();
                        },1000);
                    }else{
                        if($('#kurlyMain .category_type .list_goods .list li').length > 4){
                            bx_slider(4, $('#kurlyMain .category_type .list_goods .list'));
                        }
                    }
                }
                categoryTypeCall();
            }


            // ############################        
            // PC,mWeb 카테고리메뉴 변경액션
            var categoryEvent = {
                cateno:0,
                snbWidth:0,
                num:0,
                targetPos:0,
                $target:$('.category_menu'),
                $targetSlider:$('.category_menu .category'),
                $targetList:$('.category_menu .list_category'),
                $targetItem:$('.category_menu .category li'),
                $targetItemMenu:$('.category_menu .category a'),
                $targetBg:$('.category_menu .bg'),
                $shadowBefore:$('.bg_category .shadow_before'),
                $shadowAfter:$('.bg_category .shadow_after'),
                deviceType:$parentSelf.type,
                init:function(){
                    // 추후 공통화 될시에는 이곳에서 selector 지정
                },
                defaultSet:function(){
                    var $self = this;
                    $self.$targetItemMenu.each(function(){
                        $self.snbWidth += parseInt($(this).parent().width());
                        $(this).parent().attr('data-start', $self.snbWidth - $(this).width() - 8);
                        $(this).parent().attr('data-end', $self.snbWidth + 8);
                        if($(this).hasClass('on')){
                            $self.num = $(this).parent().index();
                            $self.cateno = $(this).data('no');
                        }
                    });
                    
                    if($self.deviceType === 'mobile'){
                        $self.$targetList.width($self.snbWidth + 16);
                        setTimeout(function(){
                            $self.checkedAction($self.num);
                        });
                        // 스크롤이벤트
                        $self.$targetSlider.on('scroll', function(){
                            $self.scrollEvent();
                        });    
                    }

                    // 클릭이벤트
                    $self.$targetItemMenu.on('click', function(e){
                        e.preventDefault();
                        if($(this).hasClass('on')){
                            return;
                        }
                        $self.checkedAction($(this).parent().index());
                        // 목록 호출 함수 => vue
                        $parentSelf.productsChange(parseInt($(this).data('no')), $(this).text());
                        // 상품상세 뒤로 가기처리
                        sessionStorage.mdCategoryNo = parseInt($(this).data('no'));
                        sessionStorage.mdCategoryName = $(this).text();
                    });
                    
                },
                checkedAction:function(no){
                    var $self = this;
                    var target = $('.list_category li').eq(no);
                    var bgWidth = target.find('a').width();
                    var bgLeft = target.position().left + 16;
                    target.siblings().find('a').removeClass('on');
                    target.find('a').addClass('on');

                    if($self.deviceType === 'mobile'){
                        $self.$targetBg.animate({
                            width:bgWidth,
                            left:bgLeft
                        }, 300, function(){
                            $self.scrollEvent();
                        });
                        if($self.$targetList.width() > $(window).width()){
                            $self.targetPos = target.position().left - $(window).width() / 2 + target.width() / 2 + 10;
                            if($self.targetPos <= 0){
                                $self.targetPos = 0;
                            }
                            $self.$targetSlider.animate({
                                scrollLeft:$self.targetPos
                            }, 300);
                        }    
                    }else{
                        bx_slider('destroy', $('#kurlyMain .category_type .list_goods .list'));
                        if($('#kurlyMain .category_type .list_goods .list li').length > 4){
                            bx_slider(4, $('#kurlyMain .category_type .list_goods .list'));
                        }
                    }
                },
                scrollEvent:function(){
                    var $self = this;
                    if($self.$targetSlider.scrollLeft() > 0){
                        $self.$shadowBefore.show();
                    }else{
                        $self.$shadowBefore.hide();
                    }
                    if($self.$targetSlider.scrollLeft() + $(window).width() >= $self.$targetList.width()){
                        $self.$shadowAfter.hide();
                    }else{
                        $self.$shadowAfter.show();
                    }
                }
            }
            categoryEvent.defaultSet();
            setTimeout(function(){
                $('#kurlyMain').css({opacity:1});    
            },300);
        });
    }
});


