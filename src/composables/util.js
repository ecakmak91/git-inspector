import axios from "axios";

export default function util(){
  const accessToken="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"
  const axiosInstance = axios.create({
    baseURL: 'https://api.github.com/',
    timeout: 2000,
    headers: {
      'Accept': 'application/vnd.GitHub.v3+json',
      'Authorization': 'token '+accessToken
    }
  });


  const getUserDetail=async (username)=>{
    return await axiosInstance.get("https://api.github.com/users/"+username)
    .then(e=>e.data)
  }

  const getDevelopers=async (username)=>{
    let obj={
      q:username
    }
    return await axiosInstance.get("https://api.github.com/search/users",{
      params: obj
    })
    .then(e=>e.data)
    .then(e=>e.items)
  }

  const getUserRepos=async (username)=>{
    //https://api.github.com/users/ecakmak91/repos
    
    return await axiosInstance.get(`https://api.github.com/users/${username}/repos`)
    .then(e=>e.data)
    .then(e=>{
      return getPopularLanguages(e)
    })
  }

  const getPopularLanguages= (obj)=>{
    const groupedData = obj.reduce((acc, item) => {
      const key = item.language;
      if (!acc[key]) {
        acc[key] = {
          count:0,
          size:0,
          language:`${item.language}`
        };
      }
      acc[key].color=getRandomColor()
      acc[key].size+=item.size
      acc[key].count++;
      return acc;
    }, {});

    return Object.entries(groupedData).sort((a,b)=>b[1].count-a[1].count).slice(0,3);  
  }

  const getRandomColor=()=>{
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


  const getDevelopersGraphQl=(query)=>{
    const options = {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query {
          search(query: "${query}, type:USER", first: 10) {
            edges {
              node {
                ... on User {
                  login
                }
              }
            }
          }
        }`
      }),
    };
  
    return fetch("https://api.github.com/graphql", options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        return data.data.search.edges.map((edge) => edge.node.login);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return {
    getDevelopers,
    getUserDetail,
    getUserRepos,
    getDevelopersGraphQl
  }
}