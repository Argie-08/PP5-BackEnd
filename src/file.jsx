const [showTask, setShowTask] = useState(false);
const [showEditTask, setShowEditTask] = useState(false);
const [editTaskId, setEditTaskId] = useState();
const [editTitle, setEditTitle] = useState("");
const [editDescription, setEditDescription] = useState("");
const [editStatus, setEditStatus] = useState("");

async function updateTask(e) {
  e.preventDefault();

  try {
    const body = {
      task_title: editTitle,
      task_description: editDescription,
      task_status: editStatus,
    };

    const { data } = await api.put(`/tasks.php?task_id=${editTaskId}`, body);
    toast.current.show({
      severity: "success",
      detail: data.message,
    });
    setShowEditTask(false);
    getTasks();
    setEditTitle("");
    setEditDescription("");
    setEditStatus("");
  } catch (error) {
    toast.current.show({
      severity: "error",
      detail: error.message,
    });
  }
}

function handleEditTask(data) {
  setEditTaskId(data.task_id);
  setEditTitle(data.task_title);
  setEditDescription(data.task_description);
  setEditStatus(data.task_status);
  setShowEditTask(true);
}

function actions(data) {
  return (
    <div className="task-buttons">
      <Button
        icon="pi pi-pencil"
        severity="warning"
        onClick={() => handleEditTask(data)}
      />
    </div>
  );
}

<Dialog
  dismissableMask
  draggable={false}
  header="Edit Task"
  visible={showEditTask}
  style={{ width: "600px" }}
  onHide={() => setShowEditTask(false)}
>
  <form className="task-form" onSubmit={updateTask}>
    <InputText
      value={editTitle}
      placeholder="Title"
      onChange={(e) => setEditTitle(e.target.value)}
    />
    <InputTextarea
      autoResize
      value={editDescription}
      placeholder="Description"
      onChange={(e) => setEditDescription(e.target.value)}
      rows={5}
      cols={30}
    />
    <p>Status</p>
    <div className="status">
      <RadioButton
        inputId="not-started"
        name="status"
        value="Not Started"
        onChange={(e) => setEditStatus(e.target.value)}
        checked={editStatus === "Not Started"}
      />
      <label htmlFor="not-started">Not Started</label>
    </div>
    <div className="status">
      <RadioButton
        inputId="ongoing"
        name="status"
        value="Ongoing"
        onChange={(e) => setEditStatus(e.target.value)}
        checked={editStatus === "Ongoing"}
      />
      <label htmlFor="ongoing">Ongoing</label>
    </div>
    <div className="status">
      <RadioButton
        inputId="completed"
        name="status"
        value="Completed"
        onChange={(e) => setEditStatus(e.target.value)}
        checked={editStatus === "Completed"}
      />
      <label htmlFor="completed">Completed</label>
    </div>
    <div className="task-form-buttons">
      <Button type="submit" disabled={!editTitle || !editDescription}>
        Update Task
      </Button>
    </div>
  </form>
</Dialog>;
