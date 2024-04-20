var P=Object.defineProperty;var b=(t,e,s)=>e in t?P(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var c=(t,e,s)=>(b(t,typeof e!="symbol"?e+"":e,s),s);import{a as L,S as v,i as m}from"./assets/vendor-6e0bf343.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const u of r.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&o(u)}).observe(document,{childList:!0,subtree:!0});function s(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(a){if(a.ep)return;a.ep=!0;const r=s(a);fetch(a.href,r)}})();const l={endOfResults:"We're sorry, but you've reached the end of search results.",noResults:"Sorry, there are no images matching your search query. Please try again!",emptyInput:"Provide a search query..."},q="43388201-d3d6dfd281aefcb5631baa551";class S{constructor(){c(this,"BASE_URL","https://pixabay.com/api/");c(this,"currentPage",1);c(this,"resultsPerPage",15);c(this,"totalPages",0);c(this,"query","")}async getImagesHits(){const e={params:{key:q,q:this.query,image_type:"photo",orientation:"horizontal",safesearch:"true",page:this.currentPage,per_page:this.resultsPerPage}};try{const s=await L.get(this.BASE_URL,e);if(this.totalPages=Math.ceil(s.data.totalHits/this.resultsPerPage),s.data.hits.length===0)throw new Error(l.noResults);return s.data.hits}catch(s){throw new Error(s.message)}}}const R={captions:!0,captionSelector:".image",captionType:"attr",captionsData:"alt",captionPosition:"bottom",captionDelay:250},I=new v(".img-link",R),n=new S;function p(t){return t.map(({webformatURL:e,largeImageURL:s,tags:o,likes:a,views:r,comments:u,downloads:w})=>`<li class="image-card">
          <a class="img-link" href=${s}>
            <div class="gallery-image">
              <img class="image" src=${e} alt="${o}">
            </div>
            <div class="img-caption">
                <ul class="img-stats">
                    <li class="stat-item">
                        <p class="stat-name">Likes</p>
                        <span>${a}</span>
                    </li>
                    <li class="stat-item">
                        <p class="stat-name">Views</p>
                        <span>${r}</span>
                    </li>
                    <li class="stat-item">
                        <p class="stat-name">Comments</p>
                        <span>${u}</span>
                    </li>
                    <li class="stat-item">
                        <p class="stat-name">Downloads</p>
                        <span>${w}</span>
                    </li>
                </ul>
            </div>
              </a>
         </li>`).join("")}function f(t,e){t.insertAdjacentHTML("beforeend",e),I.refresh()}async function O({galleryRef:t,query:e,paginBtn:s,loader:o}){if($(t),n.query=e,!e)throw new Error(l.emptyInput);i(s,!1);try{i(o,!0);const a=await n.getImagesHits();i(o,!1),f(t,p(a)),i(s,!0)&&n.totalPages>1}catch(a){i(s,!1),i(o,!1),d(a.message)}}async function E({galleryRef:t,paginBtn:e,loader:s}){n.currentPage+=1,i(s,!0),i(e,!1);try{const o=await n.getImagesHits();if(i(s,!1),f(t,p(o)),i(e,!0)&&n.currentPage<n.totalPages,H(document.querySelector(".image-card")),n.totalPages===n.currentPage)throw new Error(l.endOfResults)}catch(o){i(e,!1),i(s,!1),d(o.message)}}function H(t){window.scrollBy({top:t.getBoundingClientRect().height*2,behavior:"smooth"})}function $(t){t.innerHTML=""}function d(t){let e={message:t,position:"topRight"};switch(t){case l.endOfResults:e.progressBar=!1,e.transitionIn="fadeIn",m.info(e);break;case l.emptyInput:m.warning(e);break;case l.noResults:m.error(e);break;default:m.warning(e)}}function i(t,e){e===!1?t.classList.add("hidden"):t.classList.remove("hidden")}const h=document.querySelector(".search-form"),x=h.input,D=document.querySelector(".gallery"),y=document.querySelector(".js-load-more"),G=document.querySelector(".loader");h.addEventListener("submit",M);y.addEventListener("click",k);const g={galleryRef:D,query:"",paginBtn:y,loader:G};async function M(t){t.preventDefault();try{g.query=x.value.trim().toLowerCase(),await O(g)}catch(e){d(e.message),console.log(e)}}async function k(t){t.preventDefault();try{await E(g)}catch(e){d(e.message),console.log(e)}}
//# sourceMappingURL=commonHelpers.js.map
