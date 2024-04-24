import List from '../List/List'
import './Task.css'

function Task(){
    return <>
    <div className="tasks">
        <h2>Tasks</h2>
        <div className="addtask">
          <input type="text" name="wid" id="wid" placeholder='Worker Id'/>
          <input type="text" name="task" id="task" placeholder='Task Description'/>
          <button>Add</button>
        </div>
        <table className="tasktable">
          <thead>
            <tr>
              <th>Task ID</th>
              <th>Description</th>
              <th>Completed</th>
              <th>Verified</th>
              <th></th>
            </tr>
          </thead>
          <List />
          <List />
          <List />
          <List />
          <List />
        </table>
      </div>
    </>
}

export default Task