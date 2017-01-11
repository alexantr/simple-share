;(function ($) {
    'use strict';

    var providers = {
        'facebook': {
            name: 'facebook',
            link: 'https://www.facebook.com/sharer/sharer.php?u={url}',
            width: 600,
            height: 360,
            title: 'Facebook'
        },
        'twitter': {
            name: 'twitter',
            link: 'https://twitter.com/intent/tweet?url={url}&text={title}',
            width: 600,
            height: 255,
            title: 'Twitter'
        },
        'vk': {
            name: 'vk',
            link: 'https://vk.com/share.php?url={url}&title={title}',
            width: 650,
            height: 450,
            title: 'VK'
        },
        'google-plus': {
            name: 'google-plus',
            link: 'https://plus.google.com/share?url={url}',
            width: 500,
            height: 550,
            title: 'Google+'
        },
        'pinterest': {
            name: 'pinterest',
            link: 'https://pinterest.com/pin/create/button/?url={url}&description={title}&media={image}',
            width: 740,
            height: 550,
            title: 'Pinterest'
        },
        'linkedin': {
            name: 'linkedin',
            link: 'https://www.linkedin.com/shareArticle?mini=true&url={url}&title={title}',
            width: 600,
            height: 400,
            title: 'LinkedIn'
        }
    };

    $.fn.simpleShare = function (opt) {

        opt = $.extend(true, {
            providers: providers,
            url: window.location.href.replace(window.location.hash, ''),
            title: (document.title || ''),
            image: '',
            enabledProviders: ['facebook', 'twitter', 'vk'],
            wrapperTemplate: '{buttons}',
            buttonTemplate: '<span title="{title}" class="icon-{name}" onclick="{onclick}"></span>',
            onclickTemplate: "window.open('{link}','_blank','scrollbars=0,resizable=1,menubar=0,left=100,top=100,width={width},height={height},toolbar=0,status=0');return false;",
            removeContainer: false,
            popupWidth: 550,
            popupHeight: 440
        }, opt || {});

        return this.each(function () {

            var $el = $(this), options = $.extend(true, opt, dataToOptions($el));
            var j, link, onclick, wWidth, wHeight, pTitle, providers = [], html = '';

            // sort and disable
            if (options.enabledProviders.length) {
                for (j = 0; j < options.enabledProviders.length; j++) {
                    if (!options.providers.hasOwnProperty(options.enabledProviders[j])) continue;
                    if (!options.providers[options.enabledProviders[j]].hasOwnProperty('name')) continue;
                    if (!options.providers[options.enabledProviders[j]].hasOwnProperty('link')) continue;
                    if (options.enabledProviders[j] != options.providers[options.enabledProviders[j]].name) continue;
                    providers.push(options.providers[options.enabledProviders[j]]);
                }
            } else {
                for (j in options.providers) {
                    if (!options.providers.hasOwnProperty(j)) continue;
                    if (!options.providers[j].hasOwnProperty('name') || !options.providers[j].hasOwnProperty('link')) continue;
                    providers.push(options.providers[j]);
                }
            }

            // add buttons
            for (j = 0; j < providers.length; j++) {
                if (!('link' in providers[j]) || !('name' in providers[j])) continue;
                // pinterest must have not-empty media param
                if (providers[j].name == 'pinterest' && !options.image) continue;
                link = makeUrl(providers[j].link, {'url': options.url, 'title': options.title, 'image': options.image});
                wWidth = ('width' in providers[j]) ? providers[j].width : options.popupWidth;
                wHeight = ('height' in providers[j]) ? providers[j].height : options.popupHeight;
                pTitle = ('title' in providers[j]) ? providers[j].title : '';
                onclick = template(options.onclickTemplate, {'link': link, 'width': wWidth, 'height': wHeight});
                html += template(options.buttonTemplate, {'title': pTitle, 'name': providers[j].name, 'onclick': onclick});
            }

            if (options.removeContainer) {
                $el.replaceWith(template(options.wrapperTemplate, {'buttons': html}));
            } else {
                $el.html(template(options.wrapperTemplate, {'buttons': html}));
            }
        });
    };

    // Camelize data-attributes
    function dataToOptions(elem) {
        function upper(m, l) {
            return l.toUpper();
        }

        var options = {};
        var data = elem.data();
        for (var key in data) {
            if (!data.hasOwnProperty(key)) continue;
            var value = data[key];
            if (value === 'yes') {
                value = true;
            }
            else if (value === 'no') {
                value = false;
            }
            options[key.replace(/-(\w)/g, upper)] = value;
        }
        return options;
    }

    function makeUrl(url, context) {
        return template(url, context, encodeURIComponent);
    }

    function template(tmpl, context, filter) {
        return tmpl.replace(/\{([^}]+)\}/g, function (m, key) {
            // If key doesn't exists in the context we should keep template tag as is
            return key in context ? (filter ? filter(context[key]) : context[key]) : m;
        });
    }

})(jQuery);
