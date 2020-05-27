;(function ($) {
    'use strict';

    var css = '.simple-share, .simple-share * { line-height: normal; }\n' +
        '.simple-share a { display: inline-block; font-size: 1.8em; text-decoration: none; margin: 0 0.2em 0 0; padding: 0.2em; border: none; border-radius: 2px; vertical-align: top; color: #fff; transition: all .2s; }\n' +
        '.simple-share a:hover, .simple-share a:focus { opacity: 0.8; color: #fff; }\n' +
        '.simple-share a:active { box-shadow: inset 0 2px 0 0 rgba(0, 0, 0, 0.1); }\n' +
        '.simple-share svg { display: block; width: 1em; height: 1em; margin: 0; border: 0; }\n';

    var providers = {
        'facebook': {
            name: 'facebook',
            url: 'https://www.facebook.com/sharer/sharer.php?u={url}',
            title: 'Facebook',
            color: '#3b5998',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M13.423 20v-7.298h2.464l.369-2.845h-2.832V8.042c0-.824.23-1.385 1.417-1.385h1.515V4.111A20.255 20.255 0 0 0 14.148 4c-2.183 0-3.678 1.326-3.678 3.76v2.097H8v2.845h2.47V20h2.953z" fill="currentColor" fill-rule="evenodd"/></svg>',
            width: 800,
            height: 520
        },
        'vkontakte': {
            name: 'vkontakte',
            url: 'https://vk.com/share.php?url={url}&title={title}',
            title: 'ВКонтакте',
            color: '#48729e',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.785 16.241s.288-.032.436-.194c.136-.148.132-.427.132-.427s-.02-1.304.576-1.496c.588-.19 1.341 1.26 2.14 1.818.605.422 1.064.33 1.064.33l2.137-.03s1.117-.071.587-.964c-.043-.073-.308-.661-1.588-1.87-1.34-1.264-1.16-1.059.453-3.246.983-1.332 1.376-2.145 1.253-2.493-.117-.332-.84-.244-.84-.244l-2.406.015s-.178-.025-.31.056c-.13.079-.212.262-.212.262s-.382 1.03-.89 1.907c-1.07 1.85-1.499 1.948-1.674 1.832-.407-.267-.305-1.075-.305-1.648 0-1.793.267-2.54-.521-2.733-.262-.065-.454-.107-1.123-.114-.858-.009-1.585.003-1.996.208-.274.136-.485.44-.356.457.159.022.519.099.71.363.246.341.237 1.107.237 1.107s.142 2.11-.33 2.371c-.325.18-.77-.187-1.725-1.865-.489-.859-.859-1.81-.859-1.81s-.07-.176-.198-.272c-.154-.115-.37-.151-.37-.151l-2.286.015s-.343.01-.469.161C3.94 7.721 4.043 8 4.043 8s1.79 4.258 3.817 6.403c1.858 1.967 3.968 1.838 3.968 1.838h.957z" fill="currentColor" fill-rule="evenodd"/></svg>',
            width: 550,
            height: 420
        },
        'twitter': {
            name: 'twitter',
            url: 'https://twitter.com/intent/tweet?url={url}&text={title}',
            title: 'Twitter',
            color: '#00aced',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 7.539a6.56 6.56 0 0 1-1.885.517 3.294 3.294 0 0 0 1.443-1.816 6.575 6.575 0 0 1-2.085.796 3.283 3.283 0 0 0-5.593 2.994A9.32 9.32 0 0 1 5.114 6.6a3.28 3.28 0 0 0 1.016 4.382 3.274 3.274 0 0 1-1.487-.41v.041a3.285 3.285 0 0 0 2.633 3.218 3.305 3.305 0 0 1-1.482.056 3.286 3.286 0 0 0 3.066 2.28A6.585 6.585 0 0 1 4 17.524 9.291 9.291 0 0 0 9.032 19c6.038 0 9.34-5 9.34-9.337 0-.143-.004-.285-.01-.425A6.672 6.672 0 0 0 20 7.538z" fill="currentColor" fill-rule="evenodd"/></svg>',
            width: 550,
            height: 420
        },
        'linkedin': {
            name: 'linkedin',
            url: 'https://www.linkedin.com/shareArticle?mini=true&url={url}&title={title}',
            title: 'LinkedIn',
            color: '#0083be',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4.246 8.954h3.41v10.281h-3.41zm1.725-4.935c-1.167 0-1.929.769-1.929 1.776 0 .987.74 1.777 1.884 1.777h.022c1.19 0 1.93-.79 1.93-1.777-.023-1.007-.74-1.776-1.907-1.776zm10.052 4.715c-1.81 0-2.62.997-3.073 1.698V8.976H9.54c.045.965 0 10.281 0 10.281h3.41v-5.742c0-.307.022-.614.112-.834.246-.613.807-1.25 1.75-1.25 1.233 0 1.727.944 1.727 2.325v5.501h3.41v-5.896c0-3.158-1.683-4.627-3.926-4.627z" fill="currentColor" fill-rule="evenodd"/></svg>',
            width: 800,
            height: 520
        },
        'odnoklassniki': {
            name: 'odnoklassniki',
            url: '//ok.ru/dk?st.cmd=addShare&st._surl={url}&title={title}',
            title: 'Одноклассники',
            color: '#eb722e',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" fill-rule="evenodd"><path d="M11.674 6.536a1.69 1.69 0 0 0-1.688 1.688c0 .93.757 1.687 1.688 1.687a1.69 1.69 0 0 0 1.688-1.687 1.69 1.69 0 0 0-1.688-1.688zm0 5.763a4.08 4.08 0 0 1-4.076-4.075 4.08 4.08 0 0 1 4.076-4.077 4.08 4.08 0 0 1 4.077 4.077 4.08 4.08 0 0 1-4.077 4.075zM10.025 15.624a7.633 7.633 0 0 1-2.367-.98 1.194 1.194 0 0 1 1.272-2.022 5.175 5.175 0 0 0 5.489 0 1.194 1.194 0 1 1 1.272 2.022 7.647 7.647 0 0 1-2.367.98l2.279 2.28a1.194 1.194 0 0 1-1.69 1.688l-2.238-2.24-2.24 2.24a1.193 1.193 0 1 1-1.689-1.689l2.279-2.279"/></g></svg>',
            width: 800,
            height: 520
        },
        'pinterest': {
            name: 'pinterest',
            url: 'https://pinterest.com/pin/create/button/?url={url}&description={title}&media={image}',
            title: 'Pinterest',
            color: '#c20724',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6 9.742c0 1.58.599 2.986 1.884 3.51.21.087.4.003.46-.23.043-.16.144-.568.189-.738.06-.23.037-.31-.133-.512-.37-.436-.608-1.001-.608-1.802 0-2.322 1.74-4.402 4.53-4.402 2.471 0 3.829 1.508 3.829 3.522 0 2.65-1.174 4.887-2.917 4.887-.963 0-1.683-.795-1.452-1.77.276-1.165.812-2.421.812-3.262 0-.752-.405-1.38-1.24-1.38-.985 0-1.775 1.017-1.775 2.38 0 .867.293 1.454.293 1.454L8.69 16.406c-.352 1.487-.053 3.309-.028 3.492.015.11.155.136.22.054.09-.119 1.262-1.564 1.66-3.008.113-.409.647-2.526.647-2.526.32.61 1.254 1.145 2.248 1.145 2.957 0 4.964-2.693 4.964-6.298C18.4 6.539 16.089 4 12.576 4 8.204 4 6 7.13 6 9.742z" fill="currentColor" fill-rule="evenodd"/></svg>',
            width: 800,
            height: 520
        },
        'skype': {
            name: 'skype',
            url: 'https://web.skype.com/share?url={url}',
            title: 'Skype',
            color: '#00aff0',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19.537 13.698c.115-.52.176-1.06.176-1.614 0-4.155-3.415-7.524-7.63-7.524-.444 0-.88.038-1.304.11A4.444 4.444 0 0 0 8.425 4C5.981 4 4 5.954 4 8.364c0 .805.222 1.56.608 2.207a7.428 7.428 0 0 0-.155 1.513c0 4.156 3.416 7.4 7.63 7.4.477 0 .944-.044 1.397-.126.623.33 1.335.642 2.092.642 2.444 0 4.425-1.953 4.425-4.364 0-.695-.166-1.354-.46-1.938zm-3.974 1.457c-.294.418-.725.747-1.293.984-.567.238-1.239.356-2.016.356-.933 0-1.702-.162-2.308-.486a2.986 2.986 0 0 1-1.047-.934c-.268-.39-.403-.768-.403-1.137 0-.213.08-.395.242-.547a.855.855 0 0 1 .615-.229c.202 0 .373.059.512.178.14.119.26.294.358.527.12.278.25.51.39.695.139.185.336.34.589.46.254.12.587.18 1 .18.566 0 1.027-.12 1.382-.364.354-.243.532-.547.532-.91a.919.919 0 0 0-.287-.702 1.88 1.88 0 0 0-.741-.412 13.21 13.21 0 0 0-1.216-.303c-.678-.146-1.247-.318-1.703-.513-.458-.196-.822-.463-1.09-.8-.269-.34-.403-.759-.403-1.26 0-.48.142-.904.426-1.275.283-.372.693-.658 1.23-.858.537-.2 1.17-.299 1.895-.299.58 0 1.082.066 1.505.198.423.133.774.309 1.053.528.28.22.484.45.612.691.13.24.194.477.194.705 0 .21-.08.4-.241.567a.8.8 0 0 1-.603.252c-.22 0-.386-.05-.5-.151-.114-.101-.237-.266-.37-.495a2.27 2.27 0 0 0-.618-.768c-.241-.184-.627-.276-1.16-.276-.494 0-.893.1-1.196.3-.303.199-.455.44-.455.72 0 .173.053.324.155.45.103.128.245.235.426.326.18.091.363.162.547.214.185.052.49.126.916.225a15.47 15.47 0 0 1 1.446.38c.432.138.8.307 1.103.503.302.198.54.45.709.752.17.302.255.673.255 1.111 0 .525-.148.998-.442 1.417z" fill="currentColor" fill-rule="evenodd"/></svg>',
            width: 800,
            height: 520
        },
        'viber': {
            name: 'viber',
            url: 'viber://forward?text={title}%20{url}',
            title: 'Viber',
            color: '#7b519d',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" fill-rule="evenodd"><path d="M18.434 15.574c-.484-.391-1.002-.743-1.511-1.102-1.016-.718-1.945-.773-2.703.38-.426.648-1.021.677-1.644.392-1.718-.782-3.044-1.989-3.821-3.743-.344-.777-.34-1.473.465-2.022.425-.29.854-.634.82-1.268-.045-.828-2.043-3.593-2.832-3.885a1.429 1.429 0 0 0-.984 0C4.373 4.95 3.606 6.48 4.34 8.292c2.19 5.405 6.043 9.167 11.349 11.463.302.13.638.183.808.23 1.208.012 2.623-1.158 3.032-2.318.393-1.117-.438-1.56-1.096-2.093zM12.485 4.88c3.879.6 5.668 2.454 6.162 6.38.045.363-.09.909.426.919.538.01.408-.528.413-.89.045-3.699-3.163-7.127-6.888-7.253-.281.04-.863-.195-.9.438-.024.427.466.357.787.406z"/><path d="M13.244 5.957c-.373-.045-.865-.222-.953.299-.09.546.458.49.811.57 2.395.538 3.23 1.414 3.624 3.802.057.349-.057.89.532.8.436-.066.278-.53.315-.802.02-2.293-1.936-4.38-4.329-4.669z"/><path d="M13.464 7.832c-.249.006-.493.033-.585.3-.137.4.152.496.446.544.983.158 1.5.74 1.598 1.725.027.268.195.484.452.454.356-.043.389-.361.378-.664.017-1.106-1.227-2.385-2.289-2.359z"/></g></svg>'
        },
        'whatsapp': {
            name: 'whatsapp',
            url: 'whatsapp://send?text={title}%20{url}',
            title: 'WhatsApp',
            color: '#65bc54',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 11.794c0 4.304-3.517 7.794-7.855 7.794a7.87 7.87 0 0 1-3.796-.97L4 20l1.418-4.182a7.714 7.714 0 0 1-1.127-4.024C4.29 7.489 7.807 4 12.145 4S20 7.49 20 11.794zm-7.855-6.553c-3.641 0-6.603 2.94-6.603 6.553 0 1.434.467 2.762 1.258 3.842l-.825 2.433 2.537-.806a6.6 6.6 0 0 0 3.633 1.084c3.642 0 6.604-2.94 6.604-6.553s-2.962-6.553-6.604-6.553zm3.967 8.348c-.049-.08-.177-.128-.37-.223-.192-.095-1.139-.558-1.315-.621-.177-.064-.305-.096-.434.095a10.92 10.92 0 0 1-.61.749c-.112.128-.224.143-.416.048-.193-.096-.813-.297-1.549-.948a5.76 5.76 0 0 1-1.07-1.323c-.113-.191-.013-.295.084-.39.086-.086.192-.223.289-.334.096-.112.128-.191.192-.319s.032-.239-.016-.335c-.048-.095-.433-1.035-.594-1.418-.16-.382-.32-.318-.433-.318-.112 0-.24-.016-.369-.016a.71.71 0 0 0-.513.239c-.177.19-.674.653-.674 1.593s.69 1.848.786 1.976c.096.127 1.332 2.119 3.289 2.884 1.958.764 1.958.51 2.31.477.353-.031 1.14-.461 1.3-.908.16-.446.16-.829.113-.908z" fill="currentColor" fill-rule="evenodd"/></svg>'
        },
        'telegram': {
            name: 'telegram',
            url: 'https://telegram.me/share/url?url={url}&text={title}',
            title: 'Telegram',
            color: '#64a9dc',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18.92 6.089L4.747 11.555c-.967.388-.962.928-.176 1.168l3.534 1.104 1.353 4.146c.164.454.083.634.56.634.368 0 .53-.168.736-.368.13-.127.903-.88 1.767-1.719l3.677 2.717c.676.373 1.165.18 1.333-.628l2.414-11.374c.247-.99-.378-1.44-1.025-1.146zM8.66 13.573l7.967-5.026c.398-.242.763-.112.463.154l-6.822 6.155-.265 2.833-1.343-4.116z" fill="currentColor" fill-rule="evenodd"/></svg>'
        }
    };

    $.fn.simpleShare = function (opt) {

        opt = $.extend(true, {
            providers: [],
            styled: true,
            image: '',
            url: '',
            title: ''
        }, opt || {});

        return this.each(function () {

            var $el = $(this);
            if ($el.data('initialized')) {
                return;
            }
            $el.data('initialized', true);

            var options = $.extend(true, opt, dataToOptions($el)),
                currentProviders = [];

            if (typeof options.providers === 'string') {
                options.providers = options.providers.split(/\s*,\s*/);
            }

            if (!options.providers.length) {
                options.providers = ['facebook', 'vkontakte', 'telegram'];
            }

            // all providers
            if (options.providers.indexOf('*') !== -1) {
                for (var providerName in providers) {
                    currentProviders.push(providers[providerName]);
                }
            } else {
                // sort and disable
                for (var i = 0; i < options.providers.length; i++) {
                    if (options.providers[i] in providers) {
                        currentProviders.push(providers[options.providers[i]]);
                    }
                }
            }

            // add css
            if (options.styled && currentProviders.length) {
                addCss();
                if (!$el.hasClass('simple-share')) {
                    $el.addClass('simple-share');
                }
            }

            var oTitle = options.title || $('meta[property="og:title"]').attr('content') || document.title || '';
            var oUrl = options.url || window.location.href.replace(window.location.hash, '');
            var oImage = options.image || $('meta[property="og:image"]').attr('content') || '';

            // add buttons
            $el.html('');
            for (var j = 0; j < currentProviders.length; j++) {
                // pinterest must have not-empty media param
                if (currentProviders[j].name === 'pinterest' && !oImage) {
                    continue;
                }
                var shareUrl = makeUrl(currentProviders[j].url, {'url': oUrl, 'title': oTitle, 'image': oImage});
                var pTitle = currentProviders[j].title;
                var pIcon = currentProviders[j].icon;
                var $a = $('<a/>');
                $a.attr('href', shareUrl);
                $a.attr('title', pTitle);
                $a.attr('rel', 'noopener');
                $a.attr('data-provider', currentProviders[j].name);
                if (pIcon) {
                    $a.html(pIcon);
                } else {
                    $a.html(pTitle);
                }
                if ('color' in currentProviders[j]) {
                    if (options.styled) {
                        $a.css({backgroundColor: currentProviders[j].color});
                    } else {
                        $a.attr('data-color', currentProviders[j].color);
                    }
                }
                if ('width' in currentProviders[j] && 'height' in currentProviders[j]) {
                    $a.attr('data-width', currentProviders[j].width);
                    $a.attr('data-height', currentProviders[j].height);
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

    $('.simple-share:not([data-skip-auto])').simpleShare();

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
            if (value === 'yes' || value === 'true') {
                value = true;
            }
            else if (value === 'no' || value === 'false') {
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

    function addCss() {
        if (document.getElementById('simple-share-css')) {
            return;
        }

        var style = document.createElement('style');
        style.innerHTML = css;
        style.id = 'simple-share-css';

        var ref = document.getElementsByTagName('head')[0] || document.body;
        ref.prepend(style);
    }

})(jQuery);
