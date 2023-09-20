export const timenow = () => {
  const date = new Date().toString();
  const array = date.split(" ");
  const time = `${array[2]} ${array[1]}, ${array[3]}`;
  return time;
};

export class Task {
  constructor(task, completed) {
    this.task = task;
    this.completed = completed;
  }

  toString() {
    return `${this.task} is ${this.completed && "not"} "completed" ${
      this.completed && "yet."
    }`;
  }
}

// Firestore data converter
export const taskConverter = {
  toFirestore: (task) => {
    return {
      name: task.task,
      completed: task.completed,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Task(data.task, data.completed);
  },
};
