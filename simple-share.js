;(function ($) {
    "use strict";

    $.fn.simpleShare = function (o) {

        o = $.extend(true, {
            providers: {
                "facebook": {
                    name: "facebook",
                    link: "http://www.facebook.com/sharer.php?m2w&{fbParams}",
                    width: 550,
                    height: 440,
                    title: "Facebook"
                },
                "twitter": {
                    name: "twitter",
                    link: "https://twitter.com/intent/tweet?text={title}&url={url}",
                    width: 550,
                    height: 440,
                    title: "Twitter"
                },
                "google-plus": {
                    name: "google-plus",
                    link: "//plus.google.com/share?url={url}",
                    width: 550,
                    height: 440,
                    title: "Google+"
                },
                "vk": {
                    name: "vk",
                    link: "//vk.com/share.php?url={url}&title={title}{vkParams}&description={description}",
                    width: 550,
                    height: 440,
                    title: "VK"
                },
                "linkedin": {
                    name: "linkedin",
                    link: "//www.linkedin.com/shareArticle?mini=true&url={url}&title={title}",
                    width: 600,
                    height: 400,
                    title: "LinkedIn"
                },
                "pinterest": {
                    name: "pinterest",
                    link: "//pinterest.com/pin/create/button/?url={url}&media={image}&description={title}",
                    width: 600,
                    height: 300,
                    title: "Pinterest"
                }
            },
            enabledProviders: [],
            wrapperTemplate: '{buttons}',
            buttonTemplate: '<a href="#" title="{title}" class="icon-{name}" onclick="{onclick}"></a>',
            onclickTemplate: "window.open('{link}','_blank','scrollbars=0,resizable=1,menubar=0,left=100,top=100,width={width},height={height},toolbar=0,status=0');return false;",
            removeContainer: false
        }, o || {});

        return this.each(function () {

            var $el = $(this),
                url = $el.attr('data-url'),
                title = $el.attr('data-title'),
                img = $el.attr('data-image'),
                dsc = $el.attr('data-description');

            if (!url) url = location.href;
            if (!title) title = document.title;
            if (!dsc) {
                var meta = $('meta[name="description"]').attr('content');
                if (meta !== undefined) dsc = meta;
                else dsc = '';
            }

            url = encodeURIComponent(url);
            title = encodeURIComponent(title);
            title = title.replace(/\'/g, '%27');
            img = encodeURIComponent(img);
            dsc = encodeURIComponent(dsc);
            dsc = dsc.replace(/\'/g, '%27');

            var fbParams = 'u=' + url;
            if (img != 'null' && img != '') {
                fbParams = 's=100&p[url]=' + url + '&p[title]=' + title + '&p[summary]=' + dsc + '&p[images][0]=' + img;
            }
            var vkParams = '';
            if (img != 'null' && img != '') {
                vkParams = '&image=' + img;
            }

            var j, link, onclick;
            var providers = [];
            var html = '';

            // sort and disable
            if (o.enabledProviders.length) {
                for (j = 0; j < o.enabledProviders.length; j++) {
                    if (o.providers.hasOwnProperty(o.enabledProviders[j])) {
                        providers.push(o.providers[o.enabledProviders[j]]);
                    }
                }
            } else {
                for (j in o.providers) {
                    if (!o.providers.hasOwnProperty(j)) continue;
                    providers.push(o.providers[j]);
                }
            }

            for (j = 0; j < providers.length; j++) {
                // add button
                link = str_replace(
                    ['{url}', '{title}', '{description}', '{image}', '{fbParams}', '{vkParams}'],
                    [url, title, dsc, img, fbParams, vkParams],
                    providers[j].link
                );
                onclick = str_replace(['{link}', '{width}', '{height}'], [link, providers[j].width, providers[j].height], o.onclickTemplate);
                html += str_replace(['{title}', '{name}', '{onclick}'], [providers[j].title, providers[j].name, onclick], o.buttonTemplate);
            }

            if (o.removeContainer) {
                $el.replaceWith(str_replace('{buttons}', html, o.wrapperTemplate));
            } else {
                $el.html(str_replace('{buttons}', html, o.wrapperTemplate));
            }

            // A JavaScript equivalent of PHP's str_replace
            function str_replace(search, replace, subject, count) {
                var i = 0, j = 0, temp = '', repl = '', sl = 0, fl = 0,
                    f = [].concat(search), r = [].concat(replace), s = subject,
                    ra = Object.prototype.toString.call(r) === '[object Array]',
                    sa = Object.prototype.toString.call(s) === '[object Array]';
                s = [].concat(s);
                if (count) {
                    this.window[count] = 0;
                }
                for (i = 0, sl = s.length; i < sl; i++) {
                    if (s[i] === '') continue;
                    for (j = 0, fl = f.length; j < fl; j++) {
                        temp = s[i] + '';
                        repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
                        s[i] = (temp).split(f[j]).join(repl);
                        if (count && s[i] !== temp) {
                            this.window[count] += (temp.length - s[i].length) / f[j].length;
                        }
                    }
                }
                return sa ? s : s[0];
            }

        });
    };
})(jQuery);
