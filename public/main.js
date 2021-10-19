document.addEventListener('DOMContentLoaded', () => {
    const loader = async () => {
        const response = await fetch('/.netlify/functions/display-posts');
        let postData = await response.json();
        postData = postData.data;
        var dynamic = [];
        for (var i = 0; i < postData.length; i++){
            dynamic.push(`
            <div class="post_wrapper">
                <div class='post'>
                    <h2>${postData[i].data.postInfo.title}</h2>
                    <p>${postData[i].data.postInfo.content}</p>
                    <p>${postData[i].ref["@ref"].id}</p> 
                </div>
            </div>`);
        }
        document.querySelector('.post_container').innerHTML = dynamic.join('');
    };
    loader();
})

const addPost= () => {
    const addBtn = document.getElementById('add-btn');
    addBtn.addEventListener('click', async () =>{
        var title = document.querySelector('.input_header').value;
        var content = document.querySelector('.input_content').value;
        const response = await fetch('/.netlify/functions/addpost', {
            method:'post',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            username:'benleem',
            title: title,
            content: content
            })
        });
    });
};
addPost();