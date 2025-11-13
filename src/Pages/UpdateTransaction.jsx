import { use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../Provider/AuthProvider";

const UpdateTransaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {user}=use(AuthContext);
  const [formData, setFormData] = useState({
    type: "",
    description: "",
    category: "",
    amount: "",
    date: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://fin-ease-server-site.vercel.app/transactions/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          type: data.type,
          description: data.description,
          category: data.category,
          amount: data.amount,
          date: data.date.split("T")[0],
        });
        setLoading(false);
      })
      .catch(console.error);
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`https://fin-ease-server-site.vercel.app/transactions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...formData,
        amount: parseFloat(formData.amount),
      }),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Transaction updated successfully!");
        navigate(`/my-transaction`);
      })
      .catch(() => toast.error("Update failed!"));
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <section className="max-w-xl mx-auto mt-10 p-4 border rounded-lg">
      <p className="text-xl font-bold mb-4 text-center">Update Transaction</p>

      <form onSubmit={handleUpdate} className="space-y-3">
        <p>
          <span className="font-medium">Type:</span>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
                className="border p-1 rounded w-full mt-1 bg-[#0c2461] text-white focus:outline-none focus:ring-2 focus:ring-blue-400"

            required
          >
            <option value="">Select Type</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </p>

        <p>
          <span className="font-medium">Description:</span>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border p-1 rounded w-full mt-1"
            required
          />
        </p>

        <p>
          <span className="font-medium">Category:</span>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border p-1 rounded w-full mt-1"
            required
          />
        </p>

        <p>
          <span className="font-medium">Amount:</span>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="border p-1 rounded w-full mt-1"
            required
          />
        </p>

        <p>
          <span className="font-medium">Date:</span>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border p-1 rounded w-full mt-1"
            required
          />
        </p>

        <p>
          <button
            // onClick={() => navigate(-1)}
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mt-2"
          >
            Update
          </button>
        </p>
      </form>
    </section>
  );
};

export default UpdateTransaction;
