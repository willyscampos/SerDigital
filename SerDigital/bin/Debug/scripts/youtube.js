(function () {
    function createPlayer(jqe, video, options) {
        var ifr = $('iframe', jqe);
        var lw = window.innerWidth;
        var lh = window.innerHeight;
        if (ifr.length === 0) {
            ifr = $('<iframe style="overflow-y: scroll" height="' + lh + 'px" width="' + lw + 'px" allowFullScreen frameborder=1>');
            ifr.addClass('player');
        }
        var src = 'http://www.youtube.com/embed/' + video;
        if (options.playopts) {
            src += '?';
            for (var k in options.playopts) {
                src += k + '=' + options.playopts[k] + '&';
            }
        }
        ifr.attr('src', src);        
        jqe.append(ifr);
    }
    var defoptions = {
        autoplay: false,
        user: null,
        player: createPlayer,
        loaded: function () { },
        playopts: {
            autoplay: 0,
            egm: 1,
            autohide: 1,
            fs: 1,
            showinfo: 1,
            border: 1
        }
    };
    $.fn.extend({
        youTubeChannel: function (options) {
            var md = $(this);
            var allopts = $.extend(true, {}, defoptions, options);
            $.getJSON('http://gdata.youtube.com/feeds/api/users/' + allopts.user + '/uploads?alt=jsonc&v=2', null, function (data) {
                var videos = [];
                var playlist = '';
                $.each(data.data.items, function (i, item) {
                    videos.push(item.id);
                    playlist += item.id + ',';
                });                
                allopts.playopts.playlist = playlist;
                allopts.player(md, videos[0], allopts);
            });
        }
    });

})();
