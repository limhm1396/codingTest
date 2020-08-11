async function getMusic(id) {
    try {
        const res = await axios.get(`/music_edit/${id}/lists`);
        const comments = res.data;
        const tbody = document.querySelector('#music-list tbody');
        tbody.innerHTML = '';
        comments.map(function (comment) {
            //셀 추가
            const row = document.createElement('tr');
            let td = document.createElement('td');
            td.textContent = comments.id;
            row.appendChild(td);
            td = document.createElement('td');
            td.textContent = comment.User.name;
            row.appendChild(td);
            td = document.createElement('td');
            td.textContent = comment.comment;
            row.appendChild(td);
            const edit = document.createElement('button');
            edit.textContent = '수정';
            edit.addEventListener('click', function() {
                try {
                    //수정 클릭 시
                    location.href = 'music_edit/musicEdit';
                } catch (err) {
                    console.error(err);
                }
            });
            td = document.createElement('td');
            td.appendChild(edit);
            row.appendChild(td);
        });
    } catch (err) {
        console.error(err);
    }
}