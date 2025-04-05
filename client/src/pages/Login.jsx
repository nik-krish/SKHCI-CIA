import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button, Loading, Textbox } from "../components";
import { useLoginMutation } from "../redux/slices/api/authApiSlice";
import { setCredentials } from "../redux/slices/authSlice";
import { useEffect } from "react";

const Login = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (data) => {
    try {
      const res = await login(data).unwrap();
      dispatch(setCredentials(res));
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    user && navigate("/dashboard");
  }, [user]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-10 p-6">
        {/* Left Side - Branding */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-center space-y-8">
          <div className="flex flex-col items-center lg:items-start gap-6 text-center lg:text-left">
            <span className="inline-block py-2 px-4 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 rounded-full text-sm font-medium">
              BY NIKHIL
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              <span className="block">Task Management System</span>
            </h1>
          </div>

          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full opacity-20 blur-xl animate-pulse"></div>
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="w-3/4 h-3/4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                <div className="w-1/2 h-1/2 bg-white/30 rounded-full backdrop-blur-sm"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
            <div className="p-8 sm:p-10">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Welcome Back
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Sign in to access your dashboard
                </p>
              </div>

              <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
                <div className="space-y-4">
                  <Textbox
                    placeholder="email@example.com"
                    type="email"
                    name="email"
                    label="Email Address"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    register={register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    error={errors.email?.message}
                  />

                  <Textbox
                    placeholder="••••••••"
                    type="password"
                    name="password"
                    label="Password"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    register={register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 0,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    error={errors.password?.message}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <a
                    href="#"
                    className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>

                <Button
                  type="submit"
                  label={isLoading ? "Signing in..." : "Sign In"}
                  className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                  disabled={isLoading}
                >
                  {isLoading && <Loading className="mr-2" />}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Don't have an account?{" "}
                  <a
                    href="#"
                    className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
                  >
                    Get started
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
