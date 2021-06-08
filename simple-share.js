;(function ($) {
    'use strict';

    var css = '.simple-share, .simple-share * { line-height: normal; }\n' +
        '.simple-share a { display: inline-block; font-size: 1.5em; text-decoration: none; margin: 0 0.2em 0 0; padding: 0.4em; border: 0; border-radius: 0.15em; vertical-align: top; color: #fff; transition: all 0.2s; }\n' +
        '.simple-share a:hover, .simple-share a:focus { opacity: 0.8; color: #fff; }\n' +
        '.simple-share a:active { box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125); opacity: 1; }\n' +
        '.simple-share svg { display: block; width: 1em; height: 1em; margin: 0; border: 0; }\n';

    var providers = {
        'facebook': {
            name: 'facebook',
            url: 'https://www.facebook.com/sharer.php?src=sp&u={url}',
            title: 'Facebook',
            color: '#1877f2',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M23.9981 11.9991C23.9981 5.37216 18.626 0 11.9991 0C5.37216 0 0 5.37216 0 11.9991C0 17.9882 4.38789 22.9522 10.1242 23.8524V15.4676H7.07758V11.9991H10.1242V9.35553C10.1242 6.34826 11.9156 4.68714 14.6564 4.68714C15.9692 4.68714 17.3424 4.92149 17.3424 4.92149V7.87439H15.8294C14.3388 7.87439 13.8739 8.79933 13.8739 9.74824V11.9991H17.2018L16.6698 15.4676H13.8739V23.8524C19.6103 22.9522 23.9981 17.9882 23.9981 11.9991Z"/></svg>',
            width: 800,
            height: 520
        },
        'vk': {
            name: 'vk',
            url: 'https://vk.com/share.php?url={url}&title={title}',
            title: 'VK',
            color: '#4680c2',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z"/></svg>',
            width: 550,
            height: 420
        },
        'twitter': {
            name: 'twitter',
            url: 'https://twitter.com/intent/tweet?url={url}&text={title}',
            title: 'Twitter',
            color: '#1da1f2',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"/></svg>',
            width: 550,
            height: 420
        },
        'linkedin': {
            name: 'linkedin',
            url: 'https://www.linkedin.com/shareArticle?mini=true&url={url}&title={title}',
            title: 'LinkedIn',
            color: '#0077b5',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
            width: 800,
            height: 520
        },
        'odnoklassniki': {
            name: 'odnoklassniki',
            url: 'https://connect.ok.ru/offer?url={url}&title={title}',
            title: 'Odnoklassniki',
            color: '#f4731c',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M14.505 17.44c1.275-.29 2.493-.794 3.6-1.49.834-.558 1.058-1.686.5-2.52-.536-.802-1.604-1.044-2.435-.553-2.55 1.595-5.79 1.595-8.34 0-.847-.534-1.965-.28-2.5.565 0 .002 0 .004-.002.005-.534.847-.28 1.966.567 2.5l.002.002c1.105.695 2.322 1.2 3.596 1.488l-3.465 3.465c-.707.695-.72 1.83-.028 2.537l.03.03c.344.354.81.53 1.274.53.465 0 .93-.176 1.275-.53L12 20.065l3.404 3.406c.72.695 1.87.676 2.566-.045.678-.703.678-1.818 0-2.52l-3.465-3.466zM12 12.388c3.42-.004 6.19-2.774 6.195-6.193C18.195 2.78 15.415 0 12 0S5.805 2.78 5.805 6.197c.005 3.42 2.776 6.19 6.195 6.192zm0-8.757c1.416.002 2.563 1.15 2.564 2.565 0 1.416-1.148 2.563-2.564 2.565-1.415-.002-2.562-1.148-2.565-2.564C9.437 4.78 10.585 3.633 12 3.63z"/></svg>',
            width: 800,
            height: 520
        },
        'pinterest': {
            name: 'pinterest',
            url: 'https://pinterest.com/pin/create/button/?url={url}&description={title}&media={image}',
            title: 'Pinterest',
            color: '#bd081c',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/></svg>',
            width: 800,
            height: 520
        },
        'telegram': {
            name: 'telegram',
            url: 'https://t.me/share/url?url={url}&text={title}',
            title: 'Telegram',
            color: '#2ca5e0',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M23.91 3.79L20.3 20.84c-.25 1.21-.98 1.5-2 .94l-5.5-4.07-2.66 2.57c-.3.3-.55.56-1.1.56-.72 0-.6-.27-.84-.95L6.3 13.7l-5.45-1.7c-1.18-.35-1.19-1.16.26-1.75l21.26-8.2c.97-.43 1.9.24 1.53 1.73z"/></svg>'
        },
        'viber': {
            name: 'viber',
            url: 'viber://forward?text={title}%20{url}',
            title: 'Viber',
            color: '#665cac',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11.398.002C9.473.028 5.331.344 3.014 2.467 1.294 4.177.693 6.698.623 9.82c-.06 3.11-.13 8.95 5.5 10.541v2.42s-.038.97.602 1.17c.79.25 1.24-.499 1.99-1.299l1.4-1.58c3.85.32 6.8-.419 7.14-.529.78-.25 5.181-.811 5.901-6.652.74-6.031-.36-9.831-2.34-11.551l-.01-.002c-.6-.55-3-2.3-8.37-2.32 0 0-.396-.025-1.038-.016zm.067 1.697c.545-.003.88.02.88.02 4.54.01 6.711 1.38 7.221 1.84 1.67 1.429 2.528 4.856 1.9 9.892-.6 4.88-4.17 5.19-4.83 5.4-.28.09-2.88.73-6.152.52 0 0-2.439 2.941-3.199 3.701-.12.13-.26.17-.35.15-.13-.03-.17-.19-.16-.41l.02-4.019c-4.771-1.32-4.491-6.302-4.441-8.902.06-2.6.55-4.732 2-6.172 1.957-1.77 5.475-2.01 7.11-2.02zm.36 2.6a.299.299 0 0 0-.3.299.3.3 0 0 0 .3.3 5.631 5.631 0 0 1 4.03 1.59c1.09 1.06 1.621 2.48 1.641 4.34a.3.3 0 0 0 .3.3v-.009a.3.3 0 0 0 .3-.3 6.451 6.451 0 0 0-1.81-4.76c-1.19-1.16-2.692-1.76-4.462-1.76zm-3.954.69a.955.955 0 0 0-.615.12h-.012c-.41.24-.788.54-1.148.94-.27.32-.421.639-.461.949a1.24 1.24 0 0 0 .05.541l.02.01a13.722 13.722 0 0 0 1.2 2.6 15.383 15.383 0 0 0 2.32 3.171l.03.04.04.03.03.03.03.03a15.603 15.603 0 0 0 3.18 2.33c1.32.72 2.122 1.06 2.602 1.2v.01c.14.04.268.06.398.06a1.84 1.84 0 0 0 1.102-.472c.39-.35.7-.738.93-1.148v-.01c.23-.43.15-.841-.18-1.121a13.632 13.632 0 0 0-2.15-1.54c-.51-.28-1.03-.11-1.24.17l-.45.569c-.23.28-.65.24-.65.24l-.012.01c-3.12-.8-3.95-3.959-3.95-3.959s-.04-.43.25-.65l.56-.45c.27-.22.46-.74.17-1.25a13.522 13.522 0 0 0-1.54-2.15.843.843 0 0 0-.504-.3zm4.473.89a.3.3 0 0 0 .002.6 3.78 3.78 0 0 1 2.65 1.15 3.5 3.5 0 0 1 .9 2.57.3.3 0 0 0 .3.299l.01.012a.3.3 0 0 0 .3-.301c.03-1.19-.34-2.19-1.07-2.99-.73-.8-1.75-1.25-3.05-1.34a.3.3 0 0 0-.042 0zm.49 1.619a.305.305 0 0 0-.018.611c.99.05 1.47.55 1.53 1.58a.3.3 0 0 0 .3.29h.01a.3.3 0 0 0 .29-.32c-.07-1.34-.8-2.091-2.1-2.161a.305.305 0 0 0-.012 0z"/></svg>'
        },
        'whatsapp': {
            name: 'whatsapp',
            url: 'https://api.whatsapp.com/send?text={title}%20{url}',
            title: 'WhatsApp',
            color: '#25d366',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>'
        },
        'skype': {
            name: 'skype',
            url: 'https://web.skype.com/share?url={url}',
            title: 'Skype',
            color: '#00aff0',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12.069 18.874c-4.023 0-5.82-1.979-5.82-3.464 0-.765.561-1.296 1.333-1.296 1.723 0 1.273 2.477 4.487 2.477 1.641 0 2.55-.895 2.55-1.811 0-.551-.269-1.16-1.354-1.429l-3.576-.895c-2.88-.724-3.403-2.286-3.403-3.751 0-3.047 2.861-4.191 5.549-4.191 2.471 0 5.393 1.373 5.393 3.199 0 .784-.688 1.24-1.453 1.24-1.469 0-1.198-2.037-4.164-2.037-1.469 0-2.292.664-2.292 1.617s1.153 1.258 2.157 1.487l2.637.587c2.891.649 3.624 2.346 3.624 3.944 0 2.476-1.902 4.324-5.722 4.324m11.084-4.882l-.029.135-.044-.24c.015.045.044.074.059.12.12-.675.181-1.363.181-2.052 0-1.529-.301-3.012-.898-4.42-.569-1.348-1.395-2.562-2.427-3.596-1.049-1.033-2.247-1.856-3.595-2.426-1.318-.631-2.801-.93-4.328-.93-.72 0-1.444.07-2.143.204l.119.06-.239-.033.119-.025C8.91.274 7.829 0 6.731 0c-1.789 0-3.47.698-4.736 1.967C.729 3.235.032 4.923.032 6.716c0 1.143.292 2.265.844 3.258l.02-.124.041.239-.06-.115c-.114.645-.172 1.299-.172 1.955 0 1.53.3 3.017.884 4.416.568 1.362 1.378 2.576 2.427 3.609 1.034 1.05 2.247 1.857 3.595 2.442 1.394.6 2.877.898 4.404.898.659 0 1.334-.06 1.977-.179l-.119-.062.24.046-.135.03c1.002.569 2.126.871 3.294.871 1.783 0 3.459-.69 4.733-1.963 1.259-1.259 1.962-2.951 1.962-4.749 0-1.138-.299-2.262-.853-3.266"/></svg>',
            width: 800,
            height: 520
        },
        'messenger': {
            name: 'messenger',
            url: 'fb-messenger://share/?link={url}',
            title: 'Messenger',
            color: '#00b2ff',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M0 11.64C0 4.95 5.24 0 12 0s12 4.95 12 11.64-5.24 11.64-12 11.64c-1.21 0-2.38-.16-3.47-.46a.96.96 0 0 0-.64.05L5.5 23.92a.96.96 0 0 1-1.35-.85l-.07-2.14a.97.97 0 0 0-.32-.68A11.39 11.39 0 0 1 0 11.64zm8.32-2.19l-3.52 5.6c-.35.53.32 1.14.82.75l3.79-2.87c.26-.2.6-.2.87 0l2.8 2.1c.84.63 2.04.4 2.6-.48l3.52-5.6c.35-.53-.32-1.13-.82-.75l-3.79 2.87c-.25.2-.6.2-.86 0l-2.8-2.1a1.8 1.8 0 0 0-2.61.48z"/></svg>',
            width: 800,
            height: 520
        }
    };

    $.fn.simpleShare = function (opt) {

        opt = $.extend(true, {
            providers: [],
            styled: true,
            icons: true,
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
                options.providers = ['facebook', 'vk', 'telegram'];
            }

            // all providers
            if (options.providers.indexOf('*') !== -1) {
                for (var providerName in providers) {
                    if (providers.hasOwnProperty(providerName)) {
                        currentProviders.push(providers[providerName]);
                    }
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
                if (options.icons) {
                    if (pIcon) {
                        $a.html(pIcon);
                    } else {
                        $a.html(pTitle);
                    }
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
            if (!data.hasOwnProperty(key)) {
                continue;
            }
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
