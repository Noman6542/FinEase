import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import { PacmanLoader } from "react-spinners";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { motion } from "framer-motion";

const MyTransactions = () => {
  const { user, loading } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch transactions
  useEffect(() => {
    if (!user?.email) return;

    setIsLoading(true);
    fetch(
      `https://fin-ease-server-site.vercel.app/finease-data?userEmail=${user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);
        setIsLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load transactions");
        setIsLoading(false);
      });
  }, [user]);

  // Delete transaction
  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Transaction?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6366f1",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://fin-ease-server-site.vercel.app/delete/${id}`,
          { method: "DELETE" }
        )
          .then((res) => res.json())
          .then(() => {
            setTransactions((prev) =>
              prev.filter((tx) => tx._id !== id)
            );
            toast.success("Transaction deleted successfully");
          })
          .catch(() => {
            Swal.fire("Error!", "Failed to delete transaction", "error");
          });
      }
    });
  };

  // Loader
  if (loading || isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <PacmanLoader color="#6366f1" size={22} />
      </div>
    );
  }

  return (
    <section className="max-w-[1400px] mx-auto pt-10 ">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10 text-center"
      >
        <h2 className="text-3xl font-bold mb-2">My Transactions</h2>
        <p className="text-gray-500">
          View, manage, and track all your financial activities
        </p>
      </motion.div>

      {/* Empty State */}
      {transactions.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 mb-4">
            No transactions found.
          </p>
          <Link
            to="/add-transaction"
            className="btn btn-primary btn-sm"
          >
            Add Transaction
          </Link>
        </div>
      ) : (
        /* Cards */
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {transactions.map((tx, index) => (
            <motion.div
              key={tx._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-base-100 rounded-2xl p-5 shadow-md hover:shadow-xl transition"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-lg">
                  {tx.category}
                </h3>
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${
                    tx.type === "Income"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {tx.type}
                </span>
              </div>

              {/* Info */}
              <p className="text-sm text-gray-600 mb-1">
                Amount:
                <span className="font-semibold text-gray-900 ml-1">
                  ৳ {tx.amount}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Date:{" "}
                {new Date(tx.date).toLocaleDateString()}
              </p>

              {/* Actions */}
              <div className="mt-5 flex gap-2">
                <Link
                  to={`/transaction/${tx._id}`}
                  className="btn btn-sm btn-warning flex-1"
                >
                  Update
                </Link>

                <Link
                  to={`/details/${tx._id}`}
                  className="btn btn-sm btn-primary flex-1"
                >
                  Details
                </Link>

                <button
                  onClick={() => handleDelete(tx._id)}
                  className="btn btn-sm btn-error"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyTransactions;
