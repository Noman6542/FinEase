import { use, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../Provider/AuthProvider";
import { motion } from "framer-motion";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const AddTransaction = () => {
  const { user } = use(AuthContext);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(""); // track selected type

  const handleAddTransaction = (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const category = form.category.value.trim();
    const amount = parseFloat(form.amount.value);
    const description = form.description.value.trim();
    const date = form.date.value;
    const userEmail = user?.email;
    const userName = user?.displayName;

    if (!type || !category || !amount || !description || !date) {
      toast.error("Please fill in all fields.");
      setLoading(false);
      return;
    }

    const newTransaction = {
      type,
      category,
      amount,
      description,
      date,
      userEmail,
      userName,
      createdAt: new Date(),
    };

    fetch("https://fin-ease-server-site.vercel.app/finease-data", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newTransaction),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data._id || data.insertedId) {
          toast.success("Transaction added successfully!");
          form.reset();
          setType(""); // reset type
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error(`Failed to add transaction! ${err.message}`);
      });
  };

  // Dynamic preview colors & icons
  const typeColor = type === "Income" ? "bg-green-100 text-green-600" : type === "Expense" ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-400";
  const TypeIcon = type === "Income" ? FaArrowUp : type === "Expense" ? FaArrowDown : null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
          Add New Transaction
        </h2>

        <form onSubmit={handleAddTransaction} className="space-y-4">
          {/* Transaction Type with preview */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <select
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="select select-bordered w-full focus:ring-2 focus:ring-indigo-400 focus:border-indigo-600 transition"
              required
            >
              <option value="">Select Type</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>

            {/* Icon preview */}
            {TypeIcon && (
              <div className={`absolute top-2 right-2 w-10 h-10 flex items-center justify-center rounded-full ${typeColor}`}>
                <TypeIcon className="text-xl" />
              </div>
            )}
          </motion.div>

          {/* Category */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <input
              type="text"
              name="category"
              placeholder="Category (e.g. Food, Salary)"
              className="input input-bordered w-full focus:ring-2 focus:ring-indigo-400 focus:border-indigo-600 transition"
              required
            />
          </motion.div>

          {/* Amount */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <input
              type="number"
              name="amount"
              placeholder="Amount (TK)"
              className="input input-bordered w-full focus:ring-2 focus:ring-indigo-400 focus:border-indigo-600 transition"
              required
            />
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <textarea
              name="description"
              placeholder="Description"
              className="textarea textarea-bordered w-full focus:ring-2 focus:ring-indigo-400 focus:border-indigo-600 transition"
              required
            ></textarea>
          </motion.div>

          {/* Date */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <input
              type="date"
              name="date"
              className="input input-bordered w-full focus:ring-2 focus:ring-indigo-400 focus:border-indigo-600 transition"
              required
            />
          </motion.div>

          {/* User Info */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <input
              type="text"
              value={user?.displayName || ""}
              className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
              readOnly
            />
            <input
              type="email"
              value={user?.email || ""}
              className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
              readOnly
            />
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <button
              type="submit"
              className="btn btn-gradient w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold hover:from-indigo-600 hover:to-purple-600 transition transform hover:scale-105"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Transaction"}
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddTransaction;
