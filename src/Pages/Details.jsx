import { use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { PacmanLoader } from "react-spinners";
import { AuthContext } from "../Provider/AuthProvider";

const TransactionDetails = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const {user}=use(AuthContext);
  const [transaction, setTransaction] = useState(null);
  const [totalCategoryAmount, setTotalCategoryAmount] = useState(0);


  useEffect(() => {
    if (!id) return;
    fetch(`https://fin-ease-server-site.vercel.app/transactions/${id}`)
      .then((res) => res.json())
      .then((data) => setTransaction(data))
      .catch((err) => console.error("Error fetching transaction:", err));
  }, [id,user]);

  useEffect(() => {
    if (transaction?.category) {
    fetch(`https://fin-ease-server-site.vercel.app/transactions?category=${transaction.category}`) .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const total = Array.isArray(data)
          ? data.reduce((sum, t) => sum + t.amount, 0)
          : 0;
        setTotalCategoryAmount(total);
        })
        .catch((err) => console.error("Error fetching category total:", err));
    }
  }, [transaction,user]);

  if (!transaction)
    return (
      <div className="flex justify-center items-center h-screen">
        <PacmanLoader color="#5e5feb" size={20} />
      </div>
    );

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-xl border">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Transaction Details
      </h1>

      <div className="space-y-3">
        <div className="flex justify-between border-b pb-1">
          <span className="font-semibold text-gray-600">Type</span>
          <span className="text-gray-800">{transaction.type}</span>
        </div>

        <div className="flex justify-between border-b pb-1">
          <span className="font-semibold text-gray-600">Description</span>
          <span className="text-gray-800">{transaction.description}</span>
        </div>

        <div className="flex justify-between border-b pb-1">
          <span className="font-semibold text-gray-600">Amount</span>
          <span className="text-gray-800">TK {transaction.amount}</span>
        </div>

        <div className="flex justify-between border-b pb-1">
          <span className="font-semibold text-gray-600">Date</span>
          <span className="text-gray-800">
            {new Date(transaction.date).toLocaleDateString()}
          </span>
        </div>

        <div className="flex justify-between border-b pb-1">
          <span className="font-semibold text-gray-600">Category</span>
          <span className="text-gray-800">{transaction.category}</span>
        </div>

        <div className="flex justify-between mt-4 pt-2 border-t-4 border-red-500">
          <span className="font-semibold text-gray-600">
            Total in this Category
          </span>
          <span className="text-gray-800">TK : {totalCategoryAmount}</span>
        </div>
      </div>
       <button
        onClick={() => navigate(-1)} 
        className="mt-4 w-full bg-gray-300 hover:bg-gray-400 text-black py-2 rounded transition"
      >
        Back
      </button>
    </div>
  );
};

export default TransactionDetails;
