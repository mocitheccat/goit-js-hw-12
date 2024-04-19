var P=Object.defineProperty;var b=(t,e,s)=>e in t?P(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var c=(t,e,s)=>(b(t,typeof e!="symbol"?e+"":e,s),s);import{a as L,i as m,S as v}from"./assets/vendor-6e0bf343.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&r(u)}).observe(document,{childList:!0,subtree:!0});function s(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(a){if(a.ep)return;a.ep=!0;const o=s(a);fetch(a.href,o)}})();const l={endOfResults:"We're sorry, but you've reached the end of search results.",noResults:"Sorry, there are no images matching your search query. Please try again!",emptyInput:"Provide a search query..."},q="43388201-d3d6dfd281aefcb5631baa551";class S{constructor(){c(this,"BASE_URL","https://pixabay.com/api/");c(this,"currentPage",1);c(this,"resultsPerPage",15);c(this,"totalPages",0);c(this,"query","")}async getImagesHits(){const e={params:{key:q,q:this.query,image_type:"photo",orientation:"horizontal",safesearch:"true",page:this.currentPage,per_page:this.resultsPerPage}};try{const s=await L.get(this.BASE_URL,e);if(this.totalPages=Math.ceil(s.data.totalHits/this.resultsPerPage),s.data.hits.length===0)throw new Error(l.noResults);return s.data.hits}catch(s){throw new Error(s.message)}}}const n=new S;function p(t){return t.map(({webformatURL:e,largeImageURL:s,tags:r,likes:a,views:o,comments:u,downloads:w})=>`<li class="image-card">
          <a class="img-link" href=${s}>
            <div class="gallery-image">
              <img class="image" src=${e} alt="${r}">
            </div>
            <div class="img-caption">
                <ul class="img-stats">
                    <li class="stat-item">
                        <p class="stat-name">Likes</p>
                        <span>${a}</span>
                    </li>
                    <li class="stat-item">
                        <p class="stat-name">Views</p>
                        <span>${o}</span>
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
         </li>`).join("")}function f(t,e){const s={captions:!0,captionSelector:".image",captionType:"attr",captionsData:"alt",captionPosition:"bottom",captionDelay:250},r=new v(".img-link",s);t.insertAdjacentHTML("beforeend",e),r.refresh()}async function R({galleryRef:t,query:e,paginBtn:s,loader:r}){if(E(t),n.query=e,!e)throw new Error(l.emptyInput);i(s,!1);try{i(r,!0);const a=await n.getImagesHits();i(r,!1),f(t,p(a)),i(s,!0)&&n.totalPages>1}catch(a){i(s,!1),i(r,!1),d(a.message)}}async function I({galleryRef:t,paginBtn:e,loader:s}){n.currentPage+=1,i(s,!0),i(e,!1);try{const r=await n.getImagesHits();if(i(s,!1),f(t,p(r)),i(e,!0)&&n.currentPage<n.totalPages,O(document.querySelector(".image-card")),n.totalPages===n.currentPage)throw new Error(l.endOfResults)}catch(r){i(e,!1),i(s,!1),d(r.message)}}function O(t){window.scrollBy({top:t.getBoundingClientRect().height*2,behavior:"smooth"})}function E(t){t.innerHTML=""}function d(t){let e={message:t,position:"topRight"};switch(t){case l.endOfResults:e.progressBar=!1,e.transitionIn="fadeIn",m.info(e);break;case l.emptyInput:m.warning(e);break;case l.noResults:m.error(e);break;default:m.warning(e)}}function i(t,e){e===!1?t.classList.add("hidden"):t.classList.remove("hidden")}const h=document.querySelector(".search-form"),H=h.input,$=document.querySelector(".gallery"),y=document.querySelector(".js-load-more"),x=document.querySelector(".loader");h.addEventListener("submit",D);y.addEventListener("click",G);const g={galleryRef:$,query:"",paginBtn:y,loader:x};async function D(t){t.preventDefault();try{g.query=H.value.trim().toLowerCase(),await R(g)}catch(e){d(e.message),console.log(e)}}async function G(t){t.preventDefault();try{await I(g)}catch(e){d(e.message),console.log(e)}}
//# sourceMappingURL=commonHelpers.js.map
