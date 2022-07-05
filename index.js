// Список курсов
let courses = [
  { name: "Courses in England", prices: [0, 100] }, 
  { name: "Courses in Germany", prices: [500, null] }, 
  { name: "Courses in Italy", prices: [100, 200] }, 
  { name: "Courses in Russia", prices: [null, 400] },
  { name: "Courses in China", prices: [50, 250] },
  { name: "Courses in USA", prices: [200, null] },
  { name: "Courses in Kazakhstan", prices: [56, 324] },
  { name: "Courses in France", prices: [null, null] },
];

// Варианты цен (фильтры), которые ищет пользователь
let requiredRange1 = [null, 200]; // от 0 до 200
let requiredRange2 = [100, 350]; // от 100 до 350
let requiredRange3 = [200, null]; // от 200 до Бесконечности

// Судя из ТЗ диапазон цены курса должен СТРОГО лежать внутри диапазона фильтра
// Касательно курса "Courses in France": он не имеет установленных МИН/МАХ цены
// Поэтому мной было принято решение добавить такой вариант в качестве исключения.
// Из моих соображений подобные курсы могут подойти под любой запрос цен 

function arrayHandle(coursesList, minPrice, maxPrice) {
// Сделаем копию исходного массива для дальнейшей обработки:
  let newArray = coursesList.slice();

// Логически подразумевается в массиве интервал цены "от - до", сл-но
// Если null в цене "от", то он равен 0
// Если null в цене "до", то он равен Infinity
  newArray.map(
    course => (
                course.prices[0] === null ? (course.prices[0] = 0, course) : course,
                course.prices[1] === null ? (course.prices[1] = Infinity, course) : course
              )
  );

// Аналогично для фильтра
  minPrice === null ? minPrice = 0 : minPrice = minPrice;
  maxPrice === null ? maxPrice = Infinity : maxPrice = maxPrice;

// Вернём массив курсов, удовлетворяющих условиям фильтра 
  newArray = newArray.filter(
    course => course.prices[0] >= minPrice && course.prices[0] <= maxPrice 
              &&
              course.prices[1] >= minPrice && course.prices[1] <= maxPrice
              ||
              course.prices[0] === 0 && course.prices[1] === Infinity // Исключение
  );

// Отсортируем отфильтрованный по возрастанию мин цены массив
  newArray = newArray.sort( (course1, course2) => course1.prices[0] - course2.prices[0] );

  return (
    console.log('\nОтсортированные подходящие курсы для фильтра с ценами от ', minPrice, ' до ', maxPrice, ':'),
    newArray
  );
};

console.log( arrayHandle(courses, requiredRange1[0], requiredRange1[1]) )
console.log( arrayHandle(courses, requiredRange2[0], requiredRange2[1]) )
console.log( arrayHandle(courses, requiredRange3[0], requiredRange3[1]) )
