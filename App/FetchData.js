// const DataAPI = async () => {
//     try {
//       let data = await fetch(
//         "https://sheets.googleapis.com/v4/spreadsheets/1x8q9qTXw4YJiHH47gbZ8Dk3vETyoh6DTJkiml82AUKU/values/2022?valueRenderOption=FORMATTED_VALUE&key=AIzaSyA_6PuMD2rhrUf7ZIqhFwhxRXlfBE5P9i0"
//       );
//       let { values } = await data.json();
//       let [, ...Data] = values.map((data) => data);
//       return values;
//     } catch {
//       console.log("Error");
//     }
//   };
//   export default DataAPI;