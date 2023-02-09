let addToy = false;

// GET request

fetch("http://localhost:3000/toys").then((resp) => resp.json()).then((objArray) => {
  renderToys(objArray);
});



const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyFormContainer.style.display = "block";
  } else {
    toyFormContainer.style.display = "none";
  }
});

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0
  }

  fetch("http://localhost:3000/toys", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  })
    .then((resp) => resp.json())
    .then((obj) => {
      renderToys([obj]); // reuse the renderToys, but make obj an array first
      console.log([obj]);
    })
})




function renderToys(objArray) {
  objArray.forEach(obj => {
    const div = document.createElement('div');
    div.className = "card";

    const h2 = document.createElement('h2');
    h2.textContent = obj.name;
    div.append(h2);

    const img = document.createElement('img');
    img.src = obj.image;
    img.className = "toy-avatar";
    div.append(img);

    const p = document.createElement('p');
    p.textContent = obj.likes.toString() + " likes";
    div.append(p);

    const button = document.createElement('button');
    button.className = "like-btn";
    button.id = obj.id.toString();
    button.innerHTML = "Like ❤️";
    div.append(button);

    

    // watch likes
    button.addEventListener('click', (e) => {
      const str = e.target.previousSibling.textContent;
      // i couldn't find a better way to access within scope.  take element and remove " likes" at end
      let count = parseInt(str.substring(0, p.textContent.length - 6)); 
      let newLikeCount = count+ 1;
      p.textContent = newLikeCount.toString() + " likes";
      updateLikes(obj, newLikeCount);

    })
    

    document.querySelector('#toy-collection').append(div);
  })
}


function updateLikes(obj, newLikeCount) {
  fetch(`http://localhost:3000/toys/${obj.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": newLikeCount
    })
  }).then(resp => resp.json())
    .then((newObj) => {
      console.log(newObj.likes)
      //obj.likes += 1

    })
}









