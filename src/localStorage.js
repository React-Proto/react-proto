import localforage from 'localforage';

// export const loadState = () => {
//   try {
//     const serializedState = localforage.getItem('state');
//     if (serializedState === null) {
//       return undefined;
//     }
//     return JSON.parse(serializedState);
//   } catch (err) {
//     return undefined;
//   }
// };

export const saveState = (state) => {
  localforage.setItem('state', state).then((value) => value)
  .catch((err) => {
    console.log(err);
  });
};

export const loadState = () => localforage.getItem('state');

// export const loadState = () => {
//   localforage.setItem('state', function (err) {
//     // if err is non-null, we got an error
//   });
// }

// export const loadState = () => {
//   const serializedState = localforage.getItem('state', function (err, value) {
//     // if err is non-null, we got an error. otherwise, value is the value
//     if(err) {
//       return undefined;
//     }
//     return JSON.parse(serializedState);
//   });
// }
