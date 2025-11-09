import { use, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../Provider/AuthProvider";

const AddTransaction = () => {
  const { user } = use(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleAddTransaction = (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const type = form.type.value;
    const category = form.category.value;
    const amount = parseFloat(form.amount.value);
    const description = form.description.value;
    const date = form.date.value;
    const userEmail = user?.email;
    const userName = user?.displayName;

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
    
    

    fetch("http://localhost:3000/finease-data", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data._id || data.insertedId) {
          toast.success("Transaction added successfully!");
          form.reset();
        }
      })
      .catch(err => {
        setLoading(false);
        toast.error(`Failed to add transaction! ${err.message}`);
      });
  };

  return (
    <div className="max-w-md mx-auto bg-base-100 shadow-xl p-6 rounded-xl my-10">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Add New Transaction
      </h2>
      <form onSubmit={handleAddTransaction} className="space-y-3">
        {/*  Transaction Type */}
        <select name="type" className="select select-bordered w-full" required>
          <option value="">Select Type</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>

        {/* Category */}
        <input
          type="text"
          name="category"
          placeholder="Category (e.g. Food, Salary)"
          className="input input-bordered w-full"
          required
        />

        {/*  Amount */}
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          className="input input-bordered w-full"
          required
        />

        {/*  Description */}
        <textarea
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered w-full"
          required
        ></textarea>

        {/*  Date */}
        <input
          type="date"
          name="date"
          className="input input-bordered w-full"
          required
        />

        {/*  User Info */}
        <input
          type="text"
          value={user?.displayName || ""}
          className="input input-bordered w-full"
          readOnly
        />
        <input
          type="email"
          value={user?.email || ""}
          className="input input-bordered w-full"
          readOnly
        />

        {/*  Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Transaction"}
        </button>
      </form>
    </div>
  );
};

export default AddTransaction;
