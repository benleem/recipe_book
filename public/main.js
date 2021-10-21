document.addEventListener('DOMContentLoaded', () => {
    const loader = async () => {
        const response = await fetch('/.netlify/functions/display-posts');
        let postData = await response.json();
        postData = postData.data;
        let dynamic = [];
        for (var i = postData.length - 1; i >= 0; i--){
            dynamic.push(`
            <div class='post-wrapper'>
                <div class='post'>
                    <h2>${postData[i].data.postInfo.title}</h2>
                    <p>${postData[i].data.postInfo.content}</p>
                    <p class='post-id'>${postData[i].ref["@ref"].id}</p> 
                </div>
                <button class='delete-btn'>Delete This Post</button>
            </div>`);
        }
        document.querySelector('.post-container').innerHTML = dynamic.join('');
        deletePost();
    };
    loader();
})

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
    const postInfo = document.querySelectorAll('.post-id');
    for (let i = 0; i < btnList.length; i++){
        btnList[i].addEventListener('click', async () =>{
            let postId = postInfo[i].innerHTML;
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