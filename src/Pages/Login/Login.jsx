import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="h-[500px] flex justify-center items-center my-32">
      <div className="w-96 card shadow-2xl p-8">
        <h2 className="text-4xl font-bold text-red-700 mb-4 text-center">
            Login System for user, Agent and Admin
        </h2>
        <form>
          
          <div className="form-control w-full max-w-xs my-6">
            <label className="label">
              <span className="label-text">Mobile Number/Email</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          
          <div className="form-control w-full max-w-xs mt-10 mb-6">
            <label className="label">
              <span className="label-text">5 digit PIN</span>
            </label>
            <input
              type="password"
              className="input input-bordered w-full max-w-xs"
            />
          </div>

          <input
            className="btn w-full text-red-700 my-4"
            type="submit"
            value="Login"
          />
        </form>
        <span className="text-sm my-2 text-center">
          Don't have an account{" "}
          <Link to="/register" className="text-red-700">
            Please Register
          </Link>{" "}
        </span>
      </div>
    </div>
  );
};

export default Login;
