# Anima
Transform элементов при их появлении в области видимости.
## Пример
```javascript
var elem = new Anima("#id", px);// px — высота, которую необходимо проскролить для начала анимации
```
```javascript
jQuery(window).scroll(function() {
    elem.signal();
});
```
## setTransform(css)
Для добавления нескольких свойств при анимации, используйте setTransform.
```javascript
    elem.setTransform('translate(0px, -50px) scale(1.1)'); //поднять и увеличить элемент
```
## CSS
Время и типы анимации задаются правилами CSS (или с помощью .setCss(time, type) ). Пример css правил:
```css
#id{
    transition-timing-function: cubic-bezier(.21,.08,.24,.91);
    transition-duration: 0.7s;
    -webkit-transition-duration: 0.7s;
    -webkit-transition-timing-function: cubic-bezier(.21,.08,.24,.91);
}
```
Для более плавной анимации с прозрачностью можно присвоить "opacity" в css
```css
#id{
   opacity: 0;
}
```
## Дополнительные параметры
```javascript
elem.setType('type');// type — функция для свойства transform ( по умолчанию "translate" )
elem.noOpacity();// отключение плавного добавления непрозрачности
elem.setCss();// установка дефолтных значений css (cubic-bezier(.21,.08,.24,.91) продолжительностью 0.7 сек)
elem.setCss('0.3','ease-in');// установка собственных css правил для анимации
elem.setVal('px');// px — параметр для выбранной функции (по умолчанию "0, -50px")
```
## Реальный пример
```javascript
var a = new Anima("#one", 100); // анимация начнется если будут видны 100px от #one
var b = new Anima("#two", 150);
var c = new Anima("#three", 0);
	
a.setVal('0, -100px');// transform: translate(0, -100px)
b.setType('scale');
b.setVal('1.2');// scale: (1.2)
c.setTransform('translate(0px, -50px) scale(1.1)');

b.go();// запуск анимации сразу после загрузки страницы	
jQuery(window).scroll(function() {
    a.signal();// запуск, согласно ранее установленным правилам
    c.go(); //как только страница начнет скроллиться
});
```
