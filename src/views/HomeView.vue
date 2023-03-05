<template>
  <div class="content">
    <form class="flex">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
      <input type="text" class="searchbox" v-model="username" @input="getDevs">
    </form>
  
    <div class="user-list flex flex-wrap justify-between">
      <RouterLink :to="{ name: 'user', params: { url: item.login }}" class="item flex items-center mb-6 w-full md:w-1/2" v-for="(item) in userList" :key="item.url">
        <img :src="item.avatar_url" alt="" class="profile-pic mr-4">
        <div class="user-detail">
          <p>@{{item.login}}</p>
        </div>
      </RouterLink>	
    </div>
  </div>
</template>
<script setup>
  import {ref} from "vue"
  import util from "../composables/util";
  
  const username=ref("")
  const userList=ref([])

  const { getDevelopers } =util()

  const getDevs=()=>{
    getDevelopers(username.value)
    .then((e)=>{
      userList.value=e
    })
  }
  

</script>
<style lang="scss" scoped>
  form{
    border: 1px solid #ccc;
    margin: -2em 0 4em;
    background-color: #fff;
    padding: .5em 1em;
    svg{
      width: 2em;
      margin-right: 1em;
    }
    input{
      width: 100%;
    }
  }
  .user-list{
    .item{
      img{
        width: 70px;
        height: 70px;
        border-radius: 50%;
      }
      .user-detail{
        h3{
          font-weight: 500;
        }
        p{
          font-weight: 100;
          font-size: .9em;
        }
      }
    }
  }
</style>