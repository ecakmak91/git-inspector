<template>
  <div class="cont">
    <div class="printed-area">
      <div class="profile">
        <img :src="userInfo.avatar_url" alt="" class="profile-pic hidden md:block md:mr-4">
        <div class="user-detail mx-auto md:mx-2">
          <h3>{{userInfo.name}}</h3>
          <img :src="userInfo.avatar_url" alt="" class="profile-pic block md:hidden">
          <a :href="userInfo.html_url" target="_blank">@{{userInfo.login}}</a>
        </div>
      </div>
      <div class="chart flex justify-between items-start md:items-center gap-x-4">
        <!-- {{ $route.params.url }} -->
        <div class="item" v-for="(item,index) in langList" :key="index">
          <div class="img" :style="{ backgroundColor: item[1].color }">
            {{ item[1].language[0] }}
          </div>
          <h4 class="my-2">{{item[1].language}}</h4>
          <p class="text-center">{{(item[1].size/1024).toFixed(2)}} MB</p>
        </div>
        
      </div>
    </div>
    
    <a @click="takeSs" class="take-ss flex justify-center items-center">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="w-6 h-6 mr-2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
      </svg>
      <span>Take a screenshot</span>      
    </a>

    <Teleport to="body">
      <div v-show="openModal" class="modal" ref="modal">
        <img :src="deneme" alt="" >
      </div>
    </Teleport>
  
  </div>
  
  
</template>
<script setup>

  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import html2canvas from 'html2canvas';

  import util from '../../composables/util';
  
  
  const route = useRoute();
  const { getUserRepos, getUserDetail } =util()

  const langList=ref([])
  const openModal=ref(false)
  const modal = ref(null);
  const userInfo=ref({});

  getUserDetail(route.params.url)
  .then(e=>{
    userInfo.value=e
  })

  getUserRepos(route.params.url)
  .then(e=>{
    langList.value=e
  })

  const takeSs=()=>{
    html2canvas(document.querySelector("#app"),{
      useCORS: true,
      allowTaint : false,
      onrendered: function (canvas) {
      //your functions here
      }
    })
    .then(canvas=>{
      openModal.value=true
      
      document.body.appendChild(canvas)


    });
  }

  function takeScreenshot() {

    openModal.value=true

    const canvas = document.getElementById('result');
    const context = canvas.getContext('2d');
    const screenshot = document.querySelector('body');
    canvas.width = screenshot.offsetWidth;
    canvas.height = screenshot.offsetHeight;
    context.drawImage(screenshot, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL();
    console.log(dataURL);
  }

  //https://api.github.com/users/ecakmak91
  //https://api.github.com/users/ecakmak91/repos

  
</script>

<style lang="scss" scoped>
  .profile{
    margin-top: -5em;
    margin-bottom: 5em;
    display: flex;
    align-items: center;
    @media screen and (max-width: 768px) {
      text-align: center;
    }
    img{
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
    .user-detail{
      h3{
        font-weight: 500;
        @media screen and (max-width: 768px) {
          margin-bottom: 1.2em;
          font-weight: 600;
          font-size: 1.2em;
        }
      }
      p{
        font-weight: 100;
        font-size: .9em;
      }
    }
  }
  .chart{
    .item{
      &:nth-child(1){
        width: 100%;
        overflow: hidden;
        @media screen and (max-width: 768px) {
          order:1;
        }
      }
      &:nth-child(2){
        width: 75%;
        overflow: hidden;
        @media screen and (max-width: 768px) {
          width: 100%;
          order:0;
          padding-top:2em;
        }
      }
      &:nth-child(3){
        width: 50%;
        overflow: hidden;
        @media screen and (max-width: 768px) {
          width: 100%;
          order:2;
          padding-top:4em;
        }
      }
      .img{
        width: 80%;
        margin: 0 auto;
        aspect-ratio : 1 / 1;
        justify-content: center;
        display: flex;
        align-items: center;
        color: #fff;
      }
      h4{
        text-align: center;
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      a{
        text-align: center;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .take-ss{
    background: var(--cool-primary);
    margin-top: 3em;
    padding: 1em 0;
    border: 1px solid var(--cool-primary);
    transition: .3s;
    position: fixed;
    width: 300px;
    left: 50%;
    margin-left: -150px;
    bottom: 4em;
    span{
      color: var(--cool-white);
    }
    svg{
      stroke: var(--cool-white);
    }
    &:hover{
      background-color: var(--cool-white);
      span{
        color: var(--cool-primary);
      }
      svg{
        stroke: var(--cool-primary);
      } 
    }
  }

  .modal{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    background: rgba(0,0,0,.5);
    align-items: center;
    canvas{
      width: 80%;
      height: 80%;
    }
  }
/*

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
*/
</style>
