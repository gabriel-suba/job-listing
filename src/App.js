import { useState } from 'react';
import './style.css';
import list from './data.json';

function App() {
  const [items, setItems] = useState([]);
  const [sort, setSort] = useState([...list]);

  function handleSort(id) {
    const filtered = sort.filter(item => (
        item.role === id || item.level === id || item.languages.includes(id) || item.tools.includes(id)
    ));

    setSort([...filtered]);
  }

  function handleAdd(e) {
    const { target: { id } } = e;
    
    if (items.includes(id)) {
      return;
    } else {
      setItems(prev => [...prev, id]);
      handleSort(id);
    }
  }

  function handleRemove(name) {
    const removed = items.filter(item => item !== name);
    setItems([...removed]);

    if (removed.length <= 0) {
      setSort([...list]);
      return;
    }

    const temp = [...list];

    for (let i = 0; i < removed.length; i++) {
      const id = removed[i];
      const filtered = temp.filter(item => (
        item.role === id || item.level === id || item.languages.includes(id) || item.tools.includes(id)
      ))

      setSort([...filtered]);
    }
  }

  function handleClear() {
    setItems([]);
    setSort([...list]);
  }

  return (
    <div className="App spacing">
      <header className="header-bg"></header>
      
      <div className="filter container">
        <div className="match-container">
          {items.length <= 0 && <span className="font-bold">Find by tags...</span>}
          {items && items.map(item => (
            <div className="match" key={item}>
              <span className="font-bold match-item">{item}</span>
              <span onClick={() => handleRemove(item)} className="font-bold match-item-cross">X</span>
            </div>
          ))}
        </div>
        <div>
          <span onClick={handleClear} className="clear font-cyan font-bold">Clear</span>
        </div>
      </div>

      <div className="container spacing">
        {sort.map(data => (
        <div className={`tablet spacing ${data.featured && "featured"}`} key={data.id}>
          <div className="logo"><img src={data.logo} alt={`${data.company}-logo`} /></div>
          <div className="top">
            <div className="company">
              <span className="font-cyan font-bold">{data.company}</span>
              <div className="tags">
                {data.new && <div className="bg-cyan font-bold"><span>NEW!</span> </div>}
                {data.featured && <div className="bg-dcyan font-bold"><span>FEATURED</span> </div>}
                </div>
              </div>
            <div className="position">
              <span className="font-bold">{data.position}</span>
            </div>
            <div className="info">
              <span>{data.postedAt}</span> 
              &#183;
              <span>{data.contract}</span> 
              &#183;
              <span>{data.location}</span>
            </div>
          </div>
          <hr />
          <div className="bottom">
            <div className="bottom-container">
              <span onClick={handleAdd} className="role" id={data.role}>{data.role}</span>
              <span onClick={handleAdd} className="level" id={data.level}>{data.level}</span>
              {data.languages && data.languages.map(language => (
                <span onClick={handleAdd} key={language} id={language}>{language}</span>
              ))}
            </div>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
}

export default App;
