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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createGroup, createList } from "../../redux/slices/groupSclice";
import { useSelector } from "react-redux";

const CustomModal = ({ children, action, path }) => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleSubmit = () => {
    if (name.trim() !== "") {
      switch (action) {
        case "group":
          dispatch(createGroup({ name, user }));
          break;
        case "list":
          dispatch(createList({ name, category: path, user }));
          break;
        default:
          break;
      }
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Create New {action === "list" ? "List of Tasks" : "Collection"}
          </DialogTitle>
          <DialogDescription>
            By Creating a new{" "}
            {action === "list" ? "List of Tasks" : "Collection"}, you can start
            adding tasks to this
            {action === "list" ? "list" : "collection"} only.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              placeholder={action === "list" ? "Shooping List" : "Grocery"}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;
