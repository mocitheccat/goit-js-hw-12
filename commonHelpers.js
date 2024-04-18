import{a as b,S as L,i as S}from"./assets/vendor-6e0bf343.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function e(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(t){if(t.ep)return;t.ep=!0;const a=e(t);fetch(t.href,a)}})();const v="43388201-d3d6dfd281aefcb5631baa551",l=new URLSearchParams({key:v,q:"",image_type:"photo",orientation:"horizontal",safesearch:!0,page:1,per_page:200});async function p(r,s=1){l.set("q",r),l.set("page",s);try{const e=await b.get(`https://pixabay.com/api/?${l.toString()}`);return e.data.hits.length===0&&c("Sorry, there are no images matching your search query. Please try again!"),console.log(e.data),e.data}catch(e){console.log(e),c(e.message)}}function m(r){return r.map(({webformatURL:s,largeImageURL:e,tags:o,likes:t,views:a,comments:n,downloads:y})=>`<li class="image-card">
          <a class="img-link" href=${e}>
            <div class="gallery-image">
              <img class="image" src=${s} alt="${o}">
            </div>
            <div class="img-caption">
                <ul class="img-stats">
                    <li class="stat-item">
                        <p class="stat-name">Likes</p>
                        <span>${t}</span>
                    </li>
                    <li class="stat-item">
                        <p class="stat-name">Views</p>
                        <span>${a}</span>
                    </li>
                    <li class="stat-item">
                        <p class="stat-name">Comments</p>
                        <span>${n}</span>
                    </li>
                    <li class="stat-item">
                        <p class="stat-name">Downloads</p>
                        <span>${y}</span>
                    </li>
                </ul>
            </div>
              </a>
         </li>`).join("")}function g(r,s,e,o){console.dir(s),u(),e.insertAdjacentHTML("beforeend",o);const t={captions:!0,captionSelector:".image",captionType:"attr",captionsData:"alt",captionPosition:"bottom",captionDelay:250},a=s.querySelectorAll(".image-card");console.log(a.length),a.length<r.totalHits?s.lastElementChild.removeAttribute("hidden"):s.lastElementChild.setAttribute("hidden",""),new L(".img-link",t).refresh()}function q(r){r.innerHTML=""}function c(r){S.error({message:r,position:"topRight"})}function u(){document.querySelector(".loader").classList.toggle("disabled")}const f=document.querySelector(".search-form"),w=f.input,h=document.querySelector(".container"),d=document.querySelector(".gallery"),i=document.querySelector(".js-load-more");async function P(r){r.preventDefault();const s=w.value.trim().toLowerCase();if(!s){c("Please enter a search query.");return}q(d),u();const e=await p(s);g(e,h,d,m(e.hits)),i.addEventListener("click",$.bind(null,s))}async function $(r,s){s.preventDefault(),u(),i.setAttribute("hidden","");let e=parseInt(i.dataset.page)||2;const o=await p(r,e);g(o,h,d,m(o.hits)),i.removeAttribute("hidden"),e+=1,i.dataset.page=e}f.addEventListener("submit",P);
//# sourceMappingURL=commonHelpers.js.map
