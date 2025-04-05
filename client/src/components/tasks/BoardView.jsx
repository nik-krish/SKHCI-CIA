import TaskCard from "./TaskCard";

const BoardView = ({ tasks }) => {
  return (
    <div className="w-full py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tasks?.map((task, index) => (
          <div
            key={index}
            className="transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
          >
            <TaskCard task={task} />
          </div>
        ))}
      </div>

      {tasks?.length === 0 && (
        <div className="w-full flex flex-col items-center justify-center py-12">
          <div className="text-gray-400 dark:text-gray-500 text-lg">
            No tasks found
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardView;
