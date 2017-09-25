# angular-color-wheel
A Simple hue color picker.

![demo](https://github.com/chriswoodle/angular-color-wheel/blob/master/test/demo.png?raw=true)

### Features
* Control can be resized with css.
* Mobile support for use in Cordova (tested in iOS and Android)


## Dependencies
* Angular 1.x
## Usage
Install with Bower
```
bower install angular-color-wheel
```
Add the `droplit.angular-color-picker` module as a dependency to your application module:

```
var app = angular.module('app', ['droplit.angular-color-picker']);
```
Finally, add the directive to your html:
```
<droplit-color-picker hue="hue" range="range"></droplit-color-picker>
```

## Demo/Test
Clone the repo, `bower install` and open `test/index.html` in your browser.

## Contributors
* Chris Woodle
## License
The MIT License