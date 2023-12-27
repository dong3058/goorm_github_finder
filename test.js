let token="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"
let search_btn=document.querySelector(".search-btn")
let search_form=document.querySelector(".user-search")
let listbox=document.querySelector(".list-user-repo")
let p=document.querySelector(".end")
let showlog=document.querySelector(".show_search_log")
let list=0
let search_log={}
let remember_method
let delete_method
console.log("hiii")
class Finder{
  constructor(search_form,listbox,p,list){
    
    this.search_form=search_form
    this.listbox=listbox
    this.p=p
    this.list=list
  }
  add_event_to_form(){
    let inputs=document.querySelector("input")
    inputs.addEventListener("input",()=>{
      
      search_log=localStorage.getItem("search_log")
      search_log=JSON.parse(search_log)
    
      if(search_log===null){
        search_log={}
      }
      else{
        if(inputs.value===""){
          showlog.style.opacity=0;
          
        }
        else{
          let texts
          
          texts=Object.keys(search_log).filter((el)=>{
            if (el.includes(inputs.value)){
              return el}})
          
         
          let lens=Array.from(showlog.children).length
          for(let i=0;i<lens;i++){
            showlog.firstChild.remove()
          }
          for(let x of texts){
            let boxs=document.createElement("div")
            boxs.className="log_data"
            boxs.textContent=x
            showlog.appendChild(boxs)
            boxs.addEventListener("click",()=>{
              inputs.value=boxs.textContent
              inputs.focus()
            })
          }
          if(texts.length==0){
            showlog.style.opacity=0;
          }
          else{
            showlog.style.opacity=1;}
        }
      }  
      
    })
   
    //처음실행시 search form에다가 서브밋일떄 발생하는 이벤트 리스너를 달아줌.
    //애는 처음실행시 달고 searchform은 삭제 및변환이 없으므로 한개만 달린다.
    this.search_form.addEventListener("submit",(e)=>{
      e.preventDefault()
      
      let inputs=document.querySelector("input")

    
      
        
        const new_data=inputs.value
        
        if(Object.keys(search_log).length<20 && !(new_data in search_log)){
          search_log[new_data]=new Date()
        }
        else if(Object.keys(search_log).length==20){
          if(new_data in search_log){
  
          }
          else{
            delete search_log[Object.keys(search_log)[0]]
            search_log[new_data]=new Date()}
            
        }
        showlog.style.opacity=0;
        localStorage.setItem("search_log",JSON.stringify(search_log))
      
      











     
      
      
        let id=this.search_form.children[0].value
    
        while(this.listbox.firstChild){
          this.listbox.removeChild(listbox.firstChild)
          this.listbox.style.height=`${300}px`
          this.p.textContent="click to see more repo"
        }
       
      
        this.finduserdata(id)
        .then((result)=>{
          this.displayuserdatas(result)
        })
      
    
    
    })

  }
  // 클래스내에 비동기 함수 다는법.
  async  finduserdata(id){
    
  
      let userdata=await fetch(`https://api.github.com/users/${id}`,{method:"GET",headers:{
    
      "Authorization" : `bearer ${token}`,'Content-Type':"application/json"}})
    
      let result=await userdata.text()
    
      let ans=await JSON.parse(result)
      
      return ans
    
    
    
    
  }
  async  displayuserdatas(data){
    
      try{
      
      this.makeuserdisplay(data)
      this.listuserepos(data.login)
      .then((result)=>{
        this.makerepolists(result)
      })}
      catch{
        this.makedefaultdisplay()
        alert("Can\'t Find User")
      }
    
    
  }
  async  listuserepos(id){

      
      let fetchs= await fetch(`https://api.github.com/users/${id}/repos`,{method:"GET",headers:{
    
      "Authorization" : `bearer ${token}`,'Content-Type':"application/json"}})
      let result=await fetchs.text()
      let datas=await JSON.parse(result)
    
      
    
      return datas
      
      
      
    
    
    
    
    
  }
  async  makerepolists(data){
    
      list=data
      this.list=data
      

      if(4>=this.list.length)  {
        this.p.textContent="no more repos"
        for(let i=0;i<4;i++){
          
        
          this.makerepodatadisplay(i)
        }
      }
      
      else{
        for(let i=0;i<4;i++){
          
          this.makerepodatadisplay(i)
        }
    
    
        //여기서 make를 정의하면 매번 새로운 make가 만들어져서 이벤트 리스너가 중복되어짐.
        //즉 make의 쥬소가 각각다른 이벤트리스너가 p에추가된다.     
   
        remember_method=this.make.bind(this)//bind는 매번 새로운 다른 함수를 준다는것떄문에
        //remove시 다른 함수가 들어가서 작동을안함. 그래서 이렇게만듬.
      
        this.p.removeEventListener("click",delete_method)
        delete_method=remember_method
        this.p.addEventListener("click",remember_method)//이벤트 리스너를 사용하면
        //this가 이벤트가 걸리는 애로 바뀜 주의할것.  
      }    
  }
  makeuserdisplay(data){

    let public_repos=document.querySelector(".public-repos")
    let public_gists=document.querySelector(".public-gists")
    let followers=document.querySelector(".followers")
    let following=document.querySelector(".following")
    let company=document.querySelector(".company")
    let blog_location=document.querySelector(".blog-location")
    let member_since=document.querySelector(".member-since")
    let profile_img=document.querySelector(".profile-img")
    profile_img.setAttribute("src",data.avatar_url)
    public_repos.textContent="public-repo:"+data.public_repos
    public_gists.textContent="public-gists:"+data.public_gists
    followers.textContent="followers:"+data.followers
    following.textContent="following:"+data.following
    company.textContent="company:"+(data.company+"")
    blog_location.textContent="blog/loaction:"+(data.blog+data.location)
    member_since.textContent="created-at:"+data.created_at.substring(0,10)
  
  
  
  
  
  }
  makedefaultdisplay(){
    let public_repos=document.querySelector(".public-repos")
    let public_gists=document.querySelector(".public-gists")
    let followers=document.querySelector(".followers")
    let following=document.querySelector(".following")
    let company=document.querySelector(".company")
    let blog_location=document.querySelector(".blog-location")
    let member_since=document.querySelector(".member-since")
    let profile_img=document.querySelector(".profile-img")
    profile_img.setAttribute("src","delete.png")
    public_repos.textContent=""
    public_gists.textContent=""
    followers.textContent=""
    following.textContent=""
    company.textContent=""
    blog_location.textContent=""
    member_since.textContent=""
  }
  makerepodatadisplay(i){
    
    let stats=document.createElement("div")
    let item=document.createElement("div")
    let links=document.createElement("a")
    let stars=document.createElement("div")
    let watchers=document.createElement("div")
    let forks=document.createElement("div")
    item.className="user-repo"
    stars.className="stars"
    watchers.className="watchers"
    forks.className="forks"
    stats.className="stats"
    links.setAttribute("href",this.list[i].html_url)
    links.style.color="white"
    links.style.textDecorationLine="none"
    stars.textContent="stars:"+this.list[i].stargazers_count
    watchers.textContent="watchers:"+this.list[i].watchers_count
    forks.textContent="forks:"+this.list[i].forks_count
    links.textContent=this.list[i].name


    item.appendChild(links)
    stats.appendChild(stars)
    stats.appendChild(watchers)
    stats.appendChild(forks)
    item.appendChild(stats)
    this.listbox.append(item)
  }
  make(){
    console.log("click!")
   if(p.textContent!=="close"){
     p.textContent="close"
     for(let i=4;i<list.length;i++){
      this.makerepodatadisplay(i)
     }
  
     listbox.style.height=`${300+70*(list.length-4)}px`
   }
   else{
    for(let i=0;i<list.length-4;i++){
       listbox.lastChild.remove()
      }
      p.textContent="click to see more repo"
  
      listbox.style.height="300px"
    }
  
   } 
}



let finder=new Finder(search_form,listbox,p,list)
//객체 한개 형성해서 form을 통해서 이벤트를 더해주는것.

finder.add_event_to_form()

