# Anima
Transform элементов при их появлении в области видимости.
# Пример
var elem = new Anima("#id", px); // px — высота, которую необходимо проскролить для начала анимации
jQuery(window).scroll(function() {
		elem.signal();
});
# Дополнительные параметры
elem.setType('type'); // type — функция для свойства transform ( по умолчанию "translate" )
elem.setVal('px'); // px — параметр для выбранной функции (по умолчанию "0, -50px")
