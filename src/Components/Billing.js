import Navbar from "./Navbar"
import { StocksDB, InvoicesDB } from "../database";
import { useEffect, useState } from "react";

export default function Billing() {
    let [products, setProducts] = useState([])

    let [stockLeft, setStockLeft] = useState();
    let [stockIsNotAvaiable, setStockIsNotAvaiable] = useState(" ");
    let [stockIsFinish, setStockIsFinish] = useState();

    let [productName, setProductName] = useState("Milk");
    let [quantity, setQuantity] = useState(0);
    let [customer, setCustomer] = useState("");
    let [totalPrice, setTotalPrice] = useState(0.00);
    let [isSubmitted, setIsSubmitted] = useState("");

    useEffect(() => {
        const fetch = async () => {
            await StocksDB.getItem("Stocks")
                .then(item => setProducts(item));
        }
        fetch();
    }, []);

    const handleChangeQuantity = e => {
        if (e.target.value <= 0) {
            setStockIsFinish("Wrong Input");
        } else {
            setStockIsFinish("")
        }
        setQuantity(e.target.value);
        products.forEach(element => {
            if (element.name === productName) {
                if (e.target.value >= element.stocks) {
                    setStockIsFinish("Stock is finished")
                } else {
                    setStockIsFinish("")
                }
                setStockLeft(element.stocks - e.target.value);
                setTotalPrice(e.target.value * element.pricePerStock);
            }
        })
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setIsSubmitted("Submitting");

        InvoicesDB.getItem("Invoices").then(item => {
            item.push({
                productName: productName,
                quantity: quantity,
                customer: customer,
                totalPrice: totalPrice,
                time: new Date(),
                index: item.length + 1,
            });
            InvoicesDB.setItem("Invoices", item);
        });

        products.forEach((element, index) => {
            if (element.name === productName) {
                element.stocks = stockLeft;
                StocksDB.setItem("Stocks", products);
            }
        })


        setIsSubmitted("Done");
        window.location = "/";
    }


    return (
        <div>
            <Navbar whichTabIsOpened={1} />

            <form className="m-10" onSubmit={handleSubmit}>
                <label>
                    <h2 className="text-2xl">Select a product</h2>
                    <h3 className="ml-2 m-2 text-blue-error font-bold text-xl">{stockIsNotAvaiable}</h3>
                    <select className="w-full outline-none text-blue-bg font-semibold text-l rounded border-4 mb-4 m-2 p-1 border-blue-light" onChange={e => {
                        setProductName(e.target.value);
                        products.forEach(element => {
                            if (element.name === e.target.value) {
                                if (element.stocks <= 0) {
                                    setStockIsNotAvaiable("Stock is not available");
                                }
                                else {
                                    setStockIsNotAvaiable("");
                                    setStockIsFinish("")
                                }
                            }
                        })
                    }}>
                        {products.map((product) => <option value={product.name} key={product.name}>{product.name}</option>)}
                    </select>
                </label>

                <label>
                    <h2 className="text-2xl">Select a quantity</h2>
                    <h3 className="ml-2 m-2 text-blue-error font-bold text-xl">{stockIsFinish}</h3>
                    <input className="w-full outline-none text-blue-bg font-semibold text-l rounded border-4 m-2 p-1 border-blue-light" type="number" default={0} value={quantity} onChange={e => handleChangeQuantity(e)} />
                </label>

                <h3 className="mb-4 ml-2">Stock left :- {stockLeft} Kg</h3>

                <label>
                    <h2 className="text-2xl">Enter Customer Name</h2>
                    <input className="w-full outline-none text-blue-bg font-semibold text-l rounded border-4 mb-4 m-2 p-1 border-blue-light" type="text" value={customer} onChange={e => setCustomer(e.target.value)} />
                </label>

                <h3 className="m-2 text-xl text-blue-success font-bold">{isSubmitted}</h3>
                <div className="flex flex-row">
                    <input className="rounded border-blue-light bg-blue-dark border-2 p-1 m-3 hover:border-blue-dark" type="submit" value="Submit" />
                    <h3 className="m-4 text-xl">Total Price :- Rs.{totalPrice}</h3>
                </div>
            </form>
        </div>
    )
}
