'use strict';

  const titleClickHandler = function(event){
    event.preventDefault();
    
    const clickedElement = this;
    console.log('Link was ckliced');

  /* remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

for(let activeLink of activeLinks){
  activeLink.classList.remove('active');
}

  /* add class 'active' to the clicked link */
  
    clickedElement.classList.add('active');
     
  console.log('clickedElement:', clickedElement);

  /* remove class 'active' from all articles */
  
  const activeArticles = document.querySelectorAll('.post.active');

for(let activeArticle of activeArticles){
  activeArticle.classList.remove('active');
}

  /* get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  
  console.log('articleSelector');
   


  /* find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);
    console.log('targetArticle');

  /* add class 'active' to the correct article */

  targetArticle.classList.add('active');

  const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){

  /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    function clearMessages(){
        document.getElementById('id').innerHTML = 'optTitleListSelector';
    }
  /* for each article */
    const articles = document.querySelectorAll(optArticleSelector);
    for(let article of articles){
       article. 
    }

    /* get the article id */
    const articleId = clickedElement.getAttribute('id');

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* get the title from the title element */

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId '"><span>' + articleTitle '</span></a></li>';

    /* insert link into titleList */
    titleList.innerHTML = titleList.innerHTML + linkHTML;

}

generateTitleLinks();

}
  
  const links = document.querySelectorAll('.titles a');
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }