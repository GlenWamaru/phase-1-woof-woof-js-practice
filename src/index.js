document.addEventListener("DOMContentLoaded", () => {
    const dogBar = document.getElementById("dog-bar");
    const dogInfo = document.getElementById("dog-info");
    const goodDogFilter = document.getElementById("good-dog-filter");
    let filterOn = false;
  
    // Fetch and display all dogs
    function fetchAndDisplayDogs() {
      fetch("http://localhost:3001/pups")
        .then((response) => response.json())
        .then((data) => {
          dogBar.innerHTML = ""; // Clear existing dog bar
          data.forEach((pup) => {
            const span = document.createElement("span");
            span.textContent = pup.name;
            span.addEventListener("click", () => displayDogInfo(pup));
            dogBar.appendChild(span);
          });
        });
    }
  
    // Display detailed dog information
    function displayDogInfo(pup) {
      dogInfo.innerHTML = ""; // Clear existing dog info
  
      const img = document.createElement("img");
      img.src = pup.image;
      img.alt = pup.name;
  
      const h2 = document.createElement("h2");
      h2.textContent = pup.name;
  
      const toggleButton = document.createElement("button");
      toggleButton.textContent = pup.isGoodDog ? "Good Dog!" : "Bad Dog!";
      toggleButton.addEventListener("click", () => toggleGoodness(pup));
  
      dogInfo.appendChild(img);
      dogInfo.appendChild(h2);
      dogInfo.appendChild(toggleButton);
    }
  
    // Toggle dog's goodness status
    function toggleGoodness(pup) {
      pup.isGoodDog = !pup.isGoodDog;
      fetch(`http://localhost:3001/pups/${pup.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isGoodDog: pup.isGoodDog }),
      })
        .then((response) => response.json())
        .then((updatedPup) => {
          displayDogInfo(updatedPup);
          fetchAndDisplayDogs();
        });
    }
  
    // Toggle the filter for good dogs
    function toggleFilter() {
      filterOn = !filterOn;
      goodDogFilter.textContent = filterOn ? "Filter good dogs: ON" : "Filter good dogs: OFF";
      fetchAndDisplayDogs();
    }
  
    goodDogFilter.addEventListener("click", toggleFilter);
  
    // Initial fetch and display of dogs
    fetchAndDisplayDogs();
  });
  