function displayPoem(response) {
  console.log("poem generated");
  console.log("Poem response:", response.data.answer);

  const oldPoem = document.querySelector("#poem");
  const newPoem = document.createElement("div");
  newPoem.id = "poem";
  newPoem.className = "poem";
  oldPoem.replaceWith(newPoem);

  const typewriter = new Typewriter(newPoem, {
    autoStart: true,
    delay: 1,
    cursor: "",
  });

  typewriter
    .typeString(response.data.answer)
    .pauseFor(500)
    .typeString(
      '<br><em style="font-size: 0.8em; color: #555;">— SheCodes Sheila AI 🐨</em>'
    )
    .start();
}

function generatePoem(event) {
  event.preventDefault();

  const instructionsInput = document.querySelector("#user-instructions");
  const userTopic = instructionsInput.value.trim();

  const poemElement = document.querySelector("#poem");
  poemElement.classList.remove("hidden");
  poemElement.innerHTML = `<div class="blink">✍️ Generating an Aussie poem about <strong>${instructionsInput.value}</strong>...</div>`;

  const apiKey = "tf950d82b50b8f88a15d0ac93o492d93";
  const prompt = `Generate an Australian poem about ${userTopic}`;
  const context =
    "You are a diverse Australian poetry expert in a variety of genres and love to write short poems. Generate a short poem no longer than a paragraph. Make sure to follow the user instructions.";
  const apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(
    prompt
  )}&context=${encodeURIComponent(context)}&key=${apiKey}`;

  console.log("Generating poem...");
  console.log(`Prompt: ${prompt}`);
  console.log(`Context: ${context}`);

  axios
    .get(apiUrl)
    .then(displayPoem)
    .catch((error) => {
      console.error("Error generating poem:", error);
      poemElement.innerHTML = "❌ Something went wrong. Please try again.";
    });
}

const poemFormElement = document.querySelector("#poem-generator-form");
poemFormElement.addEventListener("submit", generatePoem);
