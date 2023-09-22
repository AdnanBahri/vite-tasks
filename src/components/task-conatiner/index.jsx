import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Trash2 } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { useNavigate, useParams } from "react-router-dom";
import { AlertDialog } from "../confirmation-dialog";
import { useDispatch } from "react-redux";

const TasksContainer = ({ name, items, remove }) => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between text-md sm:text-lg ">
          <div className="flex items-center gap-x-2">
            <Checkbox checked={false} />
            <h3 className="font-semibold leading-none tracking-tight">
              {name}
            </h3>
          </div>
          <AlertDialog
            action={remove}
            message={`This will permanently delete ${name} and remove your data from our servers.`}
          >
            <button className="">
              <Trash2 size={20} />
            </button>
          </AlertDialog>
        </div>
      </CardHeader>
      {items && (
        <CardContent className="p-0 px-6">
          <div className="flex flex-col gap-y-2">
            {(items.length > 3 ? items.slice(0, 3) : items).map(
              (item, index) => (
                <div
                  key={index.toString()}
                  className="flex items-center gap-x-4"
                >
                  <Checkbox checked={item["completed"]} />
                  <CardDescription
                    className={`${item["completed"] && "line-through"}`}
                  >
                    {item["task"]}
                  </CardDescription>
                </div>
              )
            )}
          </div>
          {(!items || items.length === 0) && (
            <CardDescription>No Tasks here yet.</CardDescription>
          )}
        </CardContent>
      )}
      <CardFooter className="flex-1 items-end justify-end p-0 py-3 px-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => navigate(`/${groupId}/${name}`)}
        >
          View All
        </Button>
      </CardFooter>
    </Card>
  );
};
export default TasksContainer;
