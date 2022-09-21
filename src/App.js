import './App.css';
import React, { useState } from 'react';


function App() {
  const [data, setdata] = useState(
    [{
      id: 2,
      name: "ali",
      age: 18,
      email: 'example@ex.com',
      phone: "0912XxXXXXX",
      favorite: false,
      country: "iran"
    },
    {
      id: 5,
      name: "ali",
      age: 18,
      email: 'example@ex.com',
      phone: "0912XxXXXXX",
      favorite: false,
      country: "iran"
    },
    {
      id: 10,
      name: "ali",
      age: 18,
      email: 'example@ex.com',
      number: "0912XxXXXXX",
      favorite: false,
      country: "iran"
    }]
  );
  const [id, setid] = useState(0);
  const [updateform, setupdateform] = useState(data[0])
  const [typefilter, settypefilter] = useState(false);
  const [datasearch, setdatasearch] = useState("");
  const [styledelete, setstyledelete] = useState({ border: "1px solid black", borderRadius: "15px", margin: "20px", padding: "10px", display: "none" });
  const deletesure = (id) => {
    setstyledelete({ ...styledelete, display: "block" });
    setid(id);
  }
  const deletecontact = () => {
    setdata(data.filter(user => user.id !== id));
    nonedisplay();
  }

  const nonedisplay = () => {
    setstyledelete({ ...styledelete, display: "none" });
  }

  // const update=(id) =>{
  //   setdata(data.map(user =>(
  //     user.id
  //   )))
  // }
  const searchContact = (e) => {
    setdatasearch(e.target.value);
  }

  const handlesubmit = (e) => {
    e.preventDefault();
    console.log(e);
    let newuser = {
      id: Math.floor(Math.random() * 1000),
      name: e.target[0].value,
      age: e.target[1].value,
      phone: e.target[2].value,
      favorite: e.target[3].checked ? true : false,
      country: e.target[5].value
    };
    setdata([...data, newuser]);
  }

  const fliterContact = (e) => {
    settypefilter(e.target.value === "favorite" ? true : false);
  }

  const updateuser = (id) => {
    console.log(data.filter((user) => user.id === id)[0]);
    setupdateform(...data.filter((user) => user.id === id));
  }

  const formchange = (e) => {
    setupdateform({ ...updateform, [e.target.name]: e.target.value })
    console.log(e.target.value);
  }

  // const changecheck = (e)=>{
  //   e.target.checked = !(e.target.checked);
  // }
  return (

    <div>
      <div style={styledelete}>
        Are you sure?
        <button onClick={() => deletecontact()}>yes</button>
        <button onClick={() => nonedisplay()}>No</button>
      </div>
      <form onSubmit={handlesubmit} style={{ border: "1px solid black", borderRadius: "15px", margin: "20px", padding: "10px" }}>
        <div>
          <img style={{ borderRadius: "50%", width: "50px", height: "50px" }} src={`https://avatars.dicebear.com/api/avataaars/${updateform.id}.svg`} alt="" />
        </div>
        <div>
          <label htmlFor="name">name: </label>
          <input type="text" name="name" id="name" value={updateform.name} onChange={formchange} />
        </div>
        <div>
          <label htmlFor="age">age: </label>
          <input type="number" name="age" id="age" value={updateform.age} onChange={formchange} />
        </div>
        <div>
          <label htmlFor="phone">phone: </label>
          <input type="tel" name="phone" id="phone" value={updateform.phone} onChange={formchange} />
        </div>
        <div>
          <input type="radio" value="favorite" name="favorite" id="favorite" />
          <label htmlFor="favorite">favorite: </label>
          <input type="radio" value="public" name="favorite" id="public" />
          <label htmlFor="public">public: </label>
        </div>
        <div>
          <label htmlFor="country">country: </label>
          <input type="text" name="country" id="country" value={updateform.country} onChange={formchange} />
        </div>
        <input value="Add" type="submit" />
      </form>
      <div style={{ margin: "30px", marginBottom:0, display:"flex",flexDirection:"row"}}>
        <div style={{ marginRight:"20px" }}>
          <label htmlFor='search'>search: </label>
          <input type="search" id="search" onKeyUp={searchContact} />
        </div>
        <div>
          <input type="radio" value="public" name="favorite" onChange={fliterContact} id="All" />
          <label htmlFor="All">All </label>
          <input type="radio" value="favorite" name="favorite" onChange={fliterContact} id="favfilter" />
          <label htmlFor="favfilter">favorite </label>
        </div>
      </div>
      {data.filter(user => typefilter ? user.favorite : true && user.name.includes(datasearch)).map((user) => (
        <div style={{ border: "1px solid black", borderRadius: "15px", margin: "20px", padding: "10px" }}>
          <div>
            <img style={{ borderRadius: "50%", width: "50px", height: "50px" }} src={`https://avatars.dicebear.com/api/avataaars/${user.id}.svg`} alt="" />
          </div>
          <div>
            name:{user.name};
          </div>
          <div>
            age:{user.age};
          </div>
          <div>
            phone: {user.phone};
          </div>
          <div>
            favorite:
            <span style={{ content: "", width: "10px", display: 'inline-block', height: "10px", borderRadius: "50%", background: user.favorite ? "red" : "blue" }}> </span>
          </div>
          <div>
            country: {user.country};
          </div>
          <button onClick={() => deletesure(user.id)}>Delete</button>
          <button onClick={() => updateuser(user.id)}>Update</button>
        </div>
      ))
      }

    </div>
  );
}

export default App;
