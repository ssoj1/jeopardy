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
  let response = await axios.get(`${BASE_API_URL}categories`,
      { params: { count: 100 },
    });

   // pare down an array of objects to just an array of IDs
  let categoryIds = response.data.map(c => c.id); 

  return _.sampleSize(categoryIds, NUM_CATEGORIES);
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
  let response = await axios.get(`${BASE_API_URL}category`,
      { params: { id: catId },
    });

  let cat = response.data;

  // pare down to just the clue keys that are necessary
  let randomClues = _.sampleSize(cat.clues, NUM_CLUES_PER_CAT).map(clue => {
    return clue = { 
      question : clue.question,
      answer : clue.answer, 
      showing: null, 
    }
  });

  return { title: cat.title, clues: randomClues};
}

/** Fill an HTML table with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <th> for each category
 * - The <tbody> should be filled w/NUM-CLUES_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initially, just show a "?" where the question/answer would go.)
 */

function fillTable() {

  // clear the board if it's already filled
  $(".board thead").empty();
  $(".board tbody").empty();

  // Add row with headers for categories
  let $tr = $("<tr>");
  for (let category of categories) {
    $tr.append($("<th>").text(category.title));
  }
  $(".board thead").append($tr);

  // Add rows with questions for each category
  const $tBody = $(".board tbody");
  $tBody.empty();
  for (let clueIdx = 0; clueIdx < NUM_CLUES_PER_CAT; clueIdx++) {
    let $tr = $("<tr>");
    for (let catIdx = 0; catIdx < NUM_CATEGORIES; catIdx++) {
      $tr.append(
          $("<td>")
              .attr("id", `${catIdx}-${clueIdx}`)
              .append($("<i>").addClass("fas fa-question-circle fa-3x")));
    }
    $tBody.append($tr);
  }
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
  console.log("event.target is ", evt.target)
  
  let $target = $(evt.target);
  let id = $target.attr("id");
  let [catId, clueId] = id.split("-");
  let clue = categories[catId].clues[clueId];

  let msg;

  if (!clue.showing) {
    msg = clue.question;
    clue.showing = "question";
  } else if (clue.showing === "question") {
    msg = clue.answer;
    clue.showing = "answer";
    $target.addClass("disabled");
  } else {
    // already showing answer; ignore
    return;
  }

  // Update text of cell
  $target.html(msg);
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {
  $(".board thead").empty();
  $(".board tbody").empty();
  $(".spinner").show(); 
  $("button").text("Restart");
}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
  $(".spinner").hide(); 
  $(".board").show();
}

/** Setup game data and board:
 * - get random category Ids
 * - get data for each category
 * - call fillTable to create HTML table
 */

async function setupGameBoard() {
  let categoryIds = await getCategoryIds(); // an array of 6 numbers

  categories = []; 
  
  for (let catId of categoryIds) {
    categories.push(await getCategory(catId));
  }

  fillTable(); 
}

/** Start game: show loading state, setup game board, stop loading state */

async function setupAndStart() {
  showLoadingView(); 
  await setupGameBoard(); 
  hideLoadingView(); 
}

/** At start:
 *
 * - Add a click handler to your start button that will run setupAndStart
 * - Add a click handler to your board that will run handleClick
 *   when you click on a clue
 */

$("button").on("click", setupAndStart); 
$(".board").on("click", "td", handleClick);

/*

NEXT COMMIT MESSAGE: 
"additional CSS sytling for the board and "

TO DO: 
Properly capitalize the category titles? or all caps?

*/