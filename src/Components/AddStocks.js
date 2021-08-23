import Navbar from "./Navbar";
import {useState} from "react";
import {StocksDB} from "../database";
import { useHistory } from "react-router-dom";


export default function AddStocks() {
    const [productName, setProductName] = useState("");
    const [pricePerStock, setPricePerStock] = useState(0);
    const [InitalStock, setInitalStock] = useState(0);

    const history = useHistory();

    return (
        <div>
            <Navbar whichTabIsOpened={4}/>

            <div className="flex justify-center flex-col m-5 mt-8">
                <h1 className="text-xl font-semibold">Enter Product Name</h1>
                <input onChange={(e)=>setProductName(e.target.value)} className="mb-8 outline-none text-blue-bg font-semibold text-l rounded border-4 m-2 p-1 border-blue-light" type="text" />


                <h1 className="text-xl font-semibold">Enter Price Per Stock</h1>
                <input onChange={(e)=>setPricePerStock(e.target.value)} className="mb-8 outline-none text-blue-bg font-semibold text-l rounded border-4 m-2 p-1 border-blue-light" type="number" />


                <h1 className="text-xl font-semibold">Enter Inital Stock</h1>
                <input onChange={(e)=>setInitalStock(e.target.value)} className="outline-none text-blue-bg font-semibold text-l rounded border-4 m-2 p-1 border-blue-light" type="number" />

            </div>
            <div className="flex justify-center">
                <button onClick={()=>{
                    StocksDB.getItem("Stocks").then(items=>{
                        items.push({
                            name:productName,
                            pricePerStock:pricePerStock,
                            stocks:InitalStock
                        })
                        console.log(items);
                        StocksDB.setItem("Stocks",items);
                        history.goBack();
                    })
                }} className="rounded bg-blue-dark p-2">Procced</button>
            </div>

        </div>
    )
}
