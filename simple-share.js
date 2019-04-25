;(function ($) {
    "use strict";

    var providers = {
        // todo: add icons
        "facebook": {
            name: "facebook",
            link: "https://www.facebook.com/sharer/sharer.php?u={url}",
            title: "Facebook",
            color: "#3b5998",
            width: 800,
            height: 520
        },
        "vk": {
            name: "vk",
            link: "https://vk.com/share.php?url={url}&title={title}",
            title: "VKontakte",
            color: "#48729e",
            width: 550,
            height: 420
        },
        "twitter": {
            name: "twitter",
            link: "https://twitter.com/intent/tweet?url={url}&text={title}",
            title: "Twitter",
            color: "#00aced",
            width: 550,
            height: 420
        },
        "linkedin": {
            name: "linkedin",
            link: "https://www.linkedin.com/shareArticle?mini=true&url={url}&title={title}",
            title: "LinkedIn",
            color: "#0083be",
            width: 800,
            height: 520
        },
        "odnoklassniki": {
            name: "odnoklassniki",
            link: "//ok.ru/dk?st.cmd=addShare&st._surl={url}&title={title}",
            title: "Odnoklassniki",
            color: "#eb722e",
            width: 800,
            height: 520
        },
        "pinterest": {
            name: "pinterest",
            link: "https://pinterest.com/pin/create/button/?url={url}&description={title}&media={image}",
            title: "Pinterest",
            color: "#c20724",
            width: 800,
            height: 520
        },
        "viber": {
            name: "viber",
            link: "viber://forward?text={title}%20{url}",
            title: "Viber",
            color: "#7b519d"
        },
        "whatsapp": {
            name: "whatsapp",
            link: "whatsapp://send?text={title}%20{url}",
            title: "WhatsApp",
            color: "#65bc54"
        },
        "telegram": {
            name: "telegram",
            link: "https://telegram.me/share/url?url={url}&text={title}",
            title: "Telegram",
            color: "#64a9dc"
        },
        "skype": {
            name: "skype",
            link: "https://web.skype.com/share?url={url}",
            title: "Skype",
            color: "#00aff0",
            width: 800,
            height: 520
        }
    };

    $.fn.simpleShare = function (opt) {

        opt = $.extend(true, {
            providers: providers,
            url: window.location.href.replace(window.location.hash, ""),
            title: (document.title || ""),
            image: "",
            enabledProviders: [],
            classPrefix: "simple-share-"
        }, opt || {});

        return this.each(function () {

            var $el = $(this), options = $.extend(true, opt, dataToOptions($el));
            var j, providers = [];

            // enable default providers
            if (!options.enabledProviders.length) {
                options.enabledProviders = ["facebook", "twitter", "vk"];
            }

            if (typeof options.enabledProviders === "string") {
                options.enabledProviders = options.enabledProviders.split(/\s*,\s*/);
            }

            // sort and disable
            for (j = 0; j < options.enabledProviders.length; j++) {
                if (options.enabledProviders[j] in options.providers) {
                    providers.push(options.providers[options.enabledProviders[j]]);
                }
            }

            // add buttons
            for (j = 0; j < providers.length; j++) {
                if (!("link" in providers[j]) || !("name" in providers[j]))
                    continue;
                // pinterest must have not-empty media param
                if (providers[j].name === "pinterest" && !options.image)
                    continue;
                var link = makeUrl(providers[j].link, {"url": options.url, "title": options.title, "image": options.image});
                var pTitle = ("title" in providers[j]) ? providers[j].title : "";
                var $a = $('<a/>');
                $a.attr('href', link);
                $a.attr('title', pTitle);
                $a.attr('rel', 'noopener');
                $a.addClass(options.classPrefix + providers[j].name);
                if ("width" in providers[j] && "height" in providers[j]) {
                    $a.attr('data-width', providers[j].width);
                    $a.attr('data-height', providers[j].height);
                    $a.on('click', function (e) {
                        e.preventDefault();
                        window.open(
                            $(this).attr('href'),
                            '_blank',
                            'scrollbars=0,resizable=1,menubar=0,left=100,top=100,width=' + $(this).data('width') + ',height=' + $(this).data('height') + ',toolbar=0,status=0'
                        );
                    });
                } else {
                    $a.attr('target', '_blank');
                }
                $a.appendTo($el);
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
            if (!data.hasOwnProperty(key))
                continue;
            var value = data[key];
            if (value === "yes" || value === "true") {
                value = true;
            }
            else if (value === "no" || value === "false") {
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
        return tmpl.replace(/{([^}]+)}/g, function (m, key) {
            // If key doesn't exists in the context we should keep template tag as is
            return key in context ? (filter ? filter(context[key]) : context[key]) : m;
        });
    }

})(jQuery);
