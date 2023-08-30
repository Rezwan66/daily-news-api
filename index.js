const handleCategory = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/news/categories');

    const data = await response.json();
    // console.log(data.data.news_category);
    const categories = data.data.news_category;

    const tabContainer = document.getElementById('tab-container');

    categories.slice(0, 3).forEach(category => {
        const div = document.createElement('div');
        div.innerHTML = `
            <a onclick="handleLoadNews('${category.category_id}')" class="tab tab-lifted">${category.category_name}</a>
        `;
        tabContainer.appendChild(div);
    });
}

const handleLoadNews = async categoryId => {
    // console.log(categoryId);
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`);
    const data = await res.json();
    console.log(data.data);
    const newsByCategory = data.data;

    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = '';

    newsByCategory?.forEach(news => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="card bg-base-100 shadow-xl">
                <figure>
                    <img src="${news?.image_url}" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">
                        ${news.title.slice(0,42)}
                        <div class="badge badge-secondary p-5">${news?.rating?.badge}</div>
                    </h2>
                    <p>
                        ${news.details.slice(0,62)} ...read more
                    </p>
                    <h3 class="italic font-medium">total views: ${news.total_view?news.total_view:"no views"}</h3>
                    <div class="card-footer flex justify-between mt-8">
                        <div class="flex">
                            <div>
                                <div class="avatar online">
                                    <div class="w-14 rounded-full">
                                        <img
                                            src="${news?.author?.img}" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h6>${news?.author?.name?news.author.name:"anonymous"}</h6>
                                <small>${news?.author?.published_date?news.author.published_date:"earlier"}</small>
                            </div>
                        </div>
                        <div class="card-detaild-btn">
                            <button onclick="handleModal('${news._id}')"
                                class="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900">
                                Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        cardContainer.appendChild(div);
    })
}

const handleModal = async newsId => {
    console.log(newsId);
}

handleLoadNews("01");
handleCategory();