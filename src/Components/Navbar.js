import { Link } from 'react-router-dom';

export default function Navbar({whichTabIsOpened}) {
    return(
      <nav className="navbar m-5 text-left">
        <h1 className="text-3xl font-semibold">Sahib Dairy App</h1>
        <div className="mt-5">
          <Link to="/"><button className={whichTabIsOpened === 1 ? "ml-5 rounded bg-blue-light p-2 pr-4 pl-4 font-bold text-lg" : "ml-5 rounded bg-blue-dark p-2 pr-4 pl-4 font-bold text-lg"}>Billing</button></Link>
          <Link to="/invoices"><button className={whichTabIsOpened === 2 ? "ml-5 rounded bg-blue-light p-2 pr-4 pl-4 font-bold text-lg" : "ml-5 rounded bg-blue-dark p-2 pr-4 pl-4 font-bold text-lg"}>Invoices</button></Link>
          <Link to="/facts"><button className={whichTabIsOpened === 3 ? "ml-5 rounded bg-blue-light p-2 pr-4 pl-4 font-bold text-lg" : "ml-5 rounded bg-blue-dark p-2 pr-4 pl-4 font-bold text-lg"}>Facts</button></Link>
          <Link to="/stocks"><button className={whichTabIsOpened === 4 ? "ml-5 mt-2 rounded bg-blue-light p-2 pr-4 pl-4 font-bold text-lg" : "ml-5 mt-2 rounded bg-blue-dark p-2 pr-4 pl-4 font-bold text-lg"}>Stocks</button></Link>
        </div>
      </nav>
    )
}
