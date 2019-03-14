var prepage = 10;
var page = 1;
var pages = 0;
var comments = [];

//提交评论
$('#messageBtn').on('click', function () {
    $.ajax({
        type: 'POST',
        url: '/api/comment/post',
        data: {
            contentid: $('#contentId').val(),
            contents: $('#messageContent').val()
        },
        success: function (responseData) {
            //console.log(responseData);
            $('#messageContent').val('');
            comments = responseData.data.comments.reverse();
            renderComment();
        }
    })
});

//每次页面重载的时候获取一下该文章的所有评论
$.ajax({
    url: '/api/comment',
    data: {
        contentid: $('#contentId').val()
    },
    success: function (responseData) {
        comments = responseData.data.reverse();
        renderComment();
    }
});

$('.pager').delegate('a', 'click', function () {
    if ($(this).parent().hasClass('previous')) {
        page--;
    } else {
        page++;
    }
    renderComment();
});

function renderComment() {

    $('#messageCount').html(comments.length);

    pages = Math.max(Math.ceil(comments.length / prepage), 1);
    var start = Math.max(0, (page - 1) * prepage);
    var end = Math.min(start + prepage, comments.length);

    var $lis = $('.pager li');
    $lis.eq(1).html(page + ' / ' + pages);

    if (page <= 1) {
        page = 1;
        $lis.eq(0).html('<span class="glyphicon glyphicon-ban-circle"></span>');
    } else {
        $lis.eq(0).html('<a href="javascript:;"><i class="glyphicon glyphicon-menu-left"></i></a>');
    }
    if (page >= pages) {
        page = pages;
        $lis.eq(2).html('<span class="glyphicon glyphicon-ban-circle"></span>');
    } else {
        $lis.eq(2).html('<a href="javascript:;"><i class="glyphicon glyphicon-menu-right"></i></a>');
    }

    if (comments.length == 0) {
        $('.messageList').html('<div class="messageBox"><p>还没有评论</p></div>');
    } else {
        var html = '';
        for (var i = start; i < end; i++) {
            html +=
                '<div class="comments-bottom">' +
                '<div>' +
                '<div>' + '用户:' + '<span  class="txt-username">' + comments[i].username + '</span>' + '</div>' +
                '<div class="txt-postTime">' + formatDate(comments[i].postTime) + '</div>' +
                '</div>' +
                '<div class="comments-content comments_content">' + comments[i].contents + '</div>' +
                '</div>';
        }
            $('.messageList').html(html);
    }

}
$(function () {
    $(".content-css").each(function () {
        var temp = $(this).text().replace(/\n|\r\n/g, '<br/>');
        $(this).html(temp);
    });
})

function formatDate(d) {
    var date1 = new Date(d);
    return date1.getFullYear() + '年' + (date1.getMonth() + 1) + '月' + date1.getDate() + '日 ' + date1.getHours() + ':' + date1.getMinutes() + ':' + date1.getSeconds();
}