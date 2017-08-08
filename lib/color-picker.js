angular.module('droplit.angular-color-picker', [])
    .directive('droplitColorPicker', colorPicker);
function colorPicker($document, $window, $compile) {
    var directive = {
        restrict: 'E',
        scope: {
            value: '='
        },
        template: "<div class='palette'><div class='dot'></div><div class='cover'></div></div>",
        link: function (scope, elem, attrs) {
            var angle = 0;
            angular.element(document).bind('mousedown', function () {
                console.log('clicked on document');
            });
            var center = {
                x: elem[0].offsetLeft + elem[0].querySelector('.palette').clientWidth / 2,
                y: elem[0].offsetTop + elem[0].querySelector('.palette').clientHeight / 2
            }
            var r = elem[0].querySelector('.palette').clientWidth / 2 * .8; // 80%

            elem.bind('mousedown', function (e) {
                e.stopPropagation();
                console.log(e);
                if (e.target == elem[0].querySelector('.cover')) return;
                console.log('clicked on directive');
                console.dir(elem[0].querySelector('.palette'));
                console.log(elem[0].querySelector('.palette').clientHeight, elem[0].querySelector('.palette').clientWidth);
                console.log(elem[0].offsetLeft, elem[0].offsetTop, e.x, e.y)

                console.log(r);
                var angle = getAngle(center, {
                    x: e.x,
                    y: e.y
                })
                // x = cx + r * cos(a)
                // y = cy + r * sin(a)
                // elem[0].querySelector('.dot').style.left = e.x - elem[0].offsetLeft;
                // elem[0].querySelector('.dot').style.top = e.y - elem[0].offsetTop;

                elem[0].querySelector('.dot').style.left = elem[0].querySelector('.palette').clientWidth / 2 + r * Math.cos(angle) - elem[0].querySelector('.dot').clientWidth / 2;
                elem[0].querySelector('.dot').style.top = elem[0].querySelector('.palette').clientHeight / 2 + r * Math.sin(angle) - elem[0].querySelector('.dot').clientWidth / 2;
                console.log(getAngle(center, {
                    x: e.x,
                    y: e.y
                }));
                elem[0].addEventListener(
                    'mousemove',
                    moveDot,
                    false
                );
            });
            elem.on('mouseup', endAction);
            // elem.on('mouseleave', endAction)
            elem.bind('touchmove', function (e) {
                // console.log(e);
                var angle = getAngle(center, {
                    x: e.touches[0].clientX,
                    y: e.touches[0].clientY
                })
                elem[0].querySelector('.dot').style.left = elem[0].querySelector('.palette').clientWidth / 2 + r * Math.cos(angle) - elem[0].querySelector('.dot').clientWidth / 2;
                elem[0].querySelector('.dot').style.top = elem[0].querySelector('.palette').clientHeight / 2 + r * Math.sin(angle) - elem[0].querySelector('.dot').clientWidth / 2;
            });
            function endAction() {
                console.log("yo");
                elem[0].removeEventListener(
                    'mousemove',
                    moveDot
                );
            }
            function moveDot(e) {
                var angle = getAngle(center, {
                    x: e.x,
                    y: e.y
                })
                elem[0].querySelector('.dot').style.left = elem[0].querySelector('.palette').clientWidth / 2 + r * Math.cos(angle) - elem[0].querySelector('.dot').clientWidth / 2;
                elem[0].querySelector('.dot').style.top = elem[0].querySelector('.palette').clientHeight / 2 + r * Math.sin(angle) - elem[0].querySelector('.dot').clientWidth / 2;
            }
        }
    };
    this.dragging = {
        active: false,
        value: 0,
        difference: 0,
        position: 0,
        lowLimit: 0,
        highLimit: 0
    };

    function getAngle(p1, p2) {
        // var angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
        // return angle > 0 ? angle : angle + 360;
        var angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
        return angle;
    }


    function onRotatorDrag(angle) {
        var saturation = 100;
        var luminosity = 50;
        var alpha = 1;
        var color = 'hsla(' + angle + ', ' + saturation + '%, ' + luminosity + '%, ' + alpha + ')';
        var rgbModel = ColorPickerService.hslToRgb(angle, saturation, luminosity);
        var hexModel = ColorPickerService.hslToHex(angle, saturation, luminosity);

        colorSel.style.backgroundColor = color;
        ripple.style.borderColor = color;

        vm.angle = angle;
        vm.selectedColor = {
            hex: hexModel,
            hsla: {
                hue: angle,
                saturation: saturation,
                luminosity: luminosity,
                alpha: alpha
            },
            rgba: {
                red: rgbModel.red,
                green: rgbModel.green,
                blue: rgbModel.blue,
                alpha: alpha
            }
        };
    }
    return directive;
}