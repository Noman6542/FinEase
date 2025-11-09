import React, { useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import { PacmanLoader } from "react-spinners";
import Swal from "sweetalert2";

const MyTransactions = () => {
  const { user, loading } = React.useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch logged-in user's transactions
  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:3000/finease-data?userEmail=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load transactions!");
        setIsLoading(false);
      });
  }, [user]);

  // Delete transaction
  const handleDelete = (id) => {
    Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) =>{
    if (result.isConfirmed) {

    fetch(`http://localhost:3000/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setTransactions(transactions.filter((tx) => tx._id !== id));
        toast.success("Transaction deleted successfully!");
      })
      .catch((err) => Swal.fire("Error!", `Failed to delete! ${err.message}`, "error"));
  }})};

  if (loading || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PacmanLoader color="#5e5feb" size={20} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto my-10 px-4">
      <h2 className="text-2xl font-bold mb-6">My Transactions</h2>

      {transactions.length === 0 ? (
        <p className="text-center text-gray-500">No transactions found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {transactions.map((tx) => (
            <div key={tx._id} className="card bg-base-100 shadow-md p-4 rounded-xl">
              <h3 className="font-semibold text-lg mb-1">{tx.category}</h3>
              <p><strong>Type:</strong> {tx.type}</p>
              <p><strong>Amount:</strong> ${tx.amount}</p>
              <p><strong>Date:</strong> {new Date(tx.date).toLocaleDateString()}</p>

              <div className="mt-4 flex gap-2">
                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => toast.info("Update functionality coming soon!")}
                >
                  Update
                </button>
                <button
                  className="btn btn-sm btn-error"
                  onClick={() => handleDelete(tx._id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => toast.info("View details coming soon!")}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  };

export default MyTransactions;
