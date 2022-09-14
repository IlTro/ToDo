import './List.css'
import React, { useState } from 'react';
import Task from './Task';
import Button from './Button';

function List(props) {
    const [mode, setMode] = useState('All');
    const [sort, setSort] = useState(false);
    const [page, setPage] = useState(0);

    let showPagitation = false;
    let pagesAmount = 0;

    function drawList(list) {
        let filtredList = list
        sort && (filtredList = filtredList.slice().reverse());
        mode === 'Done' && (filtredList = filtredList.filter(el => el.status));
        mode === 'Undone' && (filtredList = filtredList.filter(el => !el.status));

        filtredList.length > 5 ? showPagitation = true : showPagitation = false;
        pagesAmount = Math.trunc((filtredList.length - 1) / 5);

        page > pagesAmount && setPage(pagesAmount);

        return filtredList.slice(page * 5,(page + 1) * 5).map(it => <Task
            key={it.id}
            text={it.text}
            status={it.status}
            date={it.date}
            onCheckClick={() => props.onCheckClick(it.id)}
            onTrashClick={() => props.onTrashClick(it.id)}
            editText={(text) => props.editText(it.id, text)}
        />)
    }

    function pagination() {
        let pageButtons = []
        for (let i = 0; i <= pagesAmount; i++) {
            pageButtons.push(<Button key={"pb" + i} className={"page-btn " + (i === page && "page-btn-current")} onClick={()=>setPage(i)} text={i+1} />)
        }


        return(
            <div className="pages">
                <Button className="page-btn page-btn-prev" onClick={()=>setPage(0)} text='«' />
                {pageButtons}
                <Button className="page-btn page-btn-next" onClick={()=>setPage(pagesAmount)} text='»' />
            </div>
        )
    }

    return (
        <div className='tasks'>
            <div className='controls'>
                <div className='buttons'>
                    <Button text='All' onClick={() => setMode('All')}/>
                    <Button text='Done' onClick={() => setMode('Done')}/>
                    <Button text='Undone' onClick={() => setMode('Undone')}/>
                </div>
                <Button className='sortButton' text={sort ? 'Sort by Date ⇧':'Sort by Date ⇩'} onClick={() => setSort(!sort)} />
            </div>
            <div className="list">
                {drawList(props.list)}
            </div>
            {showPagitation && pagination()}
        </div>
    );
}

export default List;
