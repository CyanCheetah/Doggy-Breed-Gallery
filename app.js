/**
 * @author Sai Tanuj Karavadi
 * @date 10/15/2024
 * @subject Fetch Code Project
 */

const splashScreen = document.getElementById('splash-screen');
const app = document.getElementById('app');
document.addEventListener('DOMContentLoaded', () => {
    fetch('https://dog.ceo/api/breeds/list/all')
        .then(response => response.json())
        .then(data => {
            const breeds = Object.keys(data.message);
            const breedSelect = document.getElementById('breed-select');

            breeds.forEach(breed => {
                const option = document.createElement('option');
                option.value = breed;
                option.text = breed.charAt(0).toUpperCase() + breed.slice(1);
                breedSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching breeds:', error));

    setTimeout(() => {
        const splashScreen = document.getElementById('splash-screen');
        splashScreen.style.opacity = '0'; // Fade out effect
        
        setTimeout(() => {
            splashScreen.style.display = 'none'; // Hide after fade-out
            document.getElementById('app').classList.remove('hidden'); // Show main app
        }, 2000);
    }, 2000); // 2 seconds splash screen
});

document.getElementById('breed-select').addEventListener('change', () => {
    const breedSelect = document.getElementById('breed-select');
    const selectedBreeds = Array.from(breedSelect.selectedOptions).map(option => option.value);
    const subBreedSelect = document.getElementById('sub-breed-select');
    
    subBreedSelect.innerHTML = '<option value="">-- Select Sub-Breed (Optional) --</option>';

    if (selectedBreeds.length === 1) {
        const breed = selectedBreeds[0];
        fetch(`https://dog.ceo/api/breed/${breed}/list`)
            .then(response => response.json())
            .then(data => {
                const subBreeds = data.message;
                
                if (subBreeds.length > 0) {
                    subBreeds.forEach(subBreed => {
                        const option = document.createElement('option');
                        option.value = subBreed;
                        option.text = subBreed.charAt(0).toUpperCase() + subBreed.slice(1);
                        subBreedSelect.appendChild(option);
                    });
                }
            })
            .catch(error => console.error('Error fetching sub-breeds:', error));
    }
});


function fetchImages() {
    const breedSelect = document.getElementById('breed-select');
    const subBreedSelect = document.getElementById('sub-breed-select');
    const selectedBreeds = Array.from(breedSelect.selectedOptions).map(option => option.value);
    const selectedSubBreed = subBreedSelect.value;
    const gallery = document.getElementById('gallery');

    // Clear previous images
    gallery.innerHTML = '';

    selectedBreeds.forEach(breed => {
        let url = `https://dog.ceo/api/breed/${breed}/images`;

        // Check if a sub-breed is selected for a single breed
        if (selectedBreeds.length === 1 && selectedSubBreed) {
            url = `https://dog.ceo/api/breed/${breed}/${selectedSubBreed}/images`;
        }

        // Fetch images for the selected breed/sub-breed
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const images = data.message;
                images.forEach(imgUrl => {
                    const img = document.createElement('img');
                    img.src = imgUrl;
                    gallery.appendChild(img);
                });
            })
            .catch(error => console.error('Error fetching images:', error));
    });
}
const breedBackground = document.getElementById('breed-background');

function handleBreedChange() {
    const selectedOptions = Array.from(document.getElementById('breed-select').selectedOptions);
    if (selectedOptions.length > 0) {
        const selectedBreeds = selectedOptions.map(option => option.value);
        breedBackground.textContent = selectedBreeds[0].charAt(0).toUpperCase() + selectedBreeds[0].slice(1); // Display the first selected breed
    } else {
        breedBackground.textContent = "CyanCheetah"; // Default text if no breed is selected
    }
}
const dogImageElement = document.getElementById('dogImage');
const dogImageUrls = ["https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_10263.jpg",
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_10715.jpg",
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_10822.jpg",
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_1128.jpg",
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_1145.jpg",
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_115.jpg",
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_1150.jpg",
    "https://images.dog.ceo/breeds/hound-ibizan/n02091244_156.jpg",
        "https://images.dog.ceo/breeds/hound-ibizan/n02091244_1635.jpg",
        "https://images.dog.ceo/breeds/hound-ibizan/n02091244_169.jpg",
        "https://images.dog.ceo/breeds/hound-ibizan/n02091244_175.jpg",
        "https://images.dog.ceo/breeds/hound-ibizan/n02091244_177.jpg",
        "https://images.dog.ceo/breeds/hound-ibizan/n02091244_1917.jpg"];

function startImageChange() {
    let currentIndex = 0;

    setInterval(() => {
        dogImageElement.src = dogImageUrls[currentIndex];
        currentIndex = (currentIndex + 1) % dogImageUrls.length; // Loop back to the start
    }, 48); // Change every 40 milliseconds

    setTimeout(() => {
        splashScreen.style.opacity = 0;
        setTimeout(() => {
            splashScreen.style.display = 'none'; // Hide after fade-out
        }, 2000); // Adjust fade-out time
    }, 10000); // Duration for splash screen display
}
startImageChange()
