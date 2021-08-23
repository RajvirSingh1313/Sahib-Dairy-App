import Navbar from "./Navbar";
import { useParams } from "react-router";
import { useState,useEffect } from "react";
import { StocksDB } from "../database";
import { useHistory } from "react-router-dom";

export default function EditStocks() {
    const { id } = useParams();
    const [productName, setProductName] = useState("");
    const [pricePerStock, setPricePerStock] = useState(0);
    const [InitalStock, setInitalStock] = useState(0);

    const history = useHistory();

    useEffect(() => {
        StocksDB.getItem("Stocks").then(items=>{
            setProductName(items[id].name);
            setPricePerStock(items[id].pricePerStock);
            setInitalStock(items[id].stocks);
        })
    },[])

    return (
        <div>
            <Navbar whichTabIsOpened={4} />

            <div className="flex justify-center flex-col m-5 mt-8">
                <h1 className="text-xl font-semibold">Enter Product Name</h1>
                <input value={productName} onChange={(e)=>setProductName(e.target.value)} className="mb-8 outline-none text-blue-bg font-semibold text-l rounded border-4 m-2 p-1 border-blue-light" type="text" />


                <h1 className="text-xl font-semibold">Enter Price Per Stock</h1>
                <input value={pricePerStock} onChange={(e)=>setPricePerStock(e.target.value)} className="mb-8 outline-none text-blue-bg font-semibold text-l rounded border-4 m-2 p-1 border-blue-light" type="number" />


                <h1 className="text-xl font-semibold">Enter Inital Stock</h1>
                <input value={InitalStock} onChange={(e)=>setInitalStock(e.target.value)} className="outline-none text-blue-bg font-semibold text-l rounded border-4 m-2 p-1 border-blue-light" type="number" />

            </div>

            <div className="flex justify-center">
                <button onClick={()=>{
                    StocksDB.getItem("Stocks").then(items=>{
                        items[id] = {
                            name:productName,
                            pricePerStock:pricePerStock,
                            stocks:InitalStock
                        }
                        console.log(items);
                        StocksDB.setItem("Stocks",items);
                        history.goBack();
                    })
                }} className="rounded bg-blue-dark p-2">Procced</button>
            </div>

        </div>
    )
}
