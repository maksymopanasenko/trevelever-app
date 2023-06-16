import { useState } from 'react';

import Search from "./components/search/Search";

import Aside from "./components/aside/Aside";
import Main from "./components/main/Main";

import getData from '../../db/db';

import './Manual.css';



const mainData = getData();

function Manual() {
    const [data, setData] = useState(mainData.slice(0, 5));
    const [term, setTerm] = useState('');

    function onSortByPopularity(target) {
        if (target.nodeName !== 'INPUT') return;

        if (target.dataset.popular === 'increase') {
            mainData.sort((a, b) => b.point - a.point);
            setData(mainData.slice(0, data.length));
        } else {
            mainData.sort((a, b) => a.point - b.point);
            setData(mainData.slice(0, data.length));
        }
    }

    function onUpdateSearch(newTerm) {
        setTerm(newTerm);
    }

    function searchCity(items, term) {
        if (term.length === 0) {
            return items;
        }

        return mainData.filter(item => {

            let matchPattern = new RegExp(`^${term}`, 'gi');

            return item.city.match(matchPattern);
        });
    }

    function onUpdateList() {
        setData(mainData);
    }

    const searchedData = searchCity(data, term);

    return  (
        <main className="manual">
            <section>
                <Search onSearch={onUpdateSearch}/>
                <div className="manual__window">
                    <Aside onSort={onSortByPopularity}/>
                    <Main data={searchedData} onUpdateList={onUpdateList}/>
                </div>
            </section>
        </main>
    )
}

export default Manual;