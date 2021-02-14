import React from 'react' 
import Item from "./Item"; 
import { sortBy } from 'lodash';

const SORTS = {
    NONE: list => list,
    TITLE: list => sortBy(list, 'title'),
    AUTHOR: list => sortBy(list, 'author'),
    COMMENT: list => sortBy(list, 'num_comments').reverse(),
    POINT: list => sortBy(list, 'points').reverse(),
    };

const List = ({ list, onRemoveItem }) => {
    const [sort, setSort] = React.useState({
        sortKey: 'NONE',
        isReverse: false,
        });
        
    const handleSort = sortKey => {
    const isReverse = sort.sortKey === sortKey && !sort.isReverse;
    setSort({ sortKey, isReverse });

    };
    const sortFunction = SORTS[sort.sortKey];
    const sortedList = sort.isReverse ? sortFunction(list).reverse(): sortFunction(list);

    return  (
        <div>
        <div>
        <span>
        <button type="button" style={{ width: '40%' }} onClick={() => handleSort('TITLE')}>
        Title
        </button>
        </span>
        <span>
        <button type="button" style={{ width: '8%' }}onClick={() => handleSort('AUTHOR')}>
        Author
        </button>
        </span>
        <span>
        <button type="button" style={{ width: '10%' }} onClick={() => handleSort('COMMENT')}>
        Comments
        </button>
        </span>
        <span>
        <button type="button" style={{ width: '10%' }}onClick={() => handleSort('POINT')}>
        Points
        </button>
        </span>
        <span>Actions</span>
        </div>
    {sortedList.map(item => (
    <Item
    key={item.objectID}
    item={item}
    onRemoveItem={onRemoveItem}
    />
    ))}
    </div>
    );}
    

export default List;