import { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Edit, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { AlertDialog } from "../confirmation-dialog";
import CreateUpdateDialog from "../create-update-dialog";

const Task = ({ task, children }) => {
  return (
    <Card>
      <CardContent className="p-0 py-4 px-6 flex items-center gap-x-4">
        <Checkbox checked={task["completed"]} />
        <p className="flex-1">{task["task"]}</p>
        {children}
      </CardContent>
    </Card>
  );
};
export default Task;
