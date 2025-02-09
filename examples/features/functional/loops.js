// iterables
const list = [1, 2, 3, 4];
const object = { one: 1, two: 2, three: 3, four: 4 };


// for
(function () {

  console.warn('for');

  for (let i = 0, end = list.length; i < end; i += 1) {
    const element = list[i];
    console.log(element);
  }

})();


// for of
(function () {

  console.warn('for of');

  for (const element of list) {
    console.log(element);
  }

})();


// for in
(function () {

  console.warn('for in');

  for (const key in object) {
    const element = object[key];
    console.log(element);
  }

})();


// while
(function () {

  console.warn('while');

  let index = 0;
  const end = list.length;

  while (index < end) {
    const element = list[index];
    console.log(element);
    index += 1;
  }

})();


// do while
(function () {

  console.warn('do while');

  let index = 0;
  const end = list.length;

  do {
    const element = list[index];
    console.log(element);
    index += 1;
  } while (index < end);

})();


// forEach
(function () {

  console.warn('forEach');

  list.forEach((element) => {
    console.log(element);
  });

})();
