document.addEventListener('DOMContentLoaded', () => {
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
                <p>${post[i].data.postInfo.content}</p>
            </div>
            <button class='delete-btn'>Delete This Post</button>
        </div>`);
    }
    document.querySelector('.post-container').innerHTML = posts.join('');
    deletePost();
};

const addPost= () => {
    const addBtn = document.querySelector('.add-btn');
    addBtn.addEventListener('click', async () =>{
        var title = document.querySelector('.input-header').value;
        var content = document.querySelector('.input-content').value;
        const response = await fetch('/.netlify/functions/addpost', {
            method:'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            username:'benleem',
            title: title,
            content: content,
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
        });
    }
}

addPost();