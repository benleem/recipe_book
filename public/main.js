document.addEventListener('DOMContentLoaded', () => {
    fetchData();
    addPost();
    fetchData();
})

const fetchData = async () => {
    try {
        console.log("Loading...")
        const response = await fetch('/.netlify/functions/display-posts');
        let postData = await response.json();
        postData = postData.data;
        console.log("Data received");
        loader(postData);
    } catch (err) {
        console.error(err);
    }
};

const loader = async (postData) => {
    const post = postData;
    let posts = [];
    for (var i = post.length - 1; i >= 0; i--){
        posts.push(`
        <div class='post-wrapper'>
            <div class='post' id = '${post[i].ref["@ref"].id}'>
                <h2>${post[i].data.postInfo.title}</h2>
                <p>${post[i].data.postInfo.ingredients}</p>
                <p style='white-space: pre-wrap;'>${post[i].data.postInfo.description}</p>
            </div>
            <button class='delete-btn'>Delete</button>
        </div>`);
    }
    document.querySelector('.post-container').innerHTML = posts.join('');
    deletePost();
};

const addPost= () => {
    const form = document.querySelector('.form-container');
    form.addEventListener('submit', async () =>{
        var title = document.querySelector('#input-title').value;
        var description = document.querySelector('#input-description').value;
        var nodeList = document.querySelectorAll('.ingredient');
        var ingredientList = [];
        for (let i = 0; i < nodeList.length; i++) {
            ingredientList.push(nodeList[i].value);
        }
        const response = await fetch('/.netlify/functions/addpost', {
            method:'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            username:'benleem',
            title: title,
            ingredients: ingredientList,
            description: description,
            })
        });
    });
};

const deletePost = () =>{
    const btnList = document.querySelectorAll('.delete-btn');
    const post = document.querySelectorAll('.post');
    for (let i = 0; i < btnList.length; i++){
        btnList[i].addEventListener('click', async () =>{
            let postId = post[i].id;
            const response = await fetch('/.netlify/functions/deletepost', {
                method:'DELETE',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: postId
                })
            });
            fetchData();
        });
    }
}

const showForm = () =>{
    const showBtn = document.querySelector('.show-btn');
    const form = document.querySelector('.form-container');
    showBtn.addEventListener('click', async () =>{
        form.classList.toggle('active');
        showBtn.classList.toggle('active');
    });
}

showForm();

const ingredients = () =>{
    const container = document.querySelector('.show-ingredients')
    const addBtn = document.querySelector('.add-ingredient');
    const newIngredient = document.querySelector('#input-ingredients');
    let ingredients = [];
    newIngredient.required = true;
    addBtn.addEventListener('click', async () =>{
        newIngredient.required = false;
        ingredients.push(`
        <div class="ingredient-container">
            <input class='ingredient' type="text" value='${newIngredient.value}' required >
            <div class="controls delete">
                <a class="delete-ingredient">
                    <span class="ingredient-bar"></span>
                </a>
            </div>
        </div>`);
        container.innerHTML = ingredients.join('');
        newIngredient.value = ''; 
        deleteIngredient(ingredients, container);
    });
    if (ingredients.length == 0) {
        newIngredient.required = true;
    }
}

const deleteIngredient = (list, wrapper) =>{
    let ingredients = list;
    let container = wrapper;
    var deleteBtn = document.querySelectorAll('.delete-ingredient');
    for (let i = 0; i < ingredients.length; i++) {
        deleteBtn[i].addEventListener('click', async () =>{
            ingredients.splice(i, 1);
            container.innerHTML = ingredients.join('');
            deleteIngredient(ingredients, container);
        });
    }

}

ingredients();