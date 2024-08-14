const proje = document.getElementsByClassName("proje")
const username = 'kkklıc'; // GitHub kullanıcı adınız

async function fetchRepos() {
    try {
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`);
        const repos = await reposResponse.json();
        
        repos.forEach(async repo => {
            const contentsResponse = await fetch(`https://api.github.com/repos/${username}/${repo.name}/contents`);
            const contents = await contentsResponse.json();

            contents.forEach(file => {
                if (file.type === 'file' && file.name.endsWith('.gif')) {
                    displayGif(file.download_url);
                }
            });
        });
    } catch (error) {
        console.error('Hata:', error);
    }
}

function displayGif(url) {
    const img = document.createElement('img');
    img.src = url;
    img.alt = 'GIF';
    proje.appendChild(img);
}

fetchRepos();
