import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FormField from "../components/FormField";
import { fetchUser, saveUser } from "../services/userService";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
  status: "",
  company: "",
  city: "",
  zipcode: "",
};

export default function UserForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const existingUser = location.state || null;

  const cleanPhone = (phone) => {
    if (!phone) return "";
    return phone.replace(/\D/g, "").slice(0, 10);
  };

  const [form, setForm] = useState(() =>
    existingUser
      ? {
          name: existingUser.name || "",
          email: existingUser.email || "",
          phone: cleanPhone(existingUser.phone),
          address: existingUser.address || "",
          status: existingUser.status || "",
          company: existingUser.company || "",
          city: existingUser.city || "",
          zipcode: existingUser.zipcode || "",
        }
      : emptyForm
  );

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(isEditMode && !existingUser);

  useEffect(() => {
    if (!isEditMode || existingUser) return;

    setLoading(true);
    fetchUser(id)
      .then((user) => {
        setForm({
          name: user.name || "",
          email: user.email || "",
          phone: cleanPhone(user.phone),
          address: user.address || "",
          status: user.status || "",
          company: user.company || "",
          city: user.city || "",
          zipcode: user.zipcode || "",
        });
      })
      .finally(() => setLoading(false));
  }, [id, isEditMode, existingUser]);

  const handleChange = (field, value) => {
    let updatedValue = value;
    if (field === "phone") updatedValue = value.replace(/\D/g, "").slice(0, 10);

    setForm((prev) => ({ ...prev, [field]: updatedValue }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = "Name is required";
    if (!form.email.trim()) err.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = "Enter a valid email";
    if (!form.phone.trim()) err.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(form.phone)) err.phone = "Phone must be 10 digits";
    if (!form.address.trim()) err.address = "Address is required";
    if (!form.status) err.status = "Status is required";
    else if (!["Active", "Inactive"].includes(form.status)) err.status = "Invalid status";
    if (!form.company.trim()) err.company = "Company is required";
    if (!form.city.trim()) err.city = "City is required";
    if (!form.zipcode.trim()) err.zipcode = "Zip code is required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const userData = {
      ...(existingUser || {}),
      ...form,
      id: existingUser?.id || id || Date.now(),
      username: existingUser?.username || form.name.toLowerCase().trim().replace(/\s+/g, "."),
    };

    saveUser(userData);
    navigate("/", {
      state: {
        toastMessage: existingUser ? "User updated successfully" : "User created successfully",
      },
    });
  };

  if (loading) {
    return <p className="text-slate-300">Loading user data...</p>;
  }

  return (
    <div className="mx-auto w-full max-w-6xl overflow-x-hidden">
      <div className="w-full rounded-2xl border border-white/10 bg-slate-900/60 p-6 text-white backdrop-blur md:p-8">
        <div>
          <h2 className="text-2xl font-semibold">{isEditMode ? "Edit User" : "Create User"}</h2>
        </div>

        <div className="mt-7">
          <div className="grid gap-x-5 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
          <FormField
            label="Full Name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            error={errors.name}
          />
          <FormField
            label="Email Address"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            error={errors.email}
          />
          <FormField
            label="Phone Number"
            value={form.phone}
            maxLength={10}
            onChange={(e) => handleChange("phone", e.target.value)}
            error={errors.phone}
          />
          <FormField
            label="Address"
            value={form.address}
            onChange={(e) => handleChange("address", e.target.value)}
            error={errors.address}
          />
          <FormField
            label="Status"
            as="select"
            value={form.status}
            onChange={(e) => handleChange("status", e.target.value)}
            error={errors.status}
          >
            <option value="">Select Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </FormField>
          <FormField
            label="Company"
            value={form.company}
            onChange={(e) => handleChange("company", e.target.value)}
            error={errors.company}
          />
          <FormField
            label="City"
            value={form.city}
            onChange={(e) => handleChange("city", e.target.value)}
            error={errors.city}
          />
          <FormField
            label="Zip Code"
            value={form.zipcode}
            onChange={(e) => handleChange("zipcode", e.target.value)}
            error={errors.zipcode}
          />
          </div>
        </div>

        <div className="mt-8 flex justify-between border-t border-white/10 pt-5">
          <button
            onClick={() => navigate("/")}
            className="rounded-xl border border-slate-600 px-5 py-2 text-slate-300 transition hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-6 py-2 text-white transition hover:brightness-110"
          >
            Save User
          </button>
        </div>
      </div>
    </div>
  );
}