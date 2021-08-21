import { InvoicesDB } from "../database";
import Navbar from "./Navbar"
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function Invoices() {
    let [data, setData] = useState([]);
    let [selectedOption, setSelectedOption] = useState("Product Name");
    const date = new Date();
    let [startDate, setStartDate] = useState(new Date(date.getFullYear(), date.getMonth(), 1));
    let [endDate, setEndDate] = useState(new Date(date.getFullYear(), date.getMonth() + 1, 0));

    function convertToCSV(objArray) {
        var array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
        var str = '';

        for (var i = 0; i < array.length; i++) {
            var line = '';
            for (var index in array[i]) {
                if (line !== '') line += ','

                line += array[i][index];
            }

            str += line + '\r\n';
        }

        return str;
    }

    function exportCSVFile(headers, items, fileTitle) {
        if (headers) {
            items.unshift(headers);
        }

        // Convert Object to JSON
        var jsonObject = JSON.stringify(items);

        var csv = convertToCSV(jsonObject);

        var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

        var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, exportedFilenmae);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", exportedFilenmae);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }

    const fetch = async () => {
        await InvoicesDB.getItem("Invoices").then(items => {
            items.reverse();
            items.forEach(item => {
                if (!startDate < item.time && !endDate > item.time) {
                    items.remove(item);
                }
            })
            setData(items);
        });
    }

    useEffect(() => {
        fetch();
    }, []);

    return (
        <div>
            <Navbar whichTabIsOpened={2} />

            <div className="ml-6">

                <div className="flex mb-2">
                    <h1 className="mt-2 mr-2">From</h1>
                    <DatePicker className="font-semibold bg-blue-light p-2 rounded w-32" selected={startDate} onChange={(date) => {
                        setStartDate(date);
                        InvoicesDB.getItem("Invoices").then(items => {
                            items.reverse();
                            setData(items.filter(item => item.time > date));
                        });
                    }} />
                    <h1 className="mt-2 mr-2">To</h1>
                    <DatePicker className="font-semibold bg-blue-light p-2 rounded w-32" selected={endDate} onChange={(date) => {
                        setEndDate(date);
                        InvoicesDB.getItem("Invoices").then(items => {
                            items.reverse();
                            setData(items.filter(item => item.time < date));
                        });
                    }} />
                </div>

                <h1>Find By
                    <select onChange={e => setSelectedOption(e.target.value)} className="text-blue-bg font-semibold border-blue-light m-2 p-1 border-2 bg-blue-white rounded">
                        <option value="Product Name">Product Name</option>
                        <option value="Quantity">Quantity</option>
                        <option value="Total Price">Total Price</option>
                        <option value="Customer Name">Customer Name</option>
                    </select>
                </h1>

                {selectedOption === "Product Name" && <input className="outline-none p-1 rounded text-blue-bg border-2 border-blue-light" type="text" onChange={e => {
                    InvoicesDB.getItem("Invoices").then(items => {
                        items.reverse();
                        if (e.target.value !== "") {
                            setData(items.filter(item => item.productName.toLowerCase() === e.target.value.toLocaleLowerCase() && item.time > startDate && item.time < endDate));
                        } else {
                            setData(items.filter(item => item.time > startDate && item.time < endDate))
                        }
                    });
                }} />}
                {selectedOption === "Quantity" && <input className="outline-none p-1 rounded text-blue-bg border-2 border-blue-light" type="number" onChange={e => {
                    InvoicesDB.getItem("Invoices").then(items => {
                        items.reverse();
                        if (e.target.value !== "") {
                            setData(items.filter(item => item.quantity === e.target.value && item.time > startDate && item.time < endDate));
                        } else {
                            setData(items.filter(item => item.time > startDate && item.time < endDate))
                        }
                    });
                }} />}
                {selectedOption === "Total Price" && <input className="outline-none p-1 rounded text-blue-bg border-2 border-blue-light" type="number" onChange={e => {
                    InvoicesDB.getItem("Invoices").then(items => {
                        items.reverse();
                        if (e.target.value !== "") {
                            setData(items.filter(item => item.totalPrice === e.target.value && item.time > startDate && item.time < endDate));
                        } else {
                            setData(items.filter(item => item.time > startDate && item.time < endDate))
                        }
                    });
                }} />}
                {selectedOption === "Customer Name" && <input className="outline-none p-1 rounded text-blue-bg border-2 border-blue-light" type="text" onChange={e => {
                    InvoicesDB.getItem("Invoices").then(items => {
                        items.reverse();
                        if (e.target.value !== "") {
                            setData(items.filter(item => item.customer.toLowerCase() === e.target.value.toLocaleLowerCase() && item.time > startDate && item.time < endDate));
                        } else {
                            setData(items.filter(item => item.time > startDate && item.time < endDate))
                        }
                    });
                }} />}

            </div>

            <table className="m-2">
                <thead>
                    <tr>
                        <th className="border border-blue-dark bg-blue-light p-2 text-xs">Product Name</th>
                        <th className="border border-blue-dark bg-blue-light p-2 text-sm">Quantity</th>
                        <th className="border border-blue-dark bg-blue-light p-2 text-sm">Total Price</th>
                        <th className="border border-blue-dark bg-blue-light p-2 text-sm">Customer Name</th>
                        <th className="border border-blue-dark bg-blue-light p-2 text-sm">Time</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item =>
                        <tr>
                            <td className="border border-blue-dark bg-blue-white text-blue-bg text-l p-2">{item.productName}</td>
                            <td className="border border-blue-dark bg-blue-white text-blue-bg text-l p-2">{item.quantity}</td>
                            <td className="border border-blue-dark bg-blue-white text-blue-bg text-l p-2"><span className="text-xs">Rs.</span> {item.totalPrice}</td>
                            <td className="border border-blue-dark bg-blue-white text-blue-bg text-sm p-2">{item.customer}</td>
                            <td className="border border-blue-dark bg-blue-white text-blue-bg text-xs p-2">{`${item.time.getHours()}:${item.time.getMinutes()}:${item.time.getSeconds()} ------ ${item.time.getDate()}/${item.time.getMonth()}/${item.time.getFullYear()}`}</td>
                            <td className="border border-blue-dark bg-blue-white text-blue-bg text-xs p-2">{item.index}</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="flex w-full justify-center">
                <button className="rounded bg-blue-dark text-white p-2 m-2" onClick={() => {
                    var headers = {
                        index: "Index",
                        productName:"Product Name",
                        quantity: "Quantity",
                        customer:"Customer",
                        totalPrice:"Total Price",
                        time:"Time"
                    };

                    exportCSVFile(headers, data, "data"); // call the exportCSVFile() function to process the JSON and trigger the download

                }}>Download CSV</button>
            </div>
        </div>
    )
}
