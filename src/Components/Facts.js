import { InvoicesDB, StocksDB } from "../database";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

import Navbar from "./Navbar";

export default function Facts() {
    const date = new Date();

    const [mostSoldMonth, setMostSoldMonth] = useState([]);

    const [mostReturningCustomers, setMostReturningCustomers] = useState([]);
    const [listOfStocksLeft, setListOfStocksLeft] = useState([]);

    const [totalSaleOfYear, setTotalSaleOfYear] = useState(0);
    const [totalSaleOfMonth, setTotalSaleOfMonth] = useState(0);
    const [totalSaleOfDay, setTotalSaleOfDay] = useState(0);

    function count_duplicate(a) {
        let countsObject = {}
        let countsArray = []

        for (let i = 0; i < a.length; i++) {
            if (countsObject[a[i]]) {
                countsObject[a[i]] += 1
            } else {
                countsObject[a[i]] = 1
            }
        }
        for (const key in countsObject) {
            countsArray.push([countsObject[key], key]);
        }
        countsArray.sort();
        countsArray.reverse();
        return countsArray.filter(item => item[1] !== "");
    }

    useEffect(() => {
        InvoicesDB.getItem("Invoices").then(items => {
            let totalSaleOfYearTemp = 0;
            let totalSaleOfMonthTemp = 0;
            let totalSaleOfDayTemp = 0;

            items.forEach(item => {
                if (item.time.getYear() === date.getYear()) {
                    setMostSoldMonth(arr => [...arr, item.time.getMonth()]);
                    setMostReturningCustomers(arr => [...arr, item.customer]);

                    totalSaleOfYearTemp+=item.totalPrice;
                    if (item.time.getMonth() === date.getMonth()) {
                        totalSaleOfMonthTemp+=item.totalPrice;

                        if (item.time.getDay() === date.getDay()) {
                            totalSaleOfDayTemp+=item.totalPrice;
                        }
                    }
                }
            })

            setTotalSaleOfYear(totalSaleOfYearTemp);
            setTotalSaleOfMonth(totalSaleOfMonthTemp);
            setTotalSaleOfDay(totalSaleOfDayTemp);
        })

        StocksDB.getItem("Stocks").then(items => {
            items.forEach(item => {
                setListOfStocksLeft(arr => [...arr.sort(), [item.stocks, item.name]]);
            })
        })
    }, []);

    const getPieData = ()=>{
        let dataOne = [];
        let dataTwo = [];
        var monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"];

        count_duplicate(mostSoldMonth).forEach(item => {
            dataOne.push(item[0]);
            dataTwo.push(monthNames[item[1]]);
        })
        return [dataOne,dataTwo];
    }

    return (
        <div>
            <Navbar whichTabIsOpened={3} />

            <h1 className="m-4 font-semibold text-xl">Most Sold Products This Month</h1>
            <Pie data={{
                labels: getPieData()[1],
                datasets: [
                    {
                        data:getPieData()[0],
                        backgroundColor: [
                            'rgb(51, 144, 253)',
                            'rgb(111, 194, 255)',
                            'rgb(255, 215, 0)',
                            'rgb(75, 192, 192)',
                            'rgb(153, 102, 255)',
                            'rgb(255, 159, 64)',
                        ],
                        borderColor: [
                            'rgb(51, 144, 253)',
                            'rgb(111, 194, 255)',
                            'rgb(255, 215, 0)',
                            'rgb(75, 192, 192)',
                            'rgb(153, 102, 255)',
                            'rgb(255, 159, 64)',
                        ],
                        borderWidth: 1,
                    }
                ]
            }
            } />
            <div>
                <h1 className="m-2 text-xl"><span className="font-semibold">Total Sale of the Day :-</span> Rs.{totalSaleOfDay}</h1>
                <h1 className="m-2 text-xl"><span className="font-semibold">Total Sale of the Month :-</span> Rs.{totalSaleOfMonth}</h1>
                <h1 className="m-2 text-xl"><span className="font-semibold">Total Sale of the Year :-</span> Rs.{totalSaleOfYear}</h1>
                <h1 className="m-2 text-xl"><span className="font-semibold">Most Returning Customers :-</span> <ul className="ml-32">{count_duplicate(mostReturningCustomers).map((item, index) => <li className="list-disc" key={index}>{item[1]}</li>)}</ul></h1>
                <h1 className="m-2 text-xl"><span className="font-semibold">Stocks Left :-</span> <ul className="ml-32">{listOfStocksLeft.map((item, index) => <li className="list-disc" key={index}>{item[1]} - {item[0]}</li>)}</ul></h1>
            </div>
        </div>
    )
}
