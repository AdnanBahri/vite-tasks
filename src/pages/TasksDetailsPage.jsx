import { useParams } from "react-router-dom";
import BackButton from "../components/back-arrow";
import { Button } from "../components/ui/button";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Spinner } from "react-activity";
import {
  ArrowDownNarrowWide,
  ArrowUpNarrowWide,
  ChevronRight,
  Edit,
  PlusIcon,
  Trash2,
} from "lucide-react";
import Task from "../components/task";
import { AlertDialog } from "../components/confirmation-dialog";
import { deleteTask, getSubCollections } from "../redux/slices/groupSclice";
import CreateUpdateDialog from "../components/create-update-dialog";
import { CardTitle } from "../components/ui/card";

const TasksDetailsPage = () => {
  const [filter, setFilter] = useState("All");
  const [isAscending, setIsAscending] = useState(false);
  const { listName, groupId } = useParams();
  const dispatch = useDispatch();
  const { subCollections, loading } = useSelector((state) => state.groups);
  const { user } = useSelector((state) => state.auth);

  const removeTask = (task) => {
    dispatch(deleteTask({ task, user, listName, category: groupId }));
  };
  const sortAsc = (a, b) =>
    Number(a["created-at"].toDate().getTime()) -
    Number(b["created-at"].toDate().getTime());
  const sortDesc = (a, b) =>
    Number(b["created-at"].toDate().getTime()) -
    Number(a["created-at"].toDate().getTime());

  useEffect(() => {
    if (!subCollections)
      dispatch(getSubCollections({ user, category: groupId }));
  }, [subCollections]);

  return (
    <div className="min-h-screen w-full max-w-7xl mx-auto px-6 lg:px-8 2xl:px-0 pt-16">
      {/* Header */}
      <div className="py-4 flex flex-col">
        <BackButton num={-1}>Back to {groupId}</BackButton>
        <CardTitle className="mt-6">{listName}</CardTitle>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-x-1 text-orange-400 text-xs sm:text-sm font-medium">
            <span className="text-foreground">{groupId}</span>
            <ChevronRight size={14} />
            <span>{listName}</span>
          </div>
          <div className="flex gap-x-2">
            <CreateUpdateDialog
              action="create"
              category={groupId}
              listName={listName}
            >
              <Button
                variant="ghost"
                size="sm"
                className="inline-flex items-center gap-x-2"
              >
                <PlusIcon size={20} /> <span>New Task</span>
              </Button>
            </CreateUpdateDialog>
          </div>
        </div>
      </div>
      {/* Filters */}
      <div className="flex items-center gap-x-4 pb-8 text-orange-400">
        <Button
          onClick={() => setFilter("All")}
          variant={filter !== "All" ? "ghost" : "secondary"}
          size={"lg"}
        >
          All
        </Button>
        <Button
          onClick={() => setFilter("Completed")}
          variant={filter !== "Completed" ? "ghost" : "secondary"}
          size={"lg"}
        >
          Completed
        </Button>
        <Button
          variant={"link"}
          size={"lg"}
          onClick={() => setIsAscending((prev) => !prev)}
        >
          {isAscending ? (
            <ArrowUpNarrowWide size={18} />
          ) : (
            <ArrowDownNarrowWide size={18} />
          )}
        </Button>
      </div>
      {/* Tasks List Container */}
      {loading && (
        <div className="absolute top-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2">
          <Spinner
            className="text-foreground"
            size={20}
            speed={1}
            animating={true}
          />
        </div>
      )}
      {subCollections && !loading && (
        <div className="w-full max-w-md flex flex-col gap-y-2">
          {subCollections
            .filter((item) => item.listName === listName)[0]
            .items.filter((item) => {
              if (filter === "Completed" && item["completed"]) return item;
              else if (filter === "All") return item;
            })
            .sort(isAscending ? sortAsc : sortDesc)
            .map((item, index) => (
              <Task key={index.toString()} task={item}>
                <CreateUpdateDialog
                  action={"update"}
                  category={groupId}
                  listName={listName}
                  task={item}
                >
                  <Edit size={20} className="cursor-pointer" />
                </CreateUpdateDialog>
                <AlertDialog action={() => removeTask(item)}>
                  <button>
                    <Trash2 size={20} className="cursor-pointer" />
                  </button>
                </AlertDialog>
              </Task>
            ))}
          {!subCollections && !loading && <p className=""></p>}
        </div>
      )}
    </div>
  );
};
export default TasksDetailsPage;
