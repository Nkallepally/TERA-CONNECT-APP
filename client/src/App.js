import {useState,useEffect} from "react";
import axios from "axios"
import './App.css';


function App() {
  const[itemText,setItemText]=useState('');
  const[listItems,setListItems]=useState([]);
  const[isUpdating,setIsUpdating]=useState('');
  const[updateItemText,setUpdateItemText]=useState('');

  const addItem=async(e)=>{
    e.preventDefault();
    try{
      const res= await axios.post("http://localhost:3002/user/add/item",{item:itemText})
      setListItems(prev=>[...prev,res.data]);
      setItemText('')
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    const getItemList=async()=>{
      try{
        const res=await axios.get("http://localhost:3002/user//all/items")
        setListItems(res.data)
      }catch(err){
        console.log(err)
      }
    }
    getItemList()
  })

  const deletedItem=async(id)=>{
    try{
      const res=await axios.delete(`http://localhost:3002/user/api/item/${id}`)
      const newListItem=listItems.filter(item=>item._id!==id)
      setListItems(newListItem)
    }catch(err){
      console.log(err)
    }
  }
  

  const editItem=async(e)=>{
    e.preventDefault()
    try{
      const res= await axios.put(`http://localhost:3001/user/api/item/${isUpdating}`, { item: updateItemText })
      
      console.log(res.data)
      const updatedItemIndex=listItems.findIndex(item=>item._id===isUpdating)
      const updatedItem=listItems[updateItemText].item=updateItemText;
      setUpdateItemText('')
      setIsUpdating('')
    }catch(err){
      console.log(err)
    }
  }

  const reUpdatedForm=()=>{
    <form className="form-updated" onSubmit={(e)=>{editItem(e)}}>
      <input className="new-input-update" type="text" placeholder="New Item" onChange={e=>setUpdateItemText(e.target.value)} value={updateItemText}/>
      <button className="new-button-update" type="submit">Edit</button>

    </form>
  }
  return (
    <div className="App">
      <h1>Productivity App</h1>
      <form className="input-form" onSubmit={e=>addItem(e)}>
        <input className="text" type="text" placeholder="Add Item" onChange={e=>{setItemText(e.target.value)}} value={itemText}/>
        <button className="add" type="submit">Add</button>
      </form>
      <div className="product-list-items">
        {
          listItems.map(item=>(
            <div className="product-items">
              {
                isUpdating===item._id
                ? reUpdatedForm()
             
              :<>
              <p className="content">{item.item}</p>
              <button className="edit-content" onClick={()=>{setIsUpdating(item._id)}}>Edit</button>
              <button className="delete-content" onClick={()=>{deletedItem(item._id)}}>Delete</button>
              </>
}
            </div>
          ))
        }

      </div>
     
    </div>
  );
}

export default App;
