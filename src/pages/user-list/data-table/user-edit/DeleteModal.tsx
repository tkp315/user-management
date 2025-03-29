import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useApiCall from "@/hooks/useApiCall";
import { BASE_URL } from "@/lib/apiUtils";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface DeleteModalProp {
  userId: number;
} // User Id for deleting

function DeleteModal({ userId }: DeleteModalProp) {
  const [isDeleted, setIsDeleted] = useState(false); // toggling dialog based on this
  const [isDeleting, setIsDeleting] = useState(false); // Loading based on this
  const apiCaller = useApiCall(); // custom hook for api calling

  // Delete Handler
  async function handleDelete() {
    setIsDeleting(true);
    try {
      const url = `${BASE_URL}/api/users/${userId}`;
      await apiCaller(url, axios.delete);

      setIsDeleted(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  }
  return (
    <Dialog onOpenChange={setIsDeleted} open={isDeleted}>
      <DialogTrigger>
        <Button variant="outline" size="sm" className="w-full">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            className=" cursor-pointer"
            onClick={handleDelete}
          >
            {isDeleting ? (
              <>
                <Loader2 className="animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteModal;
