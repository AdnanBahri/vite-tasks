import { Card, CardContent } from "@/components/ui/card";
import { timenow } from "../lib/converter";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import CustomDialog from "../components/groups-dialog";
import { useSelector } from "react-redux";
import { Spinner } from "react-activity";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCollections } from "../redux/slices/groupSclice";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const auth = useSelector((state) => state.auth);
  const { groups, loading } = useSelector((state) => state.groups);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !groups) dispatch(getCollections({ user: auth.user }));
  }, [groups]);

  return (
    <div className="relative min-h-screen w-full max-w-7xl mx-auto px-6 lg:px-8 2xl:px-0 pt-16">
      <div className="py-4 sm:py-12 flex flex-col">
        <h1 className="text-2xl font-semibold leading-none tracking-tight">
          Collections
        </h1>
        <p className="text-sm text-muted-foreground">{timenow()}</p>
        {loading ? (
          <div className="absolute top-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2">
            <Spinner
              className="text-foreground"
              size={20}
              speed={1}
              animating={true}
            />
          </div>
        ) : (
          <>
            {/* Gird Container */}
            <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {groups &&
                groups.map((coll, index) => (
                  <Card
                    key={index.toString()}
                    onClick={() => navigate(`/${coll}`)}
                    className="relative cursor-pointer hover:shadow-md"
                  >
                    <CardContent className="p-0 py-10 px-8 flex flex-col items-center justify-center gap-y-2">
                      <Avatar className="cursor-pointer h-8 w-8 sm:h-10 sm:w-10">
                        <AvatarImage
                          src={"https://github.com/shadcn.png"}
                          alt="@shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="text-sm sm:text-lg font-semibold leading-none tracking-tight">
                        {coll}
                      </div>
                      <p className="absolute left-4 bottom-2 text-xs sm:text-sm text-muted-foreground ">
                        1/12 tasks completed
                      </p>
                    </CardContent>
                  </Card>
                ))}
              <CustomDialog action="group">
                <Card className="relative cursor-pointer hover:shadow-md bg-primary text-primary-foreground hover:bg-primary/90">
                  <CardContent className="p-0 py-10 px-8 flex flex-col items-center justify-center gap-y-2">
                    <Avatar className="cursor-pointer h-8 w-8 sm:h-10 sm:w-10">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="text-sm sm:text-lg font-semibold leading-none tracking-tight">
                      Add New
                    </div>
                  </CardContent>
                </Card>
              </CustomDialog>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default HomePage;
