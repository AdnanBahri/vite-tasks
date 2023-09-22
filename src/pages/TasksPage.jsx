import { useParams } from "react-router-dom";
import BackButton from "../components/back-arrow";
import { CardDescription, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import CustomDialog from "../components/groups-dialog";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Spinner } from "react-activity";
import {
  claerSubCollections,
  deleteSubcollection,
  getSubCollections,
} from "../redux/slices/groupSclice";
import TasksContainer from "../components/task-conatiner";

const TasksPage = () => {
  const { groupId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { loading, subCollections } = useSelector((state) => state.groups);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(claerSubCollections());
  }, []);

  useEffect(() => {
    if (!loading && !subCollections)
      dispatch(getSubCollections({ user, category: groupId }));
  }, [subCollections]);

  const removeList = (name) => {
    dispatch(deleteSubcollection({ user, category: groupId, name }));
  };

  return (
    <div className="min-h-screen w-full max-w-7xl mx-auto px-6 lg:px-8 2xl:px-0 pt-16 relative">
      <div className="py-4 sm:py-12 flex flex-col">
        <BackButton num={-1} />
        <div className="flex items-center justify-between mt-8">
          <CardTitle>{groupId}</CardTitle>
          <CustomDialog action="list" path={groupId}>
            <Button>Create List</Button>
          </CustomDialog>
        </div>
        {/* Filters */}
        <div className="flex items-center gap-x-6"></div>
        {/* Collections */}
        {loading ? (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Spinner
              className="text-foreground"
              size={20}
              speed={1}
              animating={true}
            />
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {subCollections &&
              subCollections.length > 0 &&
              subCollections.map((data, index) => (
                <TasksContainer
                  key={index.toString()}
                  name={data.listName}
                  items={data.items}
                  remove={() => removeList(data.listName)}
                />
              ))}
            {(!subCollections || subCollections.length === 0) && (
              <CardDescription className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:text-base lg:text-lg">
                No Tasks for you yet.
              </CardDescription>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default TasksPage;
