

const loadCteories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url);
    const data = await res.json();
    displaycategories(data.data.news_category);
    displayCategoryNewsDropdown(data.data.news_category);
}

const displaycategories = (categories) => {
    const categoriesContainer = document.getElementById('news-category');

    categories.forEach(categorie => {
        const categorieDiv = document.createElement('li');
        categorieDiv.classList.add('nav-item');
        categorieDiv.innerHTML = `
        <a onclick="loadcategorieDetails('${categorie.category_id}')" class="nav-link" aria-current="page" href="#" >${categorie.category_name} </a>
        `;
        categoriesContainer.appendChild(categorieDiv);
    });

}


const displayCategoryNewsDropdown = (categories) => {
    const dropdownNewsCategory = document.getElementById('dropdown-news-category');

    categories.forEach(categorie => {
        const categorieDiv = document.createElement('option');
        categorieDiv.classList.add('nav-item');
        categorieDiv.innerHTML = `
        <a onclick="loadcategorieDetails('${categorie.category_id}')" class="nav-link" aria-current="page" href="#" >${categorie.category_name} </a>
        `;
        dropdownNewsCategory.appendChild(categorieDiv);
    });

}

const loadcategorieDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    const res = await fetch(url);
    const data = await res.json();

    displayCategoryDetails((data.data));
    displaycategorieDetails((data.data));


    const Categorylength = (data.data.length);
    const categotyLength = document.getElementById('categoty-length');
    categotyLength.innerText = Categorylength;
}


const displaycategorieDetails = categories => {
    console.log(categories)
    const categorieDetails = document.getElementById('categorie-details');
    categories.forEach(categorie => {

        categorieDetails.innerHTML = `
        <h4>News title: ${categorie.title ? categorie.title : 'No Author Name Found'}</h4>
        <p>Author name: ${categorie.author.name ? categorie.author.name : 'No Release Date Found'}</p>
        <p> Total View :
        ${categorie.total_view ? categorie.total_view : 'No view'}
        <span>M</span></p>
        <p>Author Pic: <img src="${categorie.author.img}" class="card-img-top" alt="..."></p>
        `;
    });

}


const displayCategoryDetails = categories => {
    const modalTitle = document.getElementById('cateoryDetailModalLabel');
    modalTitle.textContent = '';
    categories.forEach(category => {
        const categorieDiv = document.createElement('div');
        categorieDiv.classList.add('row');
        categorieDiv.classList.add('bottom');
        categorieDiv.innerHTML = `

   <div class="col-md-4 col-lg-4">
   <img src="${category.thumbnail_url}" class="img-fluid rounded-start" alt="...">
   </div>
   <div class="col-md-8 col-lg-8">
        <div>
            <div class="card-body">
             <h5 class="card-title">
             ${category.title ? category.title : 'No Title Found'}
             </h5>
            <p class="card-text">
            ${category.details ? category.details : 'No details Found'}     
            </p>
        
        <div class="blog-info">
          <div>
             <img src="${category.author.img ? category.author.img : 'No Author Image Found'}" class="rounded-circle" width="45" height="35"  alt="...">
            </div>
         <div class="p-0">
         <p class="">
         ${category.author.name ? category.author.name : 'No Author Name Found'}
         </p>
         <p class="">${category.author.published_date}</p>
            </div>
         <div>
         <p class="ms-5">
         ${category.total_view ? category.total_view : 'No view'}
         <span>M</span></p>
          </div>
         <button  onclick="loadcategorieDetails('${category.category_id}')" href="#" class="btn btn-primary ms-5" data-bs-toggle="modal" data-bs-target="#categorieDetailModal">Show Details</button>
         </div>
          </div>

   </div>
        `;
        modalTitle.appendChild(categorieDiv);
    });

}


loadCteories();
