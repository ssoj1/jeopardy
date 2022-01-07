const BASE_API_URL = "http://jservice.io/api/";
const NUM_CATEGORIES = 6;
const NUM_CLUES_PER_CAT = 5;

// categories is the main data structure for the app; it should eventually look like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: "4", showing: null},
//        {question: "1+1", answer: "2", showing: null}, ... 3 more clues ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null}, ...
//      ],
//    }, ...4 more categories ...
//  ]

let categories = [];


/** Get NUM_CATEGORIES random categories from API.
 *
 * Returns array of category ids, e.g. [4, 12, 5, 9, 20, 1]
 */

async function getCategoryIds() {
  // get 100 categories from the API
  let response = await axios
    .get(`${BASE_API_URL}categories`,
      { params: { count: 100 } }
    );

  // randomly select NUM_CATEGORIES from the returned 100
  let categories = _.sampleSize(response.data, NUM_CATEGORIES);

  // pare down an array of objects to just an array of IDs
  let categoryIds = categories.map(cat => {return cat.id});

  return categoryIds;
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ... 3 more ...
 *   ]
 */

async function getCategory(catId) {
  let response = await axios
    .get(`${BASE_API_URL}category`,
      { params: { id: `${catId}` } }
    );

  // remove keys from clue array that aren't necessary
  let randomClues = response["clues"].map(clue => {
    return clue = { 
      question : clue.question,
      answer : clue.answer, 
      showing: null 
    }

  });

  return { title: response.data.title, clues: randomClues};
}

/** Fill an HTML table with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM-CLUES_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initially, just show a "?" where the question/answer would go.)
 */

function fillTable() {
  // could create variables like $newQuestion that's a tr with a td
  let $newCategory = $("<tr>").append("<td>");

  // Select the container and append the table, then thead and body: 
  $(".container")
    .append("<table>")
    .addClass("table");

  $("<thead>")
    .appendTo(".table")
    .addClass("tableHead");

  $("<tbody>")
    .appendTo(".table")
    .addClass("tableBody");

  // create a tr with a td for each category
  for (let i = 0; i < NUM_CATEGORIES; i++) {
    $("thead").append("<tr>").append("<td>");
  }

  // create a NUM_CLUES_PER_CAT trs for each category 
  for (let i = 0; i < NUM_CLUES_PER_CAT; i++) {

  }

  // <table> 
  //   <thead>
  //   </thead>
  //   <tbody>
  //   </tbody>
  // </table>

  // create a loop and append 

  // <table> 
  //   <thead>
  //     <tr>
  //       <td></td>
  //       <td></td>
  //       <td></td>
  //       <td></td>
  //       <td></td>
  //       <td></td>
  //     </tr>
  //   </thead>
  //   <tbody>
  //     <tr>
  //       <td></td>
  //     </tr>
  //     <tr>
  //       <td></td>
  //     </tr>
  //     <tr>
  //       <td></td>
  //     </tr>
  //     <tr>
  //       <td></td>
  //     </tr>
  //     <tr>
  //       <td></td>
  //     </tr>
  //   </tbody>
  // </table>




}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {

}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
}

/** Setup game data and board:
 * - get random category Ids
 * - get data for each category
 * - call fillTable to create HTML table
 */

async function setupGameBoard() {
}

/** Start game: show loading state, setup game board, stop loading state */

async function setupAndStart() {
}

/** At start:
 *
 * - Add a click handler to your start button that will run setupAndStart
 * - Add a click handler to your board that will run handleClick
 *   when you click on a clue
 */

// ADD THOSE THINGS HERE
