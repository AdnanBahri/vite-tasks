import { Card, CardContent } from "../ui/card";
import { Checkbox } from "../ui/checkbox";

const Task = ({ task, children }) => {
  return (
    <Card>
      <CardContent className="p-0 py-4 px-6 flex items-center gap-x-4">
        <Checkbox checked={task["completed"]} />
        <p className={`flex-1 ${task["completed"] && "line-through"}`}>
          {task["task"]}
        </p>
        {children}
      </CardContent>
    </Card>
  );
};
export default Task;
