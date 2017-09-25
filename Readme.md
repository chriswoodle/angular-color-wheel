# angular-color-wheel
A Simple hue color picker.

![demo](./test/demo.png)

[Check it out on CodePen](https://codepen.io/chriswoodle/pen/MEbqbj)

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

## Docs

The picker is not currently responsive and it's size is set initially with css.

### `range`

Sets the range of the picker `hue` value.  

### `hue`

This is the current value of the picker, between 0 to `range`.

## Demo/Test
Clone the repo, `bower install` and open `test/index.html` in your browser.

## Contributors
* Chris Woodle
## License
The MIT License