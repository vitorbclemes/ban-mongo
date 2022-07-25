async function get(table){
  let response = await fetch(`http://localhost:27018/${table}`);
  return response.ok? await response.json() : null;
}

async function getById(table,id){
  let response = await fetch(`http://localhost:27018/${table}/${id}`);
  return response.ok? await response.json() : null;
}

async function post(table,obj){
  let response = await fetch (`http://localhost:27018/${table}`,{
    method:'post',
    body:JSON.stringify(obj),
    headers:{
      'content-type':'application/json'
    }
  });
  return response.ok? await response.json() : null;
};

async function remove(table,id){
  let response = await fetch(`http://localhost:27018/${table}/${id}`,{
    method:'delete',
    headers:{
      'content-type':'application/json'
    }
  });
  return response.ok? await response.json() : null;
}

async function put(table,id,obj){
  let response = await fetch(`http://localhost:27018/${table}/${id}`,{
    method:'put',
    body:JSON.stringify(obj),
    headers:{
      'content-type':'application/json'
    }
  });
  return response.ok? await response.json() : null;
}

async function userLogin(table,login,senha){
  let response = await fetch(`http://localhost:27018/${table}/${login}/${senha}`);
  return response.ok? await response.json() : null;
}


export default {
  get,
  getById,
  post,
  remove,
  put,
  userLogin
};