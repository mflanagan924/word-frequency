var buttonTexts = {
  startRecording: {
    "en-US": "Start Recording",
    "fr-FR": "Commencer l'enregistrement"
  },
  pauseRecording: {
    "en-US": "Pause Recording",
    "fr-FR": "Pause d'enregistrement"
  },
  // Add other button texts in different languages if needed
};


// Function to update the button text based on the selected language
function updateButtonLabels(language) {
  var buttons = document.querySelectorAll("button");

  buttons.forEach(function(button) {
    var buttonId = button.id;

    // Check if the button text is defined for the selected language
    if (buttonTexts.hasOwnProperty(buttonId) && buttonTexts[buttonId].hasOwnProperty(language)) {
      button.textContent = buttonTexts[buttonId][language];
    } else {
      // If the button text is not defined for the selected language, use the default English text
      button.textContent = buttonTexts[buttonId]["en-US"];
    }
  });
}



// Create a new instance of the speech recognition object
var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;

function languageChange() {
  var languageSelect = document.getElementById("language-select");
  var selectedLanguage = languageSelect.value;
  console.log(selectedLanguage);
recognition.lang = selectedLanguage; // Set the languages to English (United States) and French (France)

// Update main title
var mainTitle = document.getElementById("main-title");
updateTextContent(mainTitle, selectedLanguage, {
  "en-US": "Word Frequency Chart",
  "fr-FR": "Graphique de fréquence des mots"
});

//update recording button
var recordingButton = document.getElementById("myButton");
updateTextContent(recordingButton, selectedLanguage, {
  "en-US": "Record",
  "fr-FR": "Enregistrer"
});

//update reset transcript button
var resetTranscriptButton = document.getElementById("reset-transcript");
updateTextContent(resetTranscriptButton, selectedLanguage, {
  "en-US": "Reset Transcript",
  "fr-FR": "Réinitialiser la transcription"
});

//update count words button
var coundWordsButton = document.getElementById("countWordsButton");
updateTextContent(coundWordsButton, selectedLanguage, {
  "en-US": "Count Words",
  "fr-FR": "Compter les mots"
});

//update reset table button
var resetTableButton = document.getElementById("resetTableButton");
updateTextContent(resetTableButton, selectedLanguage, {
  "en-US": "Reset Table",
  "fr-FR": "Réinitialiser le tableau"
});

//update export button
var exportButton = document.getElementById("exportButton");
updateTextContent(exportButton, selectedLanguage, {
  "en-US": "Export as CSV",
  "fr-FR": "Exporter en CSV"
});

// Update instruction text
var instructionText = document.getElementById("instruction-text");
updateTextContent(instructionText, selectedLanguage, {
  "en-US": "You can use this word frequency counter to show the frequency of the words that you say.",
  "fr-FR": "Vous pouvez utiliser ce compteur de fréquence des mots pour afficher la fréquence des mots que vous prononcez."
});

// Update directions text
var directionsText = document.getElementById("directions-text");
updateTextContent(directionsText, selectedLanguage, {
  "en-US": "Directions:",
  "fr-FR": "Instructions :"
});

// Update direction list items
var directionsListItems = document.querySelectorAll("#directions-list li");
updateTextContent(directionsListItems[0], selectedLanguage, {
  "en-US": "Press \"Record\" to record your voice. You will know that it is recording as the button will be blinking red.",
  "fr-FR": "Appuyez sur \"Enregistrer\" pour enregistrer votre voix. Vous saurez qu'il enregistre car le bouton clignotera en rouge."
});
updateTextContent(directionsListItems[1], selectedLanguage, {
  "en-US": "Press the same button again to pause.",
  "fr-FR": "Appuyez à nouveau sur le même bouton pour mettre en pause."
});
updateTextContent(directionsListItems[2], selectedLanguage, {
  "en-US": "Press \"Count Words\" to create a frequency table of the words you said.",
  "fr-FR": "Appuyez sur \"Compter les mots\" pour créer un tableau de fréquence des mots que vous avez prononcés."
});
updateTextContent(directionsListItems[3], selectedLanguage, {
  "en-US": "If you want to either reset the input or the table, press the corresponding \"Reset\" buttons.",
  "fr-FR": "Si vous souhaitez réinitialiser l'entrée ou le tableau, appuyez sur les boutons \"Réinitialiser\" correspondants."
});



// Perform any additional logic or actions based on the selected language
}
// Call the languageChange() function initially to set the button text in English
languageChange();
function updateTextContent(element, language, translations) {
var translation = translations[language];
element.textContent = translation || "";

}

// Get the input field element
var transcriptInput = document.getElementById('transcript-input');

// Variable to keep track of the final transcript
var finalTranscript = '';

// Variable to keep track of listening state
var isListening = false;

// Event handler for when the recognition starts
recognition.onstart = function() {
  console.log('Speech recognition started...');
}

// Event handler for when the recognition ends
recognition.onend = function() {
  console.log('Speech recognition ended.');
  if (isListening) {
    recognition.start(); // Restart the recognition if still listening
  }
}

// Event handler for when the recognition results are available
recognition.onresult = function(event) {
  var interimTranscript = '';

  // Loop through the results
  for (var i = event.resultIndex; i < event.results.length; ++i) {
    // Get the transcript and confidence level of each result
    var transcript = event.results[i][0].transcript;
    var confidence = event.results[i][0].confidence;

    // Check if the result is final or interim
    if (event.results[i].isFinal) {
      finalTranscript += transcript + ' '; // Concatenate the new final transcript
    } else {
      interimTranscript += transcript;
    }
  }

  // Update the value of the input field with the final transcript
  transcriptInput.value = finalTranscript + interimTranscript;
  resizeInput(); // Adjust the input field height based on content


}



let myButton = document.getElementById("myButton");
myButton.addEventListener("click", function() {
  myButton.classList.toggle('clicked');
  toggleListening(selectedLanguage); // Pass the selectedLanguage parameter to the toggleListening function
});

  // Get the button element
  var button = document.getElementById('myButton');

// Function to toggle the listening state and update the button text
function toggleListening(language) {
  if (isListening) {
    recognition.stop();
    isListening = false;
  } else {
    recognition.start();
    isListening = true;
  }
}


  //resets the transcript
  function resetTranscript() {
    finalTranscript = "";
    transcriptInput.value = "";
  }
  

// Get the input field element
var transcriptInput = document.getElementById('transcript-input');



// Function to adjust the input field size based on content
function resizeInput() {
  transcriptInput.style.height = 'auto'; // Reset the height to auto
  transcriptInput.style.height = transcriptInput.scrollHeight + 'px'; // Set the height based on content

}

// Resize the input field initially and on window resize
resizeInput();
window.addEventListener('resize', resizeInput);

// Enable resizing for the input box
transcriptInput.style.resize = 'both';

// Get the stored frequency object from local storage, or create an empty object if it doesn't exist
let frequency = JSON.parse(localStorage.getItem("frequency")) || {};
      
function countWords() {
// Get the input text
const input = document.getElementById("transcript-input").value;

// Call the wordFrequency function to get the frequency object for the new text
const newFrequency = wordFrequency(input);

// Merge the new frequency object with the current frequency object
for (let word in newFrequency) {
if (frequency[word]) {
frequency[word] += newFrequency[word];
} else {
frequency[word] = newFrequency[word];
}
}

// Calculate the total number of words
let total = 0;
  for (let word in frequency) {
    total += frequency[word];
  }

// Create an HTML table to display the results


let tableHtml = "<table><thead><tr><th>abc</th><th>#</th><th>%</th></tr></thead><tbody>";

// Convert the frequency object to an array of word-count pairs
const frequencyArray = Object.entries(frequency);

// Sort the array by count in descending order
frequencyArray.sort((a, b) => b[1] - a[1]);


// Iterate over the sorted array and add each pair to the table
for (let i = 0; i < frequencyArray.length; i++) {
const word = frequencyArray[i][0];
    const count = frequencyArray[i][1];
    const percentage = count / total * 100;
    tableHtml += `<tr><td>${word}</td><td>${count}</td><td>${percentage.toFixed(2)}%</td></tr>`;
}
tableHtml += "</tbody></table>";

// Display the results in the output div
document.getElementById("output").innerHTML = tableHtml;
// Update the export button visibility
toggleExportButton();
console.log(frequencyArray.length)
}








function wordFrequency(str) {
// Remove all non-word characters (including digits) and convert to lowercase
str = str.replace(/[^a-zA-Z\s]/g, '').toLowerCase();        

// Split the string into an array of words
const words = str.split(/\s+/);

// Create an object to store the frequency of each word
const frequency = {};

// Loop through the array of words
for (let i = 0; i < words.length; i++) {
// Check if the current word is not an empty string
if (words[i].length > 0) {
// If the word is not yet in the frequency object, add it with a count of 1
if (!frequency[words[i]]) {
  frequency[words[i]] = 1;
} else {
  // Otherwise, increment the count for that word
  frequency[words[i]]++;
}
}
}

// Return the frequency object
return frequency;
}


function resetTable() {
  // Clear the stored frequency object and local storage

  frequency = {};
  localStorage.removeItem("frequency");
  
  // Clear the contents of the output div
  document.getElementById("output").innerHTML = "";
      // Clear the contents of the input textarea
      document.getElementById("transcript-input").value = "";
      // Update the export button visibility
toggleExportButton();
}


function exportTableToCSV(filename) {
  var csv = [];
  var rows = document.querySelectorAll("table tr");
  
  for (var i = 0; i < rows.length; i++) {
      var row = [], cols = rows[i].querySelectorAll("td, th");
      
      for (var j = 0; j < cols.length; j++) {
          row.push(cols[j].innerText);
      }
      
      csv.push(row.join(","));
  }

  var csvFile = new Blob([csv.join("\n")], {type: "text/csv"});
  var downloadLink = document.createElement("a");
  downloadLink.download = filename;
  downloadLink.href = window.URL.createObjectURL(csvFile);
  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);
  downloadLink.click();
}

function toggleExportButton() {
  var exportButton = document.getElementById("exportButton");
  if (isTableVisible()) {
    exportButton.classList.add("show");
  } else {
    exportButton.classList.remove("show");
  }
}

function isTableVisible() {
  var table = document.getElementById("output").querySelector("table");
  return table && table.innerHTML.trim() !== "";
}

