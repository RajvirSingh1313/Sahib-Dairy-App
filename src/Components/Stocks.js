import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { StocksDB } from "../database";

export default function Stocks() {
    const [data, setData] = useState([]);
    const [selectedEditItem, setSelectedEditItem] = useState(0);
    const [selectedDeleteItem, setSelectedDeleteItem] = useState(0);

    useEffect(async () => {
        await StocksDB.getItem("Stocks").then(items => {
            setData(items);
        })
    }, [])

    return (
        <div>
            <Navbar whichTabIsOpened={4} />

            <table className="ml-8 mr-8 mb-5">
                <thead>
                    <tr>
                        <th className="border border-blue-dark bg-blue-light p-2 text-xl">Product Name</th>
                        <th className="border border-blue-dark bg-blue-light p-2 text-xl">Price Per Stock</th>
                        <th className="border border-blue-dark bg-blue-light p-2 text-xl">Stocks</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item =>
                        <tr>
                            <td className="border border-blue-dark bg-blue-white text-blue-bg text-xl p-2">{item.name}</td>
                            <td className="border border-blue-dark bg-blue-white text-blue-bg text-xl p-2">{item.pricePerStock}</td>
                            <td className="border border-blue-dark bg-blue-white text-blue-bg text-xl p-2">{item.stocks}</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="flex justify-center mb-8">
                <Link to={"/stocks-add"} className="rounded bg-blue-dark text-white p-2">Add Item</Link>
            </div>

            <select onChange={e => setSelectedEditItem(e.target.value)} defualt={0} className="mr-5 w-48 mb-8 outline-none text-blue-bg font-semibold border-blue-light ml-8 p-1 border-2 bg-blue-white rounded">
                {data.map((item,index)=><option value={index}>{item.name}</option>)}
            </select>
            <Link to={`/stocks-edit/${selectedEditItem}`} className="rounded bg-blue-dark text-white p-2">Edit Item</Link>

            <select onChange={e => setSelectedDeleteItem(e.target.value)} defualt={0} className="mr-5 w-48 mb-8 outline-none text-blue-bg font-semibold border-blue-light ml-8 p-1 border-2 bg-blue-white rounded">
                {data.map((item,index)=><option value={index}>{item.name}</option>)}
            </select>
            <button onClick={()=>{
                StocksDB.getItem("Stocks").then(items=>{
                    items.forEach((item,index)=>{
                        if(index.toString()===selectedDeleteItem.toString()){
                            items.pop(index);
                        }
                    })
                    StocksDB.setItem("Stocks", items);
                })
                window.location = "/stocks";
            }} className="rounded bg-blue-dark text-white p-1">Delete Item</button>
        </div>
    )
}
