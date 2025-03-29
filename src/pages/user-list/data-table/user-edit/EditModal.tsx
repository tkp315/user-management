import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useApiCall from "@/hooks/useApiCall";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserI } from "../columns";

interface EditModalProp {
  userDetails: UserI
}

const fields = [
  {
    name: "first_name",
    type: "text",
    label: "First Name",
  },
  {
    name: "last_name",
    type: "text",
    label: "Last Name",
  },
  {
    name: "email",
    type: "email",
    label: "Email",
  },
];

const editSchema = z.object({
  email: z
    .string({ message: "EMAIL IS REQUIRED" })
    .email({ message: "INVALID EMAIL ADDRESS" }),
  first_name: z.string().nonempty({message:"FIRST NAME IS REQUIRED"}),
  last_name: z.string().nonempty({ message: "LAST NAME IS REQUIRED" }),
});

type EditForm = z.infer<typeof editSchema>;

function EditModal({ userDetails }: EditModalProp) {

  const [isEditted, setIsEditted] = useState(false);

  const apiCaller = useApiCall();

  const form = useForm({
    defaultValues: {
      first_name: userDetails.first_name,
      last_name: userDetails.last_name,
      email: userDetails.email,
    },
    resolver: zodResolver(editSchema),
  });

  const { formState } = form;

  const onSubmit: SubmitHandler<EditForm> = async (data) => {
    const url = `https://reqres.in/api/users/${userDetails.id}`;
    const res = await apiCaller(url, axios.put, data);
    if (res) {
      setIsEditted(false);
      form.reset()
    }
  };

  return (
    <Dialog onOpenChange={setIsEditted} open={isEditted}>
      <DialogTrigger className="">
        <Button variant="outline" size="sm" className="w-full">
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Your Profile Details</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account You can update your <strong>First Name</strong>,{" "}
            <strong>Last Name</strong>, and <strong>Email</strong>
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>
          <form
            className="mt-3 flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-2">
              {fields.map((item, idx) => (
                <div className="flex flex-col gap-1" key={idx}>
                  <FormField
                    key={idx}
                    control={form.control}
                    name={item.name as keyof EditForm}
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-semibold">
                          {item.label}
                        </FormLabel>
                        <FormControl>
                          <Input
                          defaultValue={userDetails[field.name]}
                            {...field}
                            type={item.type}
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

                        {formState?.errors[item.name as keyof EditForm] && (
                          <FormMessage className="text-red-500 text-sm flex items-center mt-1">
                            {fieldState.error?.message ||
                              "INVALID EMAIL FORMAT"}
                          </FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                </div>
              ))}
              <Button
                type="submit"
                disabled={formState.isSubmitting}
                className="mt-4 w-full bg-blue-600 text-white cursor-pointer py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {formState.isSubmitting ? (
                  <>
                    <Loader2 className=" animate-spin" /> Adding changes..
                  </>
                ) : (
                  "Add Changes"
                )}
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}

export default EditModal;
