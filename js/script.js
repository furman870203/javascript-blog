'use strict';
/* global Handlebars */
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML)
};

const titleClickHandler = function(event){
  event.preventDefault();
    
  const clickedElement = this;
  

  /* remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* add class 'active' to the clicked link */
  
  clickedElement.classList.add('active');
     
  

  /* remove class 'active' from all articles */
  
  const activeArticles = document.querySelectorAll('.post.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  
  /* find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  
  /* add class 'active' to the correct article */

  targetArticle.classList.add('active');
};
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-';
  
function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
    
  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for(let article of articles){
    
    

    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element */
    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    

    /* create HTML of the link */
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
     
    /* insert link into titleList */
    titleList.innerHTML = titleList.innerHTML + linkHTML;
  }
}

generateTitleLinks();

function calculateTagsParams(tags){
  let paramsMin  = Math.min(99999);
  let paramsMax = Math.max(0);
  for(let tag in tags){
    if(paramsMin > tags[tag]){
      paramsMin = tags[tag];
    }
    if(paramsMax < tags[tag]){
      paramsMax = tags[tag];
    }
  }

  return {
    max: paramsMax,
    min: paramsMin
  };
}

function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return optCloudClassPrefix + classNumber;
}



function generateTags(){
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
    
  /* START LOOP: for every article: */
  for(let article of articles){
    /* find tags wrapper */
    const wrapper = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let html = '';
  
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
  
    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
  
      /* generate HTML of the link */
      
      const tagHTMLData = {id: tag, title: tag};
      const tagHTML = templates.tagLink(tagHTMLData);

  
      /* add generated code to html variable */
      html = html + tagHTML;

      //* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]) {
      /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

    /* END LOOP: for each tag */
    }
  
    /* insert HTML of all the links into the tags wrapper */
    wrapper.innerHTML = html;
  
    /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  const tagsParams = calculateTagsParams(allTags);
  

  /* [NEW] create variable for all links HTML code */
  
  const allTagsData = {tags: []};

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
  /* [NEW] generate code of a link and add it to allTagsHTML */
    
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });

  }
  /* [NEW] END LOOP: for each tag in allTags: */

  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  
}  
generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault(); 

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
    
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const activeTags = document.queryselectrorall('a.active[href^="#tag-"]');
    
  /* START LOOP: for each active tag link */
  for(let activeTag of activeTags){
    /* remove class active */
    activeTag.classList.remove('active');
  /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const targetTags = document.querySelectorAll(href);
  /* START LOOP: for each found tag link */
  for(let targetTag of targetTags){
    /* add class active */
    targetTag.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const tagsLinks = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  for(let tagsLink of tagsLinks){
    /* add tagClickHandler as event listener for that link */
    tagsLink.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}

function generateAuthors(){
 
  let allAuthors = {};

  const articles = document.querySelectorAll(optArticleSelector);
  
  
  for(let article of articles){
    const wrapper = article.querySelector(optArticleAuthorSelector);
    const articleAuthor = article.getAttribute('data-author');
    
    const authorHTMLData = {id: articleAuthor, title: articleAuthor};
    const authorHTML = templates.authorLink(authorHTMLData);


    if(!allAuthors[articleAuthor]) {
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }
    

    wrapper.innerHTML = authorHTML;
  }

}
generateAuthors();

function authorClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-' , '');
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

  for(let activeAuthor of activeAuthors){
    activeAuthor.classList.remove('active');
  }
  const targetAuthors = document.querySelectorAll(href);
  for(let targetAuthor of targetAuthors){
    targetAuthor.classList.add('active');
  }
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors(){
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');
  for(let authorLink of authorLinks){
    authorLink.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();



addClickListenersToTags();
  
const links = document.querySelectorAll('.titles a');
  
for(let link of links){
  link.addEventListener('click', titleClickHandler);
}