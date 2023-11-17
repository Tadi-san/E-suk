import { Link, useParams } from "react-router-dom";

export default function Catagorizer(){
    return (
        <div className=" flex gap-3 flex-wrap justify-center mt-10 mb-10 ">
    <Link to={'/Phones-&-Tablets'} className="w-32 h-20 bg-white hover:shadow-md  hover:shadow-blue-200 rounded-lg  shadow-sm border-blue-100 p-1 flex flex-col justify-center items-center">📳<h2> phones</h2></Link>
    <Link to={'/Vehicle'} className="w-32 h-20 bg-white hover:shadow-md  hover:shadow-blue-200 rounded-lg  shadow-sm border-blue-100 p-1 flex flex-col justify-center items-center">🚗<h2> Vehicles</h2></Link>
    <Link to={'/Electronics'} className="w-32 h-20 bg-white hover:shadow-md  hover:shadow-blue-200 rounded-lg  shadow-sm border-blue-100 p-1 flex flex-col justify-center items-center">🔌<h2> Electronics</h2></Link>
    <Link to={'.Beauty-products'} className="w-32 h-20 bg-white hover:shadow-md  hover:shadow-blue-200 rounded-lg  shadow-sm border-blue-100 p-1 flex flex-col justify-center items-center">💅<h2> Beauty  products</h2></Link>
    <Link to={'/Clothes'} className="w-32 h-20 bg-white hover:shadow-md  hover:shadow-blue-200 rounded-lg  shadow-sm border-blue-100 p-1 flex flex-col justify-center items-center">👕<h2> Clothes</h2></Link>
    <Link to={'/Gifts'} className="w-32 h-20 bg-white hover:shadow-md  hover:shadow-blue-200 rounded-lg  shadow-sm border-blue-100 p-1 flex flex-col justify-center items-center">🎁<h2> Gifts</h2></Link>
    <Link to={'/Pets'} className="w-32 h-20 bg-white hover:shadow-md  hover:shadow-blue-200 rounded-lg  shadow-sm border-blue-100 p-1 flex flex-col justify-center items-center">🐕<h2> Pets</h2></Link>
    <Link to={'/Food'} className="w-32 h-20 bg-white hover:shadow-md  hover:shadow-blue-200 rounded-lg  shadow-sm border-blue-100 p-1 flex flex-col justify-center items-center">🍔<h2> Food</h2></Link>
    <Link to={'/Sport-&-Art'} className="w-32 h-20 bg-white hover:shadow-md  hover:shadow-blue-200 rounded-lg  shadow-sm border-blue-100 p-1 flex flex-col justify-center items-center">⚽🎨<h2> Sport & Art</h2></Link>
    <Link to={'/Other'} className="w-32 h-20 bg-white hover:shadow-md  hover:shadow-blue-200 rounded-lg  shadow-sm border-blue-100 p-1 flex flex-col justify-center items-center">🧐<h2> Other</h2></Link>
</div>
    )
}