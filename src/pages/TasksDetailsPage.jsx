import { useParams } from "react-router-dom";
import BackButton from "../components/back-arrow";
import { Card, CardContent, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import CustomDialog from "../components/groups-dialog";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Spinner } from "react-activity";
import { ChevronRight, Edit, PlusIcon, Trash2 } from "lucide-react";
import { Checkbox } from "../components/ui/checkbox";
import Task from "../components/task";
import { AlertDialog } from "../components/confirmation-dialog";
import { deleteTask, getSubCollections } from "../redux/slices/groupSclice";
import CreateUpdateDialog from "../components/create-update-dialog";

const TasksDetailsPage = () => {
  const { listName, groupId } = useParams();
  const dispatch = useDispatch();
  const { subCollections, loading } = useSelector((state) => state.groups);
  const { user } = useSelector((state) => state.auth);
  // const list = subCollections.filter((item) => item.listName === listName)[0]
  //   .items;
  // const [listStae, setListStae] = useState([...list]);

  const removeTask = (task) => {
    // const newList = listStae.filter((item) => item["task"] !== task);
    // setListStae(newList);
    dispatch(deleteTask({ task, user, listName, category: groupId }));
  };

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
      {/* Tasks List Container */}
      {(!subCollections || loading) && (
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
            .items.map((item, index) => (
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
        </div>
      )}
    </div>
  );
};
export default TasksDetailsPage;
