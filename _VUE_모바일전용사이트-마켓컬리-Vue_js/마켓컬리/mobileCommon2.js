function getGoodsListDataOther(){var category=$("[name=list_category]").val();var kw=$("[name=list_kw]").val();var item_cnt=0;var data_param;data_param="mode=get_goods";if(kw){data_param+="&kw="+kw;}
else{data_param+="&category="+category;}
    item_cnt=$(".goods-other-item").length;data_param+="&item_cnt="+item_cnt;try{$.ajax({type:"post",url:"/"+mobile_root+"/proc/mAjaxAction.php",cache:false,async:false,data:data_param,success:function(res){if(res!=null){makeGoodsListOther(res.goods_data,kw,category);}},dataType:"json"});}
    catch(e){throw(e);}}
var objSwipe=null;function makeGoodsListOther(goods_data,kw,category){var goods_src="";if(kw){goods_src='../goods/view.php?kw='+kw;}
else{goods_src='../goods/view.php?category='+category;}
    if(goods_data.length>0){var add_html="";for(var i=0;i<goods_data.length;i++){if((i+1)%5==1){add_html+='<div class="goods-other-content" >';add_html+='<div class="goods-other-item right-margin left-margin">';}
    else if((i+1)%5==0){add_html+='<div class="goods-other-item">';}
    else{add_html+='<div class="goods-other-item right-margin">';}
        add_html+='<a href="'+goods_src+'&goodsno='+goods_data[i].goodsno+'">'+goods_data[i].img_html+'</a>';add_html+='</div>';if((i+1)%5==0||(i+1)==goods_data.length){add_html+='</div>';}}}
    $("#swipe-other-goods>div").append(add_html);var startSlide_idx=0;if(objSwipe!=null){startSlide_idx=objSwipe.getPos();}
    objSwipe=new Swipe(document.getElementById('swipe-other-goods'),{startSlide:startSlide_idx,speed:200,auto:0,callback:function(event,index,elem){if(($(".goods-other-item").length-10)<(index*5)){getGoodsListDataOther();}}});}
function getReviewData(newType) {
    var data_param = "mode=get_review";
    if(newType === 'true'){
        var item_cnt = $("#review-table .board_subject").length;
    }else{
        var item_cnt = $("#review-table > div.title").length;
    }
    var goodsno = "";
    if ($("[name=goodsno]").length > 0) {
        goodsno = $("[name=goodsno]").val();
    }
    data_param += "&item_cnt=" + item_cnt + "&goodsno=" + goodsno;
    try {
        $.ajax({
            type: "post",
            url: "/" + mobile_root + "/proc/mAjaxAction.php",
            cache: false,
            async: false,
            data: data_param,
            success: function(res) {
                if (res != null) {
                    makeReviewList(res, goodsno);
                } else {
                    $(".more_btn").hide();
                }
            },
            dataType: "json"
        });
    } catch (e) {
        alert(e);
    }
}
function getReviewBestData(){var data_param="mode=get_review_best";var item_cnt=$("#review-table .title").length;data_param+="&item_cnt="+item_cnt+"&all=true";try{$.ajax({type:"post",url:"/"+mobile_root+"/proc/mAjaxAction.php",cache:false,async:false,data:data_param,success:function(res){if(res!=null){makeGoodsReviewList(res);}
    else{$(".more-btn").hide();}},dataType:"json"});}
catch(e){alert(e);}}
function makeReviewList(review_data, goodsno) {
    if (review_data.length > 0) {
        var add_html = "";
        for (var i = 0; i < review_data.length; i++) {
            add_html += '<div>';
            add_html += '<div class="board_subject" onclick="view_content(this, ' + review_data[i].sno + ');">';
            add_html += '<div class="inner_subject">';
            add_html += '<div class="tit">'+ review_data[i].subject + '</div>';
            add_html += '<div class="info grade_comm">';
            if(review_data[i].name == "관리자" || review_data[i].user_grade_name == "관리자" || review_data[i].user_grade_name == "CMS관리자(최종)" || review_data[i].user_grade == 6 || review_data[i].user_grade == 0){
                if(review_data[i].user_grade_name == "직원" || review_data[i].user_grade_name == "30% 직원"){
                    add_html += '<span class="ico_grade grade2">라벤더</span>';
                }
            }else{
                add_html += '<span class="ico_grade grade'+review_data[i].user_grade+'">'+review_data[i].user_grade_name+'</span>';
            }
            add_html += '<span class="name">' + review_data[i].name + '</span>';
            add_html += '<span class="time">' + review_data[i].regdt.substr(0, 10) + '</span>';
            add_html += '</div>';
            add_html += '</div>';
            add_html += '</div>';
            add_html += '<div class="board_cont" id="content-' + review_data[i].sno + '">';
            add_html += '<div class="view_board">'+review_data[i].contents;
            if (review_data[i].image != 'undefined') add_html += '<div class="thumb_user"></div>';
            add_html += '</div>';
            add_html += '<div class="group_btn">';
            add_html += '<div class="inner_group">';
            if (review_data[i].authdelete !== 'Y'){
                add_html += '<button class="btn" type="button" data-sno=' + review_data[i].sno + ' onClick="review_like(' + review_data[i].sno + ',$(this));" style="width:auto;padding:0 10px;">도움이 돼요 <span class="num">' + review_data[i].like_cnt + '</span></button>';
            }
            add_html += '<a class="btn" href="/m2/goods/view.php?goodsno=' + review_data[i].goodsno + '">상품 이동</a>';
            if (review_data[i].authdelete === 'Y') {
                add_html += '<button class="btn" type="button" onclick="delete_qnaReview( \'del_review\', \'' + review_data[i].m_no + '\', ' + review_data[i].sno + ');">삭제</button>';
                add_html += '<a class="btn" href="review_register.php?mode=mod_review&amp;sno=' + review_data[i].sno + '">수정</a>';
            }
            add_html += '</div>';
            add_html += '</div>';
            for (var j = 0; j < review_data[i].reply.length; j++) {
                add_html += '<div class="reply">';
                if (review_data[i].reply[j].subject) add_html += '<div class="tit_reply">'+review_data[i].reply[j].subject + '</div>';
                add_html += '<div class="desc_reply">'+review_data[i].reply[j].contents+'</div>';
                if (review_data[i].reply[j].authdelete === 'Y') add_html += '<div class="group_btn"><div class="inner_group"><button type="button" class="btn" onclick="delete_qnaReview( \'del_review\', \'' + review_data[i].reply[j].m_no + '\', ' + review_data[i].reply[j].sno + ');">삭제</button></div></div>';
                add_html += '</div>';
            }
            add_html += '</div>';
            add_html += '</div>';
        }
    }
    $("#review-table").append(add_html);
    if (review_data.length < 10) {
        $(".btn_more").hide()
    }
}
function getQnaData(){var data_param="mode=get_qna";var item_cnt=$("#review-table .title").length;var goodsno="";if($("[name=goodsno]").length>0){goodsno=$("[name=goodsno]").val();}
    data_param+="&item_cnt="+item_cnt+"&goodsno="+goodsno;try{$.ajax({type:"post",url:"/"+mobile_root+"/proc/mAjaxAction.php",cache:false,async:false,data:data_param,success:function(res){if(res!=null){makeQnaList(res,goodsno);}
        else{$(".more-btn").hide();}},dataType:"json"});}
    catch(e){alert(e);}}
function makeQnaList(review_data,goodsno){if(review_data.length>0){var add_html="";for(var i=0;i<review_data.length;i++){add_html+='<tr class="title" onclick="view_content(this, '+review_data[i].sno+');">';add_html+=' <td class="first">'+review_data[i].idx+'</td>';add_html+=' <td class="img">'+review_data[i].img_html+'</td>';add_html+=' <td class="left last">';add_html+='  <div class="answer-yn">';if(review_data[i].reply_cnt>0){add_html+='<div class="answer-y"></div>';}
else{add_html+='<div class="answer-n"></div>';}
    add_html+='</div>';if(goodsno){add_html+=' <div>'+review_data[i].review_name+' | '+review_data[i].regdt+'</div>';}
    add_html+='  <div>'+review_data[i].subject+'</div>';add_html+='  </td>';add_html+='</tr>';add_html+='<tr class="content-board" id="content-'+review_data[i].sno+'">';add_html+=' <td colspan=3 class="">';if(review_data[i].accessable){add_html+=' <div class="content-review">';add_html+='  <div class="question-icon"></div>'+review_data[i].contents;add_html+=' </div>';for(var j=0;j<review_data[i].reply.length;j++){add_html+='   <div class="content-reply">';add_html+='    <div class="answer-icon"></div>';if(review_data[i].reply[j].subject){add_html+=review_data[i].reply[j].subject+'<br />';}
        add_html+=review_data[i].reply[j].contents;add_html+='   </div>';}}
    else{add_html+=' <div class="content-review">';if(review_data[i].m_no>0){add_html+='  비밀글 입니다.';}
    else{add_html+='  비밀번호 : <input type="password" id="goods-qna-password-'+review_data[i].sno+'" name="password" required="required"/><button type="button" data-sno="'+review_data[i].sno+'"  class="goods-qna-certification">확인</button>';}
        add_html+='</div>';}
    add_html+='  </td>';add_html+=' </tr>';}}
    $("#review-table").append(add_html);if(review_data.length<10){$(".more-btn").hide();}}
function getOrderListData(){var data_param="mode=get_order_list_data";var item_cnt=$("#norderlist-area table").length;data_param+="&item_cnt="+item_cnt;try{$.ajax({type:"post",url:"/"+mobile_root+"/proc/mAjaxAction.php",cache:false,async:false,data:data_param,success:function(res){if(res!=null){makeOrderList(res);}
    else{$(".more-btn").hide();}},dataType:"json"});}
catch(e){alert(e);}}
function makeOrderList(order_data){if(order_data.length>0){var add_html="";for(var i=0;i<order_data.length;i++){add_html+='<div class="sub_title">주문번호 : '+order_data[i].ordno+'<button class="ord_more_btn" onclick="javascript:location.href=\'./orderview.php?ordno='+order_data[i].ordno+'\';">상세보기</button></div>';add_html+='<table class="order-item">';add_html+='<tr>';add_html+=' <th>상품명</th>';add_html+=' <td class="goods-nm">'+order_data[i].goodsnm+'</td>';add_html+='</tr>';add_html+='<tr>';add_html+=' <th>주문일시</th>';add_html+=' <td>'+order_data[i].orddt+'</td>';add_html+='</tr>';add_html+='<tr>';add_html+=' <th>결제방법</th>';add_html+=' <td>'+order_data[i].str_settlekind+'</td>';add_html+='</tr>';add_html+='<tr>';add_html+=' <th>주문금액</th>';add_html+=' <td class="goods-price">'+order_data[i].str_settleprice+'원</td>';add_html+='</tr>';add_html+='<tr>';add_html+=' <th>주문상태</th>';add_html+=' <td>'+order_data[i].str_step+'</td>';add_html+='</tr>';add_html+='</table>';}}
    $("#norderlist-area").append(add_html);if(order_data.length<10){$(".more-btn").hide();}}
function getLogEmoney(){var data_param="mode=get_log_emoney";var item_cnt=$("#emoney-table .emoney-item").length;data_param+="&item_cnt="+item_cnt;try{$.ajax({type:"post",url:"/"+mobile_root+"/proc/mAjaxAction.php",cache:false,async:false,data:data_param,success:function(res){if(res!=null){makeLogEmoneyList(res);}
    else{$(".more-btn").hide();}},dataType:"json"});}
catch(e){alert(e);}}
function makeLogEmoneyList(log_emoney_data){if(log_emoney_data.length>0){var add_html="";var item_cnt=$("#emoney-table .emoney-item").length;for(var i=0;i<log_emoney_data.length;i++){add_html+='<tbody class="emoney-item">';add_html+='<tr>';add_html+='<td class="idx" rowspan="3">'+(++item_cnt)+'</td>';add_html+='<td class="title">내역</td>';add_html+='<td class="memo">'+log_emoney_data[i].memo+'</td>';add_html+='</tr>';add_html+='<tr>';add_html+='<td class="title">적립금액</td>';if(log_emoney_data[i].emoney>0){add_html+=' <td class="memo">'+log_emoney_data[i].emoney+'원</td>';}
else{add_html+=' <td class="memo">-</td>';}
    add_html+='</tr>';add_html+='<tr>';add_html+='<td class="title">사용금액</td>';if(log_emoney_data[i].emoney<0){add_html+=' <td class="memo">-'+log_emoney_data[i].emoney+'원</td>';}
    else{add_html+=' <td class="memo">-</td>';}
    add_html+='</tr>';add_html+='</tbody>';}}
    $("#emoney-table").append(add_html);if(log_emoney_data.length<10){$(".more-btn").hide();}}
function getMemberQnaData(){var data_param="mode=get_member_qna";var item_cnt=$("#member-qna-table .title").length;data_param+="&item_cnt="+item_cnt;try{$.ajax({type:"post",url:"/"+mobile_root+"/proc/mAjaxAction.php",cache:false,async:false,data:data_param,success:function(res){if(res!=null){makeMemberQnaList(res);}
    else{$(".more-btn").hide();}},dataType:"json"});}
catch(e){alert(e);}}
function makeMemberQnaList(member_qna_data){if(member_qna_data.length>0){var add_html="";for(var i=0;i<member_qna_data.length;i++){add_html+='<div class="qna_wrap after" onclick="view_content(this, '+member_qna_data[i].sno+');">';if(member_qna_data[i].img_l!=null){add_html+='<div class="imgs"><img src="../data/goods/'+member_qna_data[i].img_l+'"></div>';}
    add_html+='<div class="wraps"><div class="info_wrap"><span class="itemcd">'+member_qna_data[i].name+' | '+member_qna_data[i].regdt+'</span>';add_html+='<div class="answer-yn">';if(member_qna_data[i].reply_cnt>0){add_html+='<div class="answer-y">답변완료</div>';}
    else{add_html+='<div class="answer-n">답변준비중</div>';}
    add_html+='</div>';add_html+='<div class="title"><font class="itemcd">['+member_qna_data[i].itemcd+'] </font>';add_html+='<font class="subject">'+member_qna_data[i].subject+'</font></div>';add_html+='</div>';add_html+='</div>';add_html+='</div>';add_html+='<div class="content-board" id="content-'+member_qna_data[i].sno+'">';add_html+='<div class="review_wrap after">';add_html+='<div class="content-review after">'
    add_html+='<div class="question-icon">Q</div>';add_html+='<span class="contents">'+member_qna_data[i].contents+'<span>';add_html+='<div class="images">'+member_qna_data[i].image+'</div></div>'
    for(var j=0;j<member_qna_data[i].reply.length;j++)
    {add_html+='<div class="content-review after">'
        add_html+='<div class="answer-icon answers">A</div>';if(member_qna_data[i].reply[j].subject){add_html+='<span class="contents">'+member_qna_data[i].reply[j].subject+'<span></div>';}
        add_html+='<span class="contents">'+member_qna_data[i].reply[j].contents+'<span></div>';add_html+='</div>';}
    add_html+='<div class="btn_wrap">';add_html+='<a style="margin-right:5px;" href="javascript:onClick=confirmFunc('+member_qna_data[i].idx+')"><span class="__btns">삭제</span></a>';add_html+='<a href="qna_register.php?mode=mod_qna&amp;sno='+member_qna_data[i].idx+'"><span class="__btns active_">수정</span></a>';add_html+='</div>';add_html+='</div>';add_html+='</div>';}}
    $("#member-qna-table").append(add_html);if(member_qna_data.length<10){$(".more-btn").hide();}}
function getGoodsReviewData(encMno, newType) {
    var data_param = "mode=get_review";
    if(newType === "true"){
        var item_cnt = $("#review-table .board_subject").length;
    }else {
        var item_cnt = $("#review-table .title.qna_wrap").length;
    }
    data_param += "&item_cnt=" + item_cnt + "&all=true&encMno=" + encMno;
    try {
        $.ajax({
            type: "post",
            url: "/" + mobile_root + "/proc/mAjaxAction.php",
            cache: false,
            async: false,
            data: data_param,
            success: function(res) {
                if (res != null) {
                    makeGoodsReviewList(res);
                } else {
                    $(".more_btn").hide();
                }
            },
            dataType: "json"
        });
    } catch (e) {
        alert(e);
    }
}
function getGoodsReviewBestData(newType) {
    var data_param = "mode=get_review_best";
    if(newType === "true"){
        var item_cnt = $("#review-table .board_subject").length;
    }else {
        var item_cnt = $("#review-table .title.qna_wrap").length;
    }
    data_param += "&item_cnt=" + item_cnt + "&all=true";
    try {
        $.ajax({
            type: "post",
            url: "/" + mobile_root + "/proc/mAjaxAction.php",
            cache: false,
            async: false,
            data: data_param,
            success: function(res) {
                if (res != null) {
                    makeGoodsReviewList(res);
                } else {
                    $(".more_btn").hide();
                }
            },
            dataType: "json"
        });
    } catch (e) {
        alert(e);
    }
}
function makeGoodsReviewList(review_data) {
    if(review_data.length > 0) {
        var add_html = "";
        for (var i = 0; i < review_data.length; i++) {
            add_html += '<div>';
            add_html += '<div class="board_subject" onclick="view_content(this, ' + review_data[i].sno + ');">';
            add_html += '<div class="inner_subject">';
            add_html += '<div class="tit">'+ review_data[i].subject + '</div>';
            add_html += '<div class="info grade_comm">';
            if(review_data[i].name == "관리자" || review_data[i].user_grade_name == "관리자" || review_data[i].user_grade_name == "CMS관리자(최종)" || review_data[i].user_grade == 6 || review_data[i].user_grade == 0){
                if(review_data[i].user_grade_name == "직원" || review_data[i].user_grade_name == "30% 직원"){
                    add_html += '<span class="ico_grade grade2">라벤더</span>';
                }
            }else{
                add_html += '<span class="ico_grade grade'+review_data[i].user_grade+'">'+review_data[i].user_grade_name+'</span>';
            }
            if (review_data[i].personal_review_url) add_html += '<a href="' + review_data[i].personal_review_url + '">';
            add_html += '<span class="name">' + review_data[i].name + ' </span>';
            if (review_data[i].personal_review_url) add_html += '</a>';
            add_html += '<span class="time">' + review_data[i].regdt.substr(0, 10) + '</span>';
            add_html += '<span class="like">도움이 돼요 <span>' + review_data[i].like_cnt + '</span></span>';
            add_html += '</div>';
            add_html += '</div>';
            add_html += '</div>';
            add_html += '<div class="board_cont" id="content-' + review_data[i].sno + '">';
            add_html += '<div class="view_board">';
            add_html += '<div class="name">' + review_data[i].goodsnm + '</div>' + review_data[i].contents;
            if (review_data[i].image != 'undefined') add_html += '<div class="thumb_user"></div>';
            add_html += '</div>';
            add_html += '<div class="group_btn">';
            add_html += '<div class="inner_group">';
            if (review_data[i].authdelete !== 'Y'){
                add_html += '<button class="btn" type="button" data-sno=' + review_data[i].sno + ' onClick="review_like(' + review_data[i].sno + ',$(this),\'best\');" style="width:auto;padding:0 10px;">도움이 돼요 <span class="num">' + review_data[i].like_cnt + '</span></button>';
            }
            add_html += '<a class="btn" href="/m2/goods/view.php?goodsno=' + review_data[i].goodsno + '">상품 이동</a>';
            if (review_data[i].authdelete === 'Y') {
                add_html += '<button class="btn" type="button" onclick="delete_qnaReview( \'del_review\', \'' + review_data[i].m_no + '\', ' + review_data[i].sno + ');">삭제</button>';
                add_html += '<a class="btn" href="review_register.php?mode=mod_review&amp;sno=' + review_data[i].sno + '">수정</a>';
            }
            add_html += '</div>';
            add_html += '</div>';
            for (var j = 0; j < review_data[i].reply.length; j++) {
                add_html += '<div class="reply">';
                if (review_data[i].reply[j].subject) add_html += '<div class="tit_reply">'+review_data[i].reply[j].subject + '</div>';
                add_html += '<div class="desc_reply">'+review_data[i].reply[j].contents+'</div>';
                if (review_data[i].reply[j].authdelete === 'Y') add_html += '<div class="group_btn"><div class="inner_group"><button type="button" class="btn" onclick="delete_qnaReview( \'del_review\', \'' + review_data[i].reply[j].m_no + '\', ' + review_data[i].reply[j].sno + ');">삭제</button></div></div>';
                add_html += '</div>';
            }
            add_html += '</div>';
            add_html += '</div>';
        }
    }
    $("#review-table").append(add_html);
    $("#review-table .title .first.img").unbind("click").click(function(event) {
        var goodsno = this.getAttribute("data-goodsno");
        if (parseInt(goodsno) > 0) {
            location.href = "./view.php?goodsno=" + goodsno;
            event.stopPropagation()
        }
    });
    if (review_data.length < 10) {
        $(".btn_more").hide()
    }
}

function getQnaM2Data(isAll){var data_param="mode=get_qna";var item_cnt=$("#qna-table .title").length;var goodsno="";if($("[name=goodsno]").length>0){goodsno=$("[name=goodsno]").val();}
    data_param+="&item_cnt="+item_cnt+"&goodsno="+goodsno+'&isAll='+isAll;try{$.ajax({type:"post",url:"/"+mobile_root+"/proc/mAjaxAction.php",cache:false,async:false,data:data_param,success:function(res){if(res!=null){makeQnaM2List(res,goodsno);}
        else{$(".more-btn").hide();}},dataType:"json"});}
    catch(e){alert(e);}}
function makeQnaM2List(qna_data,goodsno){if(qna_data.length>0){var add_html="";for(var i=0;i<qna_data.length;i++){add_html+='<div class="title" onclick="view_content(this, '+qna_data[i].sno+');">';add_html+='   <div class="first img" data-goodsno='+qna_data[i].goodsno+'" >'+qna_data[i].img_html+'</div>';add_html+='   <div class="left last" >';add_html+='      <div class="answer-yn">';if(qna_data[i].reply_cnt>0){add_html+='<div class="answer-y">답변완료</div>';}
else{add_html+='<div class="answer-n">답변준비중</div>';}
    add_html+='</div>';add_html+='      <div style="color:#848484;">'+qna_data[i].qna_name+' | '+qna_data[i].regdt.split(" ")[0].replace(/\-/g,".")+'</div>';add_html+='      <div class="qna_page_subject"><span class="itemcd">['+qna_data[i].itemnm+']</span>'+qna_data[i].subject+'</div>';if(qna_data[i].secret==1){add_html+="<div class='secret-icon' style='float:left'></div>";}
    add_html+='      </div>';add_html+='</div>';add_html+='<div class="content-board" id="content-'+qna_data[i].sno+'">';add_html+='   <div class="contnet_board_inner">';if(qna_data[i].accessable){add_html+='   <div class="content-qna" style="width:100%; line-height:23px">';add_html+='      <div class="question-icon" style="float:left; padding-right:10px;"><img src="https://res.kurly.com/mobile/etc/designgj/images/common/question_icon.png" width="23px" height="23px"></div>'+qna_data[i].contents;if(qna_data[i].authdelete==='Y'){add_html+='   <a href="javascript:;" onclick="delete_qnaReview( \'del_qna\', \''+qna_data[i].m_no+'\', '+qna_data[i].sno+' );"><div class="del-btn">삭 제</div></a>';}
        add_html+='   </div>';for(var j=0;j<qna_data[i].reply.length;j++){add_html+='         <div class="content-reply">';add_html+='            <div class="answer-icon"></div>';if(qna_data[i].reply[j].subject){add_html+=qna_data[i].reply[j].subject+'<br /><br />';}
            add_html+=qna_data[i].reply[j].contents;if(qna_data[i].reply[j].authdelete==='Y'){add_html+='   <a href="javascript:;" onclick="delete_qnaReview( \'del_qna\', \''+qna_data[i].reply[j].m_no+'\', '+qna_data[i].reply[j].sno+' );"><div class="del-btn">삭 제</div></a>';}
            add_html+='         </div>';}}
    else{add_html+='   <div class="content-qna">';if(qna_data[i].m_no>0){add_html+='      비밀글 입니다.';}
    else{add_html+='      비밀번호 : <input type="password" id="goods-qna-password-'+qna_data[i].sno+'" name="password" required="required"/><button type="button" data-sno="'+qna_data[i].sno+'"  class="goods-qna-certification">확인</button>';}
        add_html+='</div>';}
    add_html+='      </div>';add_html+='   </div>';}}
    $("#qna-table").append(add_html);$("#qna-table .title .first.img").unbind("click").click(function(event){var goodsno=this.getAttribute("data-goodsno");if(parseInt(goodsno)>0){location.href="./view.php?goodsno="+goodsno;event.stopPropagation();}});$(".goods-qna-certification").unbind("click").click(function(event){var $this=$(this),sno=$this.attr("data-sno"),password=$("#goods-qna-password-"+sno).val();if(!password){alert("비밀번호를 입력해주세요.");return false;}
        $.ajax({"url":"ajaxAction.php","type":"post","data":"sno="+sno+"&password="+$("#goods-qna-password-"+sno).val()+"&mode=getGoodsQna","dataType":"json","success":function(responseData)
            {if(!responseData||!responseData.contents){alert("비밀번호가 일치하지 않습니다.");}
            else{var add_html='';add_html+='<div class="content-qna">';add_html+='<div class="question-icon"></div>'+responseData.contents+'</div>';for(var i=0;i<responseData.reply.length;i++){add_html+='         <div class="content-reply"><div class="answer-icon"></div>';add_html+='            <div class="reply-icon"></div>';if(responseData.reply[i].subject){add_html+=responseData.reply[i].subject+'<br /><br />';}
                add_html+=responseData.reply[i].contents;add_html+='         </div>';}
                $this.parent().parent().html(add_html);}}});return false;});if(qna_data.length<10){$(".more-btn").hide();}}
function getBoardData(skin,id,search,isComment,isSubSpeech)
{var data_param="mode=get_board";var item_cnt=$("#board-table .title").length;data_param+="&item_cnt="+item_cnt+"&id="+id;if(search!=''){data_param+="&search[word]="+search;}
    try{$.ajax({type:"post",url:"/"+mobile_root+"/proc/mAjaxAction.php",cache:false,async:false,data:data_param,success:function(res){if(res!=null){if(skin=='gallery'){makeBoardGalleryList(res,id,isComment,isSubSpeech);}
        else{makeBoardDefaultList(res,id,isComment,isSubSpeech);}}
        else{$(".more-btn").hide();}},dataType:"json"});}
    catch(e){alert(e);}}
function makeBoardDefaultList(data,id,isComment,isSubSpeech){if(data.length>0){var add_html="";for(var i=0;i<data.length;i++){add_html+='<tr class="data-row" onclick="viewContent(\''+data[i].viewUrl+'\',\''+data[i].secret+'\',\''+data[i].m_no+'\',\''+data[i]._member+'\')" >';add_html+='<td class="title"><div class="data-box">';add_html+='<div class="bullet"></div>';add_html+='<div class="subject">';if(data[i].sub!=''&&parseInt(data[i].sub)>0)
{add_html+=data[i].gapReply+'<div class="icon-reply"></div>';}
    if(data[i].secret=='o')
    {add_html+='<div class="icon-secret"></div>';}
    add_html+='<div class="subject-text screen-width"><b>';if(isSubSpeech!=''&&data[i].category!='')
    {add_html+='['+data[i].category+']';}
    add_html+=data[i].subject+'</b>';if(isComment=='on'&&parseInt(data[i].comment)>0)
    {add_html+='['+data[i].comment+']';}
    add_html+='</div>';if(data[i].new=='y')
    {add_html+='<div class="icon-new"></div>';}
    if(data[i].hot=='y')
    {add_html+='<div class="icon-hot"></div>';}
    add_html+='<div style="clear:both"></div>';add_html+='</div>';add_html+='<div class="etc">'+data[i].name+' | '+data[i].regdt.split(" ")[0].replace(/\-/g,".")+'</div>';add_html+='</div>';add_html+='</td></tr>';}}
    $("#board-table").append(add_html);if(data.length<10){$(".more-btn").hide();}}
function makeBoardGalleryList(data,id,isComment,isSubSpeech){if(data.length>0){var add_html="<tr>";for(var i=0;i<data.length;i++){add_html+='<td class="title" align="center" valign="top" width="50%">';add_html+='<div class="box" onclick="viewContent(\''+data[i].viewUrl+'\',\''+data[i].secret+'\',\''+data[i].m_no+'\',\''+data[i]._member+'\')" >';add_html+='<div style="width:'+data[i].imgSizeW+'px;height:'+data[i].imgSizeH+'px;background:url(\''+data[i].imgUrl+'\') no-repeat center center;background-size:100%;"></div>';add_html+='<div class="subject screen-width">';if(isSubSpeech!=''&&data[i].category!='')
{add_html+='['+data[i].category+']';}
    add_html+=data[i].subject;add_html+='</div>';add_html+='</div></td>';if(parseInt((i+1)%2)==0)
    {add_html+='</tr><tr align="center">';}}}
    add_html+='<td colspan="2" height="1"></td></tr>';$("#board-table").append(add_html);if(data.length<10){$(".more-btn").hide();}}
function addOnloadEvent(fnc)
{if(typeof window.addEventListener!="undefined")
    window.addEventListener("load",fnc,false);else if(typeof window.attachEvent!="undefined"){window.attachEvent("onload",fnc);}
else{if(window.onload!=null){var oldOnload=window.onload;window.onload=function(e){oldOnload(e);window[fnc]();};}
else window.onload=fnc;}}
function setGoodsImageSoldoutMask(){function _getSize(el){var size={};size={'height':el.clientHeight,'width':el.clientWidth};return size;}
    var i,css,s_img=document.getElementsByTagName('IMG');var mask=document.getElementById('el-goods-soldout-image-mask');if(!mask)return;var div,a,img,size;for(i in s_img){img=s_img[i];css=img.className;if(css&&css.indexOf('el-goods-soldout-image')>-1){for(a=img.parentNode;a.nodeType!==1&&a.tagName!=='A';a=a.parentNode);for(div=a.parentNode;div.nodeType!==1&&div.tagName!=='DIV';div=div.parentNode);if(typeof a.firstChild.id!='undefined'&&a.firstChild.id.indexOf('mask_')>-1){continue;}
        var _mask=mask.cloneNode(true);_mask.id=_mask.id+'_'+i;size=_getSize(img);_mask.style.height=size.height+"px";_mask.style.width=size.width+"px";_mask.style.backgroundPosition='50% 50%';_mask.style.display='block';_mask.style.zIndex=50;_mask.style.top=0;_mask.style.bottom=0;_mask.style.margin='auto';div.style.position='relative';a.insertBefore(_mask,img);}}}