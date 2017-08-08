angular.module('droplit.angular-color-picker', [])
    .directive('droplitColorPicker', function ($timeout) {
        return {
            restrict: 'E',
            scope: {
                hue: '=',
                range: '=' // Scales hue to be: 0 <= hue <= range, defaults to 360
            },
            template: "<div class='palette'><div class='handle'></div><div class='cover'></div><div class='selected-color'></div></div>",
            link: function (scope, elem, attrs) {
                var handleElem, paletteElem, angle, relativeCenter, absoluteCenter, r;
                init();
                
                function init() {
                    handleElem = elem[0].querySelector('.handle');
                    paletteElem = elem[0].querySelector('.palette');
                    coverElem = elem[0].querySelector('.cover');
                    colorElem = elem[0].querySelector('.selected-color');
                    angle = (scope.hue * 1 / (scope.range || 360)) * (2 * Math.PI) || 0;
                    relativeCenter = {
                        x: paletteElem.clientWidth / 2,
                        y: paletteElem.clientHeight / 2
                    };
                    r = paletteElem.clientWidth / 2 * .8; // 80% of half the width of the pallet
                    moveHandle({
                        x: relativeCenter.x + r * Math.cos(angle),
                        y: relativeCenter.y + r * Math.sin(angle)
                    });
                }

                elem.bind('mousedown', function (e) {
                    e.stopPropagation();
                    if (e.target == coverElem) return; // Don't move if clicked on center area
                    moveHandle({
                        x: e.offsetX,
                        y: e.offsetY
                    });
                    elem[0].addEventListener('mousemove', onMouseMove, false);
                });

                elem.on('mouseup', function () {
                    elem[0].removeEventListener('mousemove', onMouseMove);
                });

                elem.bind('touchmove', function (e) {
                    moveHandle({
                        x: e.touches[0].clientX - paletteElem.getBoundingClientRect().left,
                        y: e.touches[0].clientY - paletteElem.getBoundingClientRect().top
                    })
                });

                function onMouseMove(e) {
                    moveHandle({
                        x: e.offsetX,
                        y: e.offsetY
                    });
                }

                function moveHandle(e) {
                    angle = getAngle(relativeCenter, {
                        x: e.x,
                        y: e.y
                    });
                    handleElem.style.left = relativeCenter.x + r * Math.cos(angle) - handleElem.clientWidth / 2 + 'px';
                    handleElem.style.top = relativeCenter.y + r * Math.sin(angle) - handleElem.clientHeight / 2 + 'px';
                    $timeout();
                    onAngleChange();
                }

                function onAngleChange() {
                    var saturation = 100;
                    var luminosity = 50;
                    var hue = angle * (180 / Math.PI) // Convert angle to degrees
                    hue = hue < 0 ? hue + 360 : hue;
                    var rgbModel = hslToRgb(hue, saturation, luminosity);
                    var color = 'rgb(' + rgbModel.red + ', ' + rgbModel.green + ', ' + rgbModel.blue + ')';
                    colorElem.style['background-color'] = color;
                    scope.hue = hue * 1 / 360 * (scope.range || 360); // Scale back to range, defaults range to 0-360
                    $timeout();
                }
            }
        };


        function getAngle(p1, p2) {
            return Math.atan2(p2.y - p1.y, p2.x - p1.x);
        }

        function hslToHex(h, s, l) {
            var colorModel = hslToRgb(h, s, l);
            return rgbToHex(colorModel.red, colorModel.green, colorModel.blue);
        }

        function rgbToHex(r, g, b) {
            return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        }

        function hslToRgb(h, s, l) {
            var r, g, b;
            h = h / 360;
            s = s / 100;
            l = l / 100;
            if (s === 0) {
                r = g = b = l; // achromatic
            } else {
                var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                var p = 2 * l - q;
                r = _hue2rgb(p, q, h + 1 / 3);
                g = _hue2rgb(p, q, h);
                b = _hue2rgb(p, q, h - 1 / 3);
            }

            return {
                red: Math.round(r * 255),
                green: Math.round(g * 255),
                blue: Math.round(b * 255)
            };
        }

        function _hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }

    });