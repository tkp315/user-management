import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios, { AxiosPromise, AxiosRequestConfig } from "axios";
import { CheckCircle, XCircle } from "lucide-react";

type AxiosMethod = (url: string, config?:AxiosRequestConfig) => Promise<AxiosPromise>;

const useApiCall = () => {
  async function apiCall(
    url: string,
    axiosMethod: AxiosMethod,
    data?: object | File | null
  ) {
    const config = data ?  data  : undefined;
    const loadingToast = toast("Loading...", {
      description: (
        <div className="flex items-center space-x-2">
          <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
          <span>Please wait, processing your request.</span>
        </div>
      ),
      position: "bottom-right",
      duration: 2000,
    });

    try {
       
      const res =  await axiosMethod(url,config);
       console.log(res)
      if (res.status === 200||res.status===204) {
        toast.dismiss(loadingToast);
        toast("Success!", {
          description: (
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Request completed successfully.</span>
            </div>
          ),
          position: "bottom-right",
          duration: 2000,
        });
        return res.data;
      } else {
        toast.dismiss(loadingToast);
        toast("Failed!", {
          description: (
            <div className="flex items-center space-x-2">
              <XCircle className="w-4 h-4 text-red-500" />
              <span>{res.data.error || "Unexpected error occurred."}</span>
            </div>
          ),
          position: "bottom-right",
          duration: 2000,
        });
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      const errMessage =
        axios.isAxiosError(error) && error.response?.data?.error
          ? error.response.data.error
          : "An error occurred while processing your request.";
      toast("Failed!", {
        description: (
          <div className="flex items-center space-x-2">
            <XCircle className="w-4 h-4 text-red-500" />
            <span>{errMessage}</span>
          </div>
        ),
        position: "bottom-right",
        duration: 2000,
      });
    }
  }

  return apiCall;
};

export default useApiCall;
