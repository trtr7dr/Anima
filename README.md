# Anima
Transform элементов при их появлении в области видимости.
## Пример
```javascript
var elem = new Anima("#id", px); // px — высота, которую необходимо проскролить для начала анимации
```
```javascript
jQuery(window).scroll(function() {
    elem.signal();
});
```
## CSS
Время и типы анимации задаются правилами CSS.
```css
#id{
transition-timing-function: cubic-bezier(.21,.08,.24,.91);
transition-duration: 0.7s;
-webkit-transition-duration: 0.7s;
-webkit-transition-timing-function: cubic-bezier(.21,.08,.24,.91);
}

## Дополнительные параметры
```javascript
elem.setType('type'); // type — функция для свойства transform ( по умолчанию "translate" )
elem.setVal('px'); // px — параметр для выбранной функции (по умолчанию "0, -50px")
```
## Реальный пример
```javascript
var a = new Anima("#one", 100); // анимация начнется если будут видны 100px от #one
var b = new Anima("#two", 150);
	
a.setVal('0, -100px'); // transform: translate(0, -100px)
b.setType('scale');
b.setVal('1.2'); // scale: (1.2)
	
jQuery(window).scroll(function() {
    a.signal();
    b.signal();
});
```
