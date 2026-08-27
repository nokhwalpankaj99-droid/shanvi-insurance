/* Shanvi Agent Auth v5 - local demo adapter. Replace this adapter with Supabase/API later. */
const ShanviAuth = (() => {
  const KEY='shanvi_agents_v5';
  const seed=[{id:'agent01',name:'Demo Agent',email:'agent@example.com',password:'demo123',createdAt:new Date().toISOString()}];
  function users(){try{return JSON.parse(localStorage.getItem(KEY))||seed}catch(e){return seed}}
  function save(v){localStorage.setItem(KEY,JSON.stringify(v))}
  function register({id,name,email,password}){
    id=id.trim().toLowerCase(); name=name.trim(); email=email.trim().toLowerCase();
    if(!/^[a-z0-9._-]{4,30}$/.test(id)) throw Error('Agent ID 4-30 characters: letters, numbers, dot, underscore or hyphen.');
    if(password.length<6) throw Error('Password minimum 6 characters ka hona chahiye.');
    const list=users(); if(list.some(u=>u.id===id)) throw Error('Ye Agent ID already registered hai.');
    list.push({id,name,email,password,createdAt:new Date().toISOString()}); save(list); return {id,name,email};
  }
  function login(id,password){const u=users().find(x=>x.id===id.trim().toLowerCase()&&x.password===password);if(!u)return null;sessionStorage.setItem('shanviAgentV5',JSON.stringify({id:u.id,name:u.name,email:u.email}));return u}
  function current(){try{return JSON.parse(sessionStorage.getItem('shanviAgentV5'))}catch(e){return null}}
  function logout(){sessionStorage.removeItem('shanviAgentV5')}
  function list(){return users().map(({password,...u})=>u)}
  return {register,login,current,logout,list};
})();
