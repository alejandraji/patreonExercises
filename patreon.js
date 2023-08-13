function reduce(array, callback, initialValue) {
  let acc = initialValue;
  for (let i= 0; i < array.length; i++) {
      let curr = array[i];
      acc = callback(acc, curr) 
  }
  return acc;
}

function flatMap(array, callback) {
 let result = [];
 for (const i of array) {
     mapItems = callback(i)
     result.push(...mapItems);
 }
 return result;
}

async function promiseAll(promises) {
  let results = [];
  let resolveCount = 0;
  
  return new Promise((resolve, reject) => {
      promises.forEach((promise, index) => {
          promise.then((result => {
              console.log('test', index, result)
              results[index] = result;
              resolveCount++;
              if(resolveCount === results.length){
                resolve(results);
              }
          })).catch(function (error) {
              reject(error);
          })
      })
  });
};

// Helper functions
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
const mockFetch = async (value) => {
  await sleep(1e3 * Math.random() + 200);
  return value;
};


;(async () => {
  const value1 = { values: [1, 2, 3] };
  const value2 = { values: [4, 5] };
  const value3 = { values: [6, 7, 8] };
  const promises = [mockFetch(value1), mockFetch(value2), mockFetch(value3)];
  const objects = await promiseAll(promises);
  // const objects = [{ values: [1, 2, 3] }, { values: [4, 5] }, { values: [6, 7, 8] }]
  const numbers = flatMap(objects, ({ values }) => values);
  console.log(numbers); // -> [1,2,3,4,5,6,7,8]
  const result = reduce(numbers, (prev, curr) => prev + curr, 0);
  console.log(result, "WTF"); // -> 36
  
})();