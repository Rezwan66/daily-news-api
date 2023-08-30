const handleCategory = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/news/categories');

    const data = await response.json();
    console.log(data.data.news_category);
    const categories = data.data.news_category;

    const tabContainer = document.getElementById('tab-container');

    categories.slice(0,3).forEach(category => {
        const div = document.createElement('div');
        div.innerHTML = `
            <a onclick="handleLoadNews('${category.category_id}')" class="tab tab-lifted">${category.category_name}</a>
        `;
        tabContainer.appendChild(div);
    });
}

const handleLoadNews = categoryId => {
    console.log(categoryId);
}


handleCategory();