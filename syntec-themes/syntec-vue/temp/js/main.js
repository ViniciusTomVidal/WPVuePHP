$(document).ready(function () {
	$('#bannerTV').flexslider({
        animation: "slide"
    });
    $('.goBottom').click(function() {
        var target = $(this).attr('href');
        scrollTo(target);
        return false;
    });


});


if ($(window).width() <= 768 ){  


}


$(window).scroll(function (e) {
    var scroll = $(this).scrollTop();
});

