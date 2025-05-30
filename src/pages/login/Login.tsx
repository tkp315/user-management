import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import useApiCall from "@/hooks/useApiCall";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateStatus } from "@/redux/slice/user";
import { RootState } from "@/redux/store";
import { BASE_URL } from "@/lib/apiUtils";

// Validation Schema using zod lib
const loginSchema = z.object({
  email: z
    .string({ message: "EMAIL IS REQUIRED" })
    .email({ message: "INVALID EMAIL ADDRESS" }),
  password: z.string().nonempty({ message: "PASSWORD IS REQUIRED" }),
});

type LoginForm = z.infer<typeof loginSchema>; // This will be type of Login Form

function Login() {
  const [showPassword, setShowPassword] = useState(false); // for toggling password
  const apiCaller = useApiCall(); // custom hook for api calling
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn); // user login status

  // function to toggle visibility
  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  // using useForm hook for form and zod resolver for validation
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const { formState } = form; // Taking form state

  const dispatch = useDispatch(); // initiate dispatch hook for updating values in store

  // Form Data submission function
  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    const url = `${BASE_URL}/login`;
    const res = await apiCaller(url, axios.post, data);
    console.log(res);
    if (res) {
      dispatch(updateStatus({ isLoggedIn: true })); // updating value of isLoggedIn in store
      window.sessionStorage.setItem("token", res.token); // storing token in session storage
      form.reset(); // reseting form when res.status==200 written in custom hook
    }
  };

  return (
    // toggling dialog according to loggedin status
    <Dialog open={!isLoggedIn}>
      <DialogTrigger>
        <Button variant="default" className=" cursor-pointer">
          Login
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome Back!</DialogTitle>
          <DialogDescription>
            Please enter your login credentials to access your account
          </DialogDescription>
        </DialogHeader>
        {/* ShadCN FormProvider  */}
        <FormProvider {...form}>
          <form
            noValidate
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-3 flex flex-col gap-4"
          >
            {/* Form Field for email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-semibold">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter your email"
                      className={`
            w-full px-4 py-2 border rounded-lg transition-all duration-300
            ${
              fieldState.invalid
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }
            focus:outline-none focus:ring-2
          `}
                    />
                  </FormControl>

                  {formState.errors.email && (
                    <FormMessage className="text-red-500 text-sm flex items-center mt-1">
                      {fieldState.error?.message || "INVALID EMAIL FORMAT"}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
            {/* Form Field for password with toggle visibility */}
            <div className="relative">
              <FormField
                control={form.control}
                name="password"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className={`
            w-full px-4 py-2 border rounded-lg transition-all duration-300 
            ${
              fieldState.invalid
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }
            focus:outline-none focus:ring-2
          `}
                      />
                    </FormControl>

                    {formState.errors.password && (
                      <FormMessage className="text-red-500 text-sm flex items-center mt-1">
                        {fieldState.error?.message || "INVALID PASSWORD FORMAT"}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <button
                onClick={handleShowPassword}
                type="button"
                className="absolute text-blue-500 cursor-pointer hover:text-blue-600 right-2 bottom-0 transform -translate-y-1/2  transition-all "
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            {/* Form Submission Button */}
            <Button
              type="submit"
              disabled={formState.isSubmitting}
              className="mt-4 w-full bg-blue-600 text-white cursor-pointer py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </>
              ) : (
                "Login "
              )}
            </Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}

export default Login;
