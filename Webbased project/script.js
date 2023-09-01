// Define the shuffleArray function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  // Function to get a random element from an array
  function getRandomElement(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array.splice(randomIndex, 1)[0];
  }
  
  // Rest of your code
  const nameInput = document.getElementById('name');
  const startButton = document.getElementById('startButton');
  const imageFeed = document.getElementById('imageFeed');
  const tickButton = document.getElementById('tickButton');
  const collectDataButton = document.getElementById('collectDataButton');
  
  startButton.addEventListener('click', () => {
    if (nameInput.value !== '') {
      document.getElementById('userInput').style.display = 'none';
      imageFeed.style.display = 'block';
      loadImages();
    }
  });
  
  // Insert "Photo Sharing" header
  const headerElement = document.createElement('h2');
  headerElement.textContent = 'Photo Sharing';
  headerElement.classList.add('header-title');
  imageFeed.appendChild(headerElement);
  
  function loadImages() {
    // Define your image arrays here
    const profileImages = Array.from({ length: 10 }, (_, i) => `pprofile_${i + 1}.jpg`);
    const advertImagesNN = Array.from({ length: 5 }, (_, i) => `nnadvert_${i + 1}.jpg`);
    const advertImagesBL = Array.from({ length: 5 }, (_, i) => `bladvert_${i + 1}.jpg`);
  
    // Shuffle each array independently
    const shuffledProfileImages = shuffleArray(profileImages);
    const shuffledAdvertImagesNN = shuffleArray(advertImagesNN);
    const shuffledAdvertImagesBL = shuffleArray(advertImagesBL);
  
    // Select the required number of images from each shuffled array
    const selectedProfileImages = shuffledProfileImages;
    const selectedAdvertImagesNN = shuffledAdvertImagesNN.slice(0, 5);
    const selectedAdvertImagesBL = shuffledAdvertImagesBL.slice(0, 5);
  
    // Combine the selected images into a single array
    const finalImages = [...selectedProfileImages, ...selectedAdvertImagesNN, ...selectedAdvertImagesBL];
  
    // Shuffle the final array
    const shuffledFinalImages = shuffleArray(finalImages);
  
   shuffledFinalImages.forEach(imagePath => {
  const imgElement = document.createElement('img');
  imgElement.alt = 'Image';
  imgElement.classList.add('image-thumbnail');
  imageFeed.appendChild(imgElement);

  imgElement.onerror = () => {
    // Log an error message or take other actions as needed
    console.error('Failed to load image: ' + imagePath);
    // Skip to the next image if the current one fails to load
    imgElement.remove();
    loadNextImage(shuffledFinalImages);
  };

  // Determine the folder based on the image name and load the image
  if (imagePath.startsWith('pprofile_')) {
    imgElement.src = `profile01/${imagePath}`;
  } else if (imagePath.startsWith('nnadvert_')) {
    imgElement.src = `advertsNoNamePS/${imagePath}`;
  } else if (imagePath.startsWith('bladvert_')) {
    imgElement.src = `advertsNoName/${imagePath}`;
  }
});

// Call loadNextImage outside the forEach loop to ensure it's called after all images are processed
loadNextImage(shuffledFinalImages);
  
    // Show the tick button after the image feed is finished
    tickButton.style.display = 'block';
  }
  
  function loadNextImage(images) {
    if (images.length > 0) {
      const imagePath = images.shift();
      const imgElement = document.createElement('img');
      imgElement.alt = 'Image';
      imgElement.classList.add('image-thumbnail');
      imageFeed.appendChild(imgElement);
  
      imgElement.onerror = () => {
        // Skip to the next image if the current one fails to load
        imgElement.remove();
        loadNextImage(images);
      };
  
      // Determine the folder based on the image name and load the image
      if (imagePath.startsWith('pprofile_')) {
        imgElement.src = `profile01/${imagePath}`;
      } else if (imagePath.startsWith('nnadvert_')) {
        imgElement.src = `advertsNoNamePS/${imagePath}`;
      } else if (imagePath.startsWith('bladvert_')) {
        imgElement.src = `advertsNoName/${imagePath}`;
      }
    }
  }
  // Your existing code here

// Function to update the name overlay on "bladvert_" images
function updateNameOverlayOnBladvertImages() {
    const name = nameInput.value;
  
    // Select all images with class "image-thumbnail" and starting with "bladvert_"
    const bladvertImages = document.querySelectorAll('img.image-thumbnail[src^="advertsNoName/"][src$=".jpg"]');
  
    bladvertImages.forEach(imgElement => {
      const overlay = document.createElement('div');
      overlay.classList.add('name-overlay-bladvert_');
      overlay.textContent = name;
  
      // Position the overlay on the center-right of the image
      const imgRect = imgElement.getBoundingClientRect();
      overlay.style.top = imgRect.top + 'px';
      overlay.style.left = imgRect.right + 'px';
  
      // Append the overlay to the container
      imageFeed.appendChild(overlay);
    });
  }
  
  // Attach an event listener to the name input for real-time updates
  nameInput.addEventListener('input', updateNameOverlayOnBladvertImages);
  
  tickButton.addEventListener('click', () => {
    // After the user clicks the tick button, show the "Collect Data" button
    collectDataButton.style.display = 'block';
  });
  
  