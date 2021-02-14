import React from 'react'  

const Item = ({ item, onRemoveItem }) => (
    <div style={{ display: 'flex' }}>
    <span style={{ width: '40%' }}>
    <a href={item.url}>{item.title}</a>
    </span>
    <span style={{ width: '10%' }}>{item.author}</span>
    <span style={{ width: '12%' }}>{item.num_comments}</span>
    <span style={{ width: '5%' }}>{item.points}</span>
    <span style={{ width: '5%' }}>
    <button type="button" onClick={() => onRemoveItem(item)}>
    Dismiss
    </button>
    </span>
    </div>
    );
    
  
export default Item;