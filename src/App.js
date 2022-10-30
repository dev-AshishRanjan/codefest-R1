import React,{useState,useEffect} from "react";

function App() {
  const [todo, setTodo] = useState(true);
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [todoList, settodoList] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos").then(req => req.json()).then(res =>{
      setData(res.slice(0,100));
      console.log(res.slice(0,100));
    })
  },[])

  function handleAdd(){
    const id=new Date().getTime().toString();
    settodoList([...todoList,{input,id}]);
    setInput("");
    document.querySelector("#input").value="";
  }
  function handleRemove(id){
    const newList =todoList.filter((element)=>element.id !== id);
    newList.splice(newList.findIndex(a=>a.id === id),1);
    settodoList(newList);
    setInput("");
  }
  function handleUpdate(id,val){
    console.log(val);
    document.querySelector("#input").value=val;
    const newList =todoList.filter((element)=>element.id !== id);
    // newList.splice(newList.findIndex(a=>a.id === id),1);
    settodoList(newList);
    setInput("");
  }
  function handleSearch(){
    const newList=todoList.filter((element)=>element.input.includes(searchInput));
    settodoList(newList);
    const list2=data.filter((element)=>element.title.includes(searchInput));
    setData(list2);
  }

  return (
    <div className="App">
      <div className="search">
        <input type="text" onChange={(e)=>setSearchInput(e.target.value)}/>
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="left">
        <div className="left-data" onClick={()=> setTodo(!todo)}>Todo List</div>
        <div className="left-data" onClick={()=> setTodo(!todo)}>Products</div>
      </div>
      <div className="right">
        {
          todo && <div className="todo">
            <div className="input">
              <input type="text" onChange={(e)=>setInput(e.target.value)} id="input"/>
              <button onClick={handleAdd}>Add to List</button>
            </div>
            <div className="list">
              {
                todoList.map((element)=>{
                  return(
                    <div className="todo-list-element" key={element.id}>
                      <p>{element.input}</p>
                      <button onClick={(element)=>handleRemove(element.id)}>Remove</button>
                      <button onClick={()=>handleUpdate(element.id,element.input)}>Update</button>
                    </div>
                  )
                })
              }

              
            </div>
          </div>
        }

        {
          !todo && <div className="photos">
            {data.map((element)=>{
              return(
                <div className="card">
                  <img src={element.url}/>
                  <p>{element.id}</p>
                  <p>{element.title}</p>
                </div>
              )
            })}
          </div>
        }
      </div>
    </div>
  );
}

export default App;
