import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleSignUp = async (data) => {
    console.log(data)
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Registration Successful!");
        navigate("/login");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Registration Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="h-[500px] flex justify-center items-center my-32">
      <div className="w-96 card shadow-2xl p-8">
        <h2 className="text-4xl font-bold text-red-700 mb-4 text-center">
          Registration System for User & Agent
        </h2>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              {...register("name", { required: "Please provide your name" })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">5-digit PIN</span>
            </label>
            <input
              type="password"
              {...register("pin", {
                required: "PIN is required",
                minLength: { value: 5, message: "PIN must be 5 digits" },
                maxLength: { value: 5, message: "PIN must be 5 digits" },
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.pin && (
              <p className="text-red-500 text-sm">{errors.pin.message}</p>
            )}
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Mobile Number</span>
            </label>
            <input
              type="text"
              {...register("mobile", {
                required: "Mobile number is required",
                pattern: {
                  value: /^[0-9]{11}$/,
                  message: "Invalid mobile number (must be 11 digits)",
                },
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm">{errors.mobile.message}</p>
            )}
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="form-control w-full max-w-xs my-4">
            <label className="label">
              <span className="label-text">Account Type</span>
            </label>
            <select
              {...register("accountType")}
              className="select select-bordered w-full max-w-xs"
            >
              <option value="agent">Agent</option>
              <option value="user">User</option>
            </select>
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">NID</span>
            </label>
            <input
              type="text"
              {...register("nid", {
                required: "NID is required",
                pattern: {
                  value: /^[0-9]{10,17}$/,
                  message: "NID must be 10-17 digits",
                },
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.nid && (
              <p className="text-red-500 text-sm">{errors.nid.message}</p>
            )}
          </div>

          <input
            className="btn w-full text-red-700 my-4"
            type="submit"
            value="Register"
          />
        </form>
        <span className="text-sm my-2 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-red-700">
            Please Login
          </Link>{" "}
        </span>
      </div>
    </div>
  );
};

export default Register;
