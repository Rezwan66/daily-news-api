let isSorted = false; // track is sorted
let currentCategoryId = null;

const handleCategory = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/news/categories');

    const data = await response.json();
    // console.log(data.data.news_category);
    const categories = data.data.news_category;

    const tabContainer = document.getElementById('tab-container');
    tabContainer.textContent = '';

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
    currentCategoryId = categoryId;
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${currentCategoryId}`);
    const data = await res.json();
    const newsByCategory = data.data;
    console.log(newsByCategory);
    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = '';

    // sorting logic for the newsByCategory array
    if (isSorted) {
        newsByCategory.sort((a, b) => {
            const dateA = new Date(a.author.published_date);
            const dateB = new Date(b.author.published_date);
            return dateB - dateA;
        });
    }
    console.log(newsByCategory);
    newsByCategory?.forEach(news => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="card bg-base-100 shadow-xl">
                <figure>
                    <img src="${news?.image_url}" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">
                        ${news.title.slice(0, 42)}
                        <div class="badge badge-secondary p-5">${news?.rating?.badge}</div>
                    </h2>
                    <p>
                        ${news.details.slice(0, 62)} <span onclick="handleModal('${news._id}')" class="text-primary cursor-pointer">...read more</span>
                    </p>
                    <h3 class="italic font-medium">total views: ${news.total_view ? news.total_view : "no views"}</h3>
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
                                <h6>${news?.author?.name ? news.author.name : "anonymous"}</h6>
                                <small>${news?.author?.published_date ? news.author.published_date : "earlier"}</small>
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
    // console.log(newsId);

    const res = await fetch(`https://openapi.programming-hero.com/api/news/${newsId}`);
    const data = await res.json();
    console.log(data.data[0]);
    const details = data.data[0];

    const modalContainer = document.getElementById('modal-container');
    const div = document.createElement('div');
    div.innerHTML = `
        <dialog id="news_details_modal" class="modal modal-bottom sm:modal-middle">
            <form method="dialog" class="modal-box">
                <figure><img src="${details?.image_url}" /></figure>
                <h3 class="font-bold text-lg">${details.title}</h3>
                <span class="badge badge-primary p-5">${details?.others_info?.is_trending === true ? 'TRENDING' : ''}</span>
                <p class="py-4 italic">by ${details?.author?.name ? details.author.name : "anonymous"} on ${details?.author?.published_date ? details.author.published_date : "earlier"}</p>
                <p class="py-4">${details.details}</p>
                <div class="modal-action">
                    <button class="btn">Close</button>
                </div>
            </form>
        </dialog>
    `
    modalContainer.appendChild(div);
    const modal = document.getElementById('news_details_modal');
    modal.showModal();
}

const handleSort = () => {
    isSorted = !isSorted;
    handleLoadNews(currentCategoryId);
    console.log(isSorted);
}

handleLoadNews("01");
handleCategory();