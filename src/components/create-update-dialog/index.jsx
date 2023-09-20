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
import { createTask, updateTask } from "../../redux/slices/groupSclice";
import { useSelector } from "react-redux";
import { Checkbox } from "../ui/checkbox";

const CreateUpdateDialog = ({ children, action, category, listName, task }) => {
  const [todo, setTodo] = useState(action === "update" ? task["task"] : "");
  const [completed, setCompleted] = useState(
    action === "update" ? task["completed"] : false
  );
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleSubmit = () => {
    if (
      todo.trim().toLowerCase() !==
        task["task"].toString().trim().toLowerCase() ||
      completed !== task["completed"]
    ) {
      switch (action) {
        case "create":
          const item = {
            task: todo,
            completed: completed,
          };
          dispatch(createTask({ user, task: item, category, listName }));
          break;
        case "update":
          const newTask = {
            task: todo,
            completed: completed,
          };
          dispatch(
            updateTask({
              category,
              user,
              listName,
              oldTask: task,
              task: newTask,
            })
          );
          //   console.log("Update");
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
            {action === "create" ? "Create New Task" : "Update Task"}
          </DialogTitle>
          <DialogDescription>
            By Creating a new{" "}
            {action === "create" ? "List of Tasks" : "Collection"}, you can
            start adding tasks to this
            {action === "update" ? "list" : "collection"} only.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-4 items-center gap-x-4">
            <Label className="col-span-1">Task</Label>
            <Input
              id="task"
              value={todo}
              placeholder={"Something to do"}
              onChange={(e) => setTodo(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-x-4">
            <Label className="col-span-1">Completed</Label>
            <Checkbox
              checked={completed}
              onCheckedChange={(checked) => setCompleted(checked)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUpdateDialog;
