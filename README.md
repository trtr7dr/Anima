# Demo
https://gloagent.ru/category/blog/web/anima.html — так странно и неправильно, что стильно и прекрасно.
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
## setTransform(css)
Для добавления нескольких свойств при анимации, используйте setTransform.
```javascript
    elem.setTransform('translate(0px, -50px) scale(1.1)'); // поднять и увеличить элемент
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
elem.setType('type'); // type — функция для свойства transform ( по умолчанию "translate" )
elem.noOpacity(); // отключение плавного добавления непрозрачности
elem.setCss(); // установка дефолтных значений css (cubic-bezier(.21,.08,.24,.91) продолжительностью 0.7 сек)
elem.setCss('0.3','ease-in'); // установка собственных css правил для анимации
elem.setVal('px'); // px — параметр для выбранной функции (по умолчанию "0, -50px")
elem.setX(x); //смещение по иксу для функции anima
elem.setY(y); //смещение по игрику для функции anima
elem.addSpan(type); //анимация букв/слов (char/word)
elem.spanCss(transform, transition, coef); //как setCss, но для анимации букв. Coef — плавность изменения времени (рекомендуемые параметры 5-10)
elem.vCss(transform, transition); //параметры для vanima
```
## Реальный пример
```javascript
var a = new Anima("#one", 100); // анимация начнется если будут видны 100px от #one
a.setVal('0, -100px'); // transform: translate(0, -100px)

var b = new Anima("#two", 150);
b.setVal('1.2'); // scale: (1.2)
b.setType('scale');
b.go(); // запуск анимации сразу после загрузки страницы

var c = new Anima("#three", 0);
c.setTransform('translate(0px, -50px) scale(1.1)');

var d = new Anima("#four", 0); 
d.setCss();
d.noOpacity();
d.setBack(10); //скорость смещения пикселей фона (по умолчантю 15). Обратите внимание на швы фона.

var z = new Anima("#six", 400); // рекомендуется настроить transition
z.setXY(500, -100); //параметры смещения

var s = new Anima("#seven", 100); //анимация текстового блока
s.addSpan('word'); //санимировать слова
s.spanCss(); //с дефолтными стилями

var v = new Anima("#id8", 300); 
v.vCss('skewY(-10deg)', 'all 0.9s cubic-bezier(0.6, 0, 0.6, 1) 0.07s');
	
jQuery(window).scroll(function() {
    a.signal(true); // запуск, согласно ранее установленным правилам. С параметром true — повторять при "наблюдении" элементы
    c.go(); // как только страница начнет скроллиться
    d.signal_back('x'); //смещать background по оси икс
    z.anima(100); // При скролле 100 пикселей сместить элемент вправо на 500пх и вверх на 100пх
    s.sspan(true); //повторять при "наблюдении" элементы
    v.vanima(); //повторять параметры заданные в vCss при "наблюдении" элемента
});
```
